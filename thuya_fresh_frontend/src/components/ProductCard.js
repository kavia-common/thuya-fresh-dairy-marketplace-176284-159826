import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../theme.css';

// PUBLIC_INTERFACE
export default function ProductCard({ product, onAdd }) {
  /** Card for a product with CTA to add to cart. */
  const { addItem } = useCart();

  const add = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
    onAdd && onAdd(product);
  };

  return (
    <article className="card" aria-label={product.name}>
      <Link to={`/product/${product.id}`} aria-label={`View details for ${product.name}`}>
        <img className="card-img" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        <div className="card-meta">{product.unit} • {product.category} • ⭐ {product.rating}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div className="card-price">${product.price.toFixed(2)}</div>
          <button className="btn" onClick={add} aria-label={`Add ${product.name} to cart`}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
