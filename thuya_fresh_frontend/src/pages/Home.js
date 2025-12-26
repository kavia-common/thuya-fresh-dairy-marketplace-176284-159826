import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import '../theme.css';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page: product listing with filters and search binding. */
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setError] = useState('');

  const q = params.get('q') || '';
  const category = params.get('category') || '';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchProducts({ q, category })
      .then(data => { if (mounted) { setList(data); setError(''); } })
      .catch(e => { if (mounted) setError(e.message || 'Failed to load'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [q, category]);

  return (
    <div className="container" style={{ marginTop: 16 }}>
      <div className="layout">
        <Filters />
        <main style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>Fresh Dairy</h1>
            <span className="badge">{list.length} items</span>
          </div>
          {loading && <div role="status" aria-live="polite">Loading...</div>}
          {error && <div role="alert" style={{ color: 'var(--color-error)' }}>{error}</div>}
          {!loading && !error && <ProductGrid products={list} />}
        </main>
      </div>
    </div>
  );
}
