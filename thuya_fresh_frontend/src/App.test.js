import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders top navigation brand', () => {
  render(<App />);
  expect(screen.getByLabelText(/Thuya Fresh Home/i)).toBeInTheDocument();
});

test('add-to-cart from product card updates cart and toggles modal', async () => {
  render(<App />);
  // Open cart to ensure modal can toggle later
  const cartBtn = screen.getByRole('button', { name: /cart/i });
  fireEvent.click(cartBtn);
  // Close it
  const close = screen.getByRole('button', { name: /close cart/i });
  fireEvent.click(close);

  // Add item to cart from home grid
  const addButtons = await screen.findAllByRole('button', { name: /add to cart/i });
  fireEvent.click(addButtons[0]);

  // Open cart again to verify item
  fireEvent.click(cartBtn);
  expect(await screen.findByText(/Subtotal:/i)).toBeInTheDocument();
});

test('cart modal toggle works from top nav', () => {
  render(<App />);
  const cartBtn = screen.getByRole('button', { name: /cart/i });
  fireEvent.click(cartBtn);
  expect(screen.getByRole('dialog', { name: /your cart/i })).toBeInTheDocument();
});
