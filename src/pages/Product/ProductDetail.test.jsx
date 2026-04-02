import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ProductDetail from './ProductDetail';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
    useParams: () => ({ id: 'product-1' }),
}));

// Mock CartContext — define getCartItem as a vi.fn() so it can be overridden per test
const mockGetCartItem = vi.fn().mockReturnValue(null);
vi.mock('../../context/CartContext', () => ({
    useCart: () => ({
        getCartItem: mockGetCartItem,
    }),
}));

// Mock child components
vi.mock('../../components/ProductImage/ProductImage', () => ({
    default: ({ model }) => <img alt={model} />,
}));
vi.mock('../../components/ProductDescription/ProductDescription', () => ({
    default: ({ product }) => <div data-testid="product-description">{product.model}</div>,
    FieldItem: ({ label, value }) => <li>{label}: {value ?? 'N/A'}</li>,
    FieldRow: ({ label, value }) => <tr><td>{label}</td><td>{value ?? 'N/A'}</td></tr>,
}));
vi.mock('../../components/ProductActions/ProductActions', () => ({
    default: ({ quantity, onDecrease, onIncrease }) => (
        <div>
            <button onClick={onDecrease}>-</button>
            <span data-testid="quantity">{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </div>
    ),
}));

// Mock API
vi.mock('../../api/productApi', () => ({
    getProductDetail: vi.fn(),
}));

import { getProductDetail } from '../../api/productApi';

const mockProduct = {
    id: 'product-1',
    model: 'iPhone 14',
    brand: 'Apple',
    price: 999,
    imgUrl: 'img.jpg',
    cpu: 'A15 Bionic',
    ram: '6GB',
    os: 'iOS 16',
    options: { storages: [], colors: [] },
};

describe('ProductDetail', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetCartItem.mockReturnValue(null);
    });

    it('shows a loading spinner initially', () => {
        getProductDetail.mockReturnValue(new Promise(() => {}));
        render(<ProductDetail />);
        expect(document.getElementById('preloder')).toBeInTheDocument();
    });

    it('renders product details after loading', async () => {
        getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetail />);
        await waitFor(() => {
            expect(screen.getByTestId('product-description')).toBeInTheDocument();
            expect(screen.getByText('iPhone 14')).toBeInTheDocument();
        });
    });

    it('shows an error message when the API fails', async () => {
        getProductDetail.mockRejectedValue(new Error('Network error'));
        render(<ProductDetail />);
        await waitFor(() => {
            expect(screen.getByText('Failed to load product details. Please try again.')).toBeInTheDocument();
        });
    });

    it('shows product not found when API returns null', async () => {
        getProductDetail.mockResolvedValue(null);
        render(<ProductDetail />);
        await waitFor(() => {
            expect(screen.getByText('Product not found.')).toBeInTheDocument();
        });
    });

    it('increments quantity when + is clicked', async () => {
        getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetail />);
        await waitFor(() => screen.getByTestId('quantity'));

        fireEvent.click(screen.getByText('+'));
        expect(screen.getByTestId('quantity').textContent).toBe('1');
    });

    it('does not decrement quantity below 0', async () => {
        getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetail />);
        await waitFor(() => screen.getByTestId('quantity'));

        fireEvent.click(screen.getByText('-'));
        expect(screen.getByTestId('quantity').textContent).toBe('0');
    });

    it('renders description tab by default', async () => {
        getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetail />);
        await waitFor(() => screen.getByTestId('product-description'));

        expect(screen.getByRole('button', { name: 'Description' })).toHaveClass('active');
    });

    it('switches to specification tab on click', async () => {
        getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetail />);
        await waitFor(() => screen.getByTestId('product-description'));

        fireEvent.click(screen.getByRole('button', { name: 'Specification' }));
        expect(screen.getByRole('button', { name: 'Specification' })).toHaveClass('active');
    });

    it('restores quantity from cart if product is already in cart', async () => {
        mockGetCartItem.mockReturnValue({ quantity: 3 });
        getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetail />);
        await waitFor(() => {
            expect(screen.getByTestId('quantity').textContent).toBe('3');
        });
    });

});