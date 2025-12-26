import React, { createContext, useContext, useMemo, useState } from 'react';

const UIContext = createContext(null);

// PUBLIC_INTERFACE
export function UIProvider({ children }) {
  /** Provides UI state such as cart modal visibility. */
  const [cartOpen, setCartOpen] = useState(false);

  const value = useMemo(() => ({
    cartOpen,
    openCart: () => setCartOpen(true),
    closeCart: () => setCartOpen(false),
    toggleCart: () => setCartOpen(v => !v),
  }), [cartOpen]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

// PUBLIC_INTERFACE
export function useUI() {
  /** Hook to access global UI state and actions. */
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}
