import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { RootState } from '../../store';
import { setSearchQuery } from '../../store/slices/productsSlice';
import { toggleCart } from '../../store/slices/cartSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    navigate('/products');
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const handleCategoriesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If on home page, scroll to categories section
      const categoriesSection = document.getElementById('categories-section');
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If not on home page, navigate to home and then scroll
      navigate('/');
      setTimeout(() => {
        const categoriesSection = document.getElementById('categories-section');
        if (categoriesSection) {
          categoriesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
    setIsMobileMenuOpen(false);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center ">
            <img className='w-full md:w-1/2 lg:w-1/3 h-auto p-5 max-w-md object-cover' src='https://images.indianexpress.com/2021/01/myntra.png'></img>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-pink-500 font-medium transition-colors">
              Products
            </Link>
            <button
              onClick={handleCategoriesClick}
              className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
            >
              Categories
            </button>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/wishlist" className="text-gray-700 hover:text-pink-500 transition-colors">
              <Heart size={24} />
            </Link>
            <button
              onClick={handleCartClick}
              className="relative text-gray-700 hover:text-pink-500 transition-colors"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/profile" className="text-gray-700 hover:text-pink-500 transition-colors">
              <User size={24} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-pink-500 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-pink-500 font-medium py-2 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-pink-500 font-medium py-2 transition-colors"
                >
                  Products
                </Link>
                <button
                  onClick={handleCategoriesClick}
                  className="text-left text-gray-700 hover:text-pink-500 font-medium py-2 transition-colors"
                >
                  Categories
                </button>
              </nav>

              {/* Mobile User Actions */}
              <div className="flex items-center justify-around pt-4 border-t border-gray-200">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <Heart size={20} />
                  <span className="text-xs mt-1">Wishlist</span>
                </Link>
                <button
                  onClick={() => {
                    handleCartClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex flex-col items-center text-gray-700 hover:text-pink-500 transition-colors relative"
                >
                  <ShoppingBag size={20} />
                  <span className="text-xs mt-1">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <User size={20} />
                  <span className="text-xs mt-1">Profile</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;