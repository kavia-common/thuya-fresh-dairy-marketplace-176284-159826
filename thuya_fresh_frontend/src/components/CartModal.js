import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import '../theme.css';

// PUBLIC_INTERFACE
export default function CartModal() {
  /** Accessible modal dialog showing cart contents. */
  const { cartOpen, closeCart } = useUI();
  const { items, subtotal, setQty, removeItem, clear } = useCart();
  const ref = useRef(null);

  useEffect(() => {
    if (cartOpen && ref.current) {
      ref.current.focus();
    }
  }, [cartOpen]);

  if (!cartOpen) return null;

  return (
    <div
      id="cart-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      tabIndex={-1}
      className="modal-root"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.5)',
        display: 'grid', placeItems: 'center', zIndex: 100
      }}
      onClick={closeCart}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        ref={ref}
        style={{
          width: 'min(680px, 94vw)',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-lg)',
          padding: 16,
          border: '1px solid #E5E7EB'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h2 id="cart-title" style={{ margin: 0 }}>Your Cart</h2>
          <button className="btn ghost" onClick={closeCart} aria-label="Close cart">Close</button>
        </div>
        <div style={{ display: 'grid', gap: 12, maxHeight: '50vh', overflow: 'auto', paddingRight: 6 }}>
          {items.length === 0 && <div role="status">Your cart is empty.</div>}
          {items.map(item => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 12, alignItems: 'center' }}>
              <img src={item.image} alt="" width="64" height="64" style={{ borderRadius: 8, objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ color: 'var(--color-muted)', fontSize: 14 }}>${item.price.toFixed(2)} each</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <label htmlFor={`qty-${item.id}`} style={{ fontSize: 12, color: 'var(--color-muted)' }}>Qty</label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                    style={{ width: 64 }}
                    aria-label={`Quantity for ${item.name}`}
                  />
                  <button className="btn ghost" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
                </div>
              </div>
              <div style={{ fontWeight: 800 }}>${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <button className="btn ghost" onClick={clear}>Clear</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontWeight: 800 }}>Subtotal: ${subtotal.toFixed(2)}</div>
            <a href="/checkout" className="btn">Go to checkout</a>
          </div>
        </div>
      </div>
    </div>
  );
}
