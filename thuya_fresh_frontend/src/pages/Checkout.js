import React from 'react';
import { useCart } from '../context/CartContext';
import '../theme.css';

// PUBLIC_INTERFACE
export default function Checkout() {
  /** Simple checkout summary page. */
  const { items, subtotal, setQty, removeItem, clear } = useCart();

  return (
    <div className="container" style={{ marginTop: 16, display: 'grid', gap: 16 }}>
      <h1 style={{ margin: 0 }}>Checkout</h1>
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 16, boxShadow: 'var(--shadow-sm)' }}>
        {items.length === 0 && <div role="status">Your cart is empty.</div>}
        {items.map(item => (
          <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto auto', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
            <img src={item.image} alt="" width="64" height="64" style={{ borderRadius: 8, objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div style={{ color: 'var(--color-muted)', fontSize: 14 }}>${item.price.toFixed(2)} each</div>
            </div>
            <input type="number" min="1" value={item.qty} onChange={(e) => setQty(item.id, Number(e.target.value))} style={{ width: 80 }} aria-label={`Quantity for ${item.name}`} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontWeight: 800 }}>${(item.price * item.qty).toFixed(2)}</div>
              <button className="btn ghost" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn ghost" onClick={clear}>Clear Cart</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontWeight: 800 }}>Subtotal: ${subtotal.toFixed(2)}</div>
          <button className="btn">Place order</button>
        </div>
      </div>
    </div>
  );
}
