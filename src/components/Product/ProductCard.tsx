import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { RootState } from '../../store';
import { addToWishlist, removeFromWishlist } from '../../store/slices/userSlice';
import { addToCart } from '../../store/slices/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  const isInWishlist = currentUser?.wishlist.includes(product.id) || false;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      product,
      size: product.sizes[0],
      color: product.colors[0]
    }));
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {product.discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Heart 
              size={18} 
              className={isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'} 
            />
          </button>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-80 text-white py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-opacity-100 flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={16} />
            <span>Quick Add</span>
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">{product.ratings}</span>
            </div>
            <span className="text-sm text-gray-400">({product.reviewCount})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Size and Color indicators */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex space-x-1">
              {product.sizes.slice(0, 3).map((size, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-xs text-gray-500">+{product.sizes.length - 3}</span>
              )}
            </div>
            
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                    color === 'black' ? 'bg-black' :
                    color === 'white' ? 'bg-white' :
                    color === 'blue' ? 'bg-blue-500' :
                    color === 'red' ? 'bg-red-500' :
                    color === 'green' ? 'bg-green-500' :
                    color === 'yellow' ? 'bg-yellow-500' :
                    color === 'pink' ? 'bg-pink-500' :
                    color === 'purple' ? 'bg-purple-500' :
                    color === 'grey' || color === 'gray' ? 'bg-gray-500' :
                    color === 'brown' ? 'bg-amber-700' :
                    'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;