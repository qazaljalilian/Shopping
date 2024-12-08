import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ProductView } from './product-view';
import useFetchProducts from '../services/use-fetch-products';

jest.mock('../services/use-fetch-products');

const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    price: '$100',
    brand: 'Brand 1',
    available: true,
    options: [
      { color: ['Red'], power: ['100W'], storage: ['64GB'], quantity: 10 },
      { color: ['Blue'], power: ['200W'], storage: ['128GB'], quantity: 0 },
    ],
  },
];

describe('ProductView', () => {
  beforeEach(() => {
    useFetchProducts.mockReturnValue({ products: mockProducts });
  });

  test('renders product details', () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Route path="/product/:id">
          <ProductView />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText('Product : Product 1')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Brand 1')).toBeInTheDocument();
  });

  test('adds product to cart', () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Route path="/product/:id">
          <ProductView />
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('select Color'), { target: { value: 'Red' } });
    fireEvent.change(screen.getByPlaceholderText('select Power'), { target: { value: '100W' } });
    fireEvent.change(screen.getByPlaceholderText('select Power'), { target: { value: '64GB' } });
    fireEvent.click(screen.getByText('Add to Cart'));

    expect(screen.getByText('Successfully added to cart')).toBeInTheDocument();
  });

  test('shows error when variant is not available', () => {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Route path="/product/:id">
          <ProductView />
        </Route>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('select Color'), { target: { value: 'Blue' } });
    fireEvent.change(screen.getByPlaceholderText('select Power'), { target: { value: '200W' } });
    fireEvent.click(screen.getByText('Add to Cart'));

    expect(screen.getByText('This Variant is not available please choose another')).toBeInTheDocument();
  });
});