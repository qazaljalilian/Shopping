import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductView } from './product-view';
import { CartProvider } from '../context/CartContext';
import useFetchProducts from '../services/use-fetch-products';

// Mock the useFetchProducts hook
jest.mock('../services/use-fetch-products');

const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    options: [
      { color: 'red', power: '100W' },
      { color: 'blue', power: '200W' },
    ],
  },
];

useFetchProducts.mockReturnValue({
  products: mockProducts,
  loading: false,
  error: null,
});

describe('ProductView', () => {
  test('renders product details', () => {
    render(
      <Router>
        <CartProvider>
          <ProductView />
        </CartProvider>
      </Router>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Price: 100')).toBeInTheDocument();
  });

  test('adds product to cart', () => {
    render(
      <Router>
        <CartProvider>
          <ProductView />
        </CartProvider>
      </Router>
    );

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(localStorage.getItem('cart')).toContain('Product 1');
  });

  test('shows error message when variant is not available', () => {
    render(
      <Router>
        <CartProvider>
          <ProductView />
        </CartProvider>
      </Router>
    );

    // Simulate selecting unavailable variant
    fireEvent.change(screen.getByLabelText('Color'), { target: { value: 'green' } });
    fireEvent.change(screen.getByLabelText('Power'), { target: { value: '300W' } });

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(screen.getByText('This Variant is not available please choose another')).toBeInTheDocument();
  });
});