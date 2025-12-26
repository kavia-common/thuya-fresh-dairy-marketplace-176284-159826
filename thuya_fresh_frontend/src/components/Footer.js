import React from 'react';
import '../theme.css';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer displayed on all pages. */
  return (
    <footer className="footer" role="contentinfo">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>© {new Date().getFullYear()} Thuya Fresh. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a className="badge" href="/privacy">Privacy</a>
          <a className="badge" href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}
