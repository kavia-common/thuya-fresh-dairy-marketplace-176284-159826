import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './theme.css';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

// PUBLIC_INTERFACE
export default function App() {
  /** Root app: sets providers, routing, and shared UI. */
  return (
    <BrowserRouter>
      <UIProvider>
        <CartProvider>
          <TopNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <CartModal />
          <Footer />
        </CartProvider>
      </UIProvider>
    </BrowserRouter>
  );
}
