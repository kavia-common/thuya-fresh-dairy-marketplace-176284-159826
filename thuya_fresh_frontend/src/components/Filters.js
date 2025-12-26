import React from 'react';
import { useSearchParams } from 'react-router-dom';
import '../theme.css';

const CATEGORIES = ['All', 'Milk', 'Cheese', 'Yogurt', 'Butter'];

// PUBLIC_INTERFACE
export default function Filters() {
  /** Sidebar filters for category selection. */
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';

  const change = (e) => {
    const next = new URLSearchParams(params);
    const value = e.target.value;
    if (value && value !== 'All') next.set('category', value);
    else next.delete('category');
    setParams(next, { replace: false });
  };

  return (
    <aside className="sidebar" aria-label="Filters">
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ fontWeight: 800 }}>Filters</div>
        <label htmlFor="category" style={{ fontSize: 14, color: 'var(--color-muted)' }}>Category</label>
        <select id="category" value={category} onChange={change} aria-label="Select category">
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="badge">Ocean Professional</span>
      </div>
    </aside>
  );
}
