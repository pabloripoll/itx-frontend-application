import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ProductListing from './ProductListing';

// Mock child components
vi.mock('../../components/SearchBar/SearchBar', () => ({
    default: ({ value, onChange }) => (
        <input
            placeholder="Search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    ),
}));

vi.mock('../../components/ProductItem/ProductItem', () => ({
    default: ({ product }) => <div data-testid="product-item">{product.model}</div>,
}));

// Mock API
vi.mock('../../api/productApi', () => ({
    getProducts: vi.fn(),
}));

import { getProducts } from '../../api/productApi';

const mockProducts = [
    { id: '1', brand: 'Apple',   model: 'iPhone 14' },
    { id: '2', brand: 'Samsung', model: 'Galaxy S23' },
    { id: '3', brand: 'Apple',   model: 'iPhone 13' },
];

describe('ProductListing', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('shows a loading spinner initially', () => {
        getProducts.mockReturnValue(new Promise(() => {})); // never resolves
        render(<ProductListing />);
        expect(document.getElementById('preloder')).toBeInTheDocument();
    });

    it('renders a list of products after loading', async () => {
        getProducts.mockResolvedValue(mockProducts);
        render(<ProductListing />);
        await waitFor(() => {
            expect(screen.getAllByTestId('product-item')).toHaveLength(3);
        });
    });

    it('renders product names', async () => {
        getProducts.mockResolvedValue(mockProducts);
        render(<ProductListing />);
        await waitFor(() => {
            expect(screen.getByText('iPhone 14')).toBeInTheDocument();
            expect(screen.getByText('Galaxy S23')).toBeInTheDocument();
        });
    });

    it('shows an error message when the API fails', async () => {
        getProducts.mockRejectedValue(new Error('Network error'));
        render(<ProductListing />);
        await waitFor(() => {
            expect(screen.getByText('Failed to load products. Please try again.')).toBeInTheDocument();
        });
    });

    it('filters products by search term', async () => {
        getProducts.mockResolvedValue(mockProducts);
        render(<ProductListing />);
        await waitFor(() => screen.getAllByTestId('product-item'));

        await userEvent.type(screen.getByPlaceholderText('Search'), 'Samsung');
        await waitFor(() => {
            expect(screen.getAllByTestId('product-item')).toHaveLength(1);
            expect(screen.getByText('Galaxy S23')).toBeInTheDocument();
        });
    });

    it('filters products by model', async () => {
        getProducts.mockResolvedValue(mockProducts);
        render(<ProductListing />);
        await waitFor(() => screen.getAllByTestId('product-item'));

        await userEvent.type(screen.getByPlaceholderText('Search'), 'iPhone 14');
        await waitFor(() => {
            expect(screen.getAllByTestId('product-item')).toHaveLength(1);
        });
    });

    it('shows no results message when search has no matches', async () => {
        getProducts.mockResolvedValue(mockProducts);
        render(<ProductListing />);
        await waitFor(() => screen.getAllByTestId('product-item'));

        await userEvent.type(screen.getByPlaceholderText('Search'), 'Nokia');
        await waitFor(() => {
            expect(screen.getByText(/No products found for/)).toBeInTheDocument();
        });
    });

});
