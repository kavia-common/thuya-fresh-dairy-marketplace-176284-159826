import React from 'react';
import ProductCard from './ProductCard';
import '../theme.css';

// PUBLIC_INTERFACE
export default function ProductGrid({ products, onAdd }) {
  /** Grid layout for displaying products. */
  if (!products?.length) {
    return <div role="status" aria-live="polite">No products found.</div>;
  }
  return (
    <div className="grid" role="list">
      {products.map(p => (
        <div role="listitem" key={p.id}>
          <ProductCard product={p} onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}
