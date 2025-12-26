import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import '../theme.css';

// PUBLIC_INTERFACE
export default function ProductDetails() {
  /** Product details with add-to-cart. */
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProductById(id)
      .then(p => { if (mounted) { setProduct(p); setError(''); } })
      .catch(e => { if (mounted) setError(e.message || 'Failed to load'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  if (loading) return <div className="container" role="status">Loading...</div>;
  if (error) return <div className="container" role="alert" style={{ color: 'var(--color-error)' }}>{error}</div>;
  if (!product) return null;

  const add = () => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, qty });

  return (
    <div className="container" style={{ marginTop: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 12, objectFit: 'cover' }} />
        <div style={{ display: 'grid', gap: 12 }}>
          <h1 style={{ margin: 0 }}>{product.name}</h1>
          <div style={{ color: 'var(--color-muted)' }}>{product.unit} • {product.category}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-primary)' }}>${product.price.toFixed(2)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label htmlFor="qty" style={{ fontSize: 12, color: 'var(--color-muted)' }}>Qty</label>
            <input id="qty" type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: 80 }} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn" onClick={add} aria-label="Add to cart">Add to cart</button>
            <a className="btn secondary" href="/checkout">Buy now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
