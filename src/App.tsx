import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import ChatBot from './components/Chat/ChatBot';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './components/Product/ProductDetails';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/categories" element={<Products />} />
              <Route path="/wishlist" element={<Products />} />
              <Route path="/profile" element={<Products />} />
              <Route path="/orders" element={<Products />} />
            </Routes>
          </main>
          <Footer />
          <CartSidebar />
          <ChatBot />
        </div>
      </Router>
    </Provider>
  );
}

export default App;