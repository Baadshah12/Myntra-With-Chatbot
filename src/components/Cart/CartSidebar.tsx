import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { RootState } from '../../store';
import { setCartOpen, removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

const CartSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { items, total, isOpen } = useSelector((state: RootState) => state.cart);

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  const handleQuantityChange = (productId: string, size: string, color: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, size, color, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    dispatch(removeFromCart({ productId, size, color }));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClose} />
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart ({totalItems})</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Link
                  to="/products"
                  onClick={handleClose}
                  className="inline-block bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex space-x-3 p-3 border rounded-lg">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                      <p className="text-xs text-gray-500 mb-1">{item.product.brand}</p>
                      <p className="text-xs text-gray-500 mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.product.id, item.size, item.color)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="mt-2">
                        <span className="font-medium">₹{item.product.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total: ₹{total}</span>
              </div>
              
              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={handleClose}
                  className="block w-full bg-pink-500 text-white text-center py-3 rounded-md hover:bg-pink-600 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={handleClose}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;