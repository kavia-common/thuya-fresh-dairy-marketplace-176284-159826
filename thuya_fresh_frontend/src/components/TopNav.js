import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import '../theme.css';

function useQueryBinding() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const setQ = (val) => {
    const next = new URLSearchParams(params);
    if (val) next.set('q', val); else next.delete('q');
    setParams(next, { replace: false });
  };
  return [q, setQ];
}

// PUBLIC_INTERFACE
export default function TopNav() {
  /** Top navigation with brand, search, and cart button. */
  const { toggleCart } = useUI();
  const [q, setQ] = useQueryBinding();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar" aria-label="Top Navigation">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Thuya Fresh Home">
          <div className="brand-logo" aria-hidden="true" />
          <span className="brand-name">Thuya Fresh</span>
        </Link>
        <form className="search" role="search" onSubmit={onSubmit} aria-label="Search products">
          <span className="icon" aria-hidden="true">🔎</span>
          <input
            type="search"
            name="q"
            placeholder="Search dairy products..."
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </form>
        <div className="nav-actions">
          <Link to="/checkout" className="btn ghost" aria-label="Go to checkout">Checkout</Link>
          <button className="btn secondary" onClick={toggleCart} aria-haspopup="dialog" aria-controls="cart-modal">
            🧺 Cart
          </button>
        </div>
      </div>
    </nav>
  );
}
