import React, { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [] // { id, name, price, image, qty }
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.item.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + (action.item.qty || 1) } : i)
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: action.item.qty || 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i)
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provides cart state and actions across the app. */
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const subtotal = state.items.reduce((s, i) => s + i.price * i.qty, 0);
    return {
      items: state.items,
      subtotal,
      addItem: (item) => dispatch({ type: 'ADD', item }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clear: () => dispatch({ type: 'CLEAR' })
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart state and actions. */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
