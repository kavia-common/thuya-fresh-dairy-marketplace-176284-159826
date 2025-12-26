import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';
import { CartProvider } from '../context/CartContext';

test('renders empty state', () => {
  render(<CartProvider><ProductGrid products={[]} /></CartProvider>);
  expect(screen.getByRole('status')).toHaveTextContent(/No products/i);
});
