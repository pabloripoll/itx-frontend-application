import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] ?? null,
        setItem: (key, value) => { store[key] = String(value); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; },
    };
})();

beforeEach(() => {
    Object.defineProperty(global, 'localStorage', {
        value: localStorageMock,
        writable: true,
    });
    localStorageMock.clear();
});

describe('CartContext', () => {

    it('starts with an empty cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.cartCount).toBe(0);
        expect(result.current.recentItems).toHaveLength(0);
    });

    it('adds a product to the cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => {
            result.current.updateCart('product-1', {
                colorCode: 1, storageCode: 2, quantity: 2,
                name: 'iPhone 14', brand: 'Apple', imgUrl: 'img.jpg',
            });
        });
        expect(result.current.cartCount).toBe(1);
        expect(result.current.isInCart('product-1')).toBe(true);
    });

    it('updates quantity of an existing product', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => {
            result.current.updateCart('product-1', {
                colorCode: 1, storageCode: 2, quantity: 1,
                name: 'iPhone 14', brand: 'Apple', imgUrl: 'img.jpg',
            });
        });
        act(() => {
            result.current.updateCart('product-1', {
                colorCode: 1, storageCode: 2, quantity: 5,
                name: 'iPhone 14', brand: 'Apple', imgUrl: 'img.jpg',
            });
        });
        expect(result.current.getCartItem('product-1').quantity).toBe(5);
    });

    it('removes a product when quantity is 0', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => {
            result.current.updateCart('product-1', {
                colorCode: 1, storageCode: 2, quantity: 2,
                name: 'iPhone 14', brand: 'Apple', imgUrl: 'img.jpg',
            });
        });
        act(() => {
            result.current.updateCart('product-1', {
                colorCode: 1, storageCode: 2, quantity: 0,
                name: 'iPhone 14', brand: 'Apple', imgUrl: 'img.jpg',
            });
        });
        expect(result.current.isInCart('product-1')).toBe(false);
        expect(result.current.cartCount).toBe(0);
    });

    it('persists cart to localStorage', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => {
            result.current.updateCart('product-1', {
                colorCode: 1, storageCode: 2, quantity: 1,
                name: 'iPhone 14', brand: 'Apple', imgUrl: 'img.jpg',
            });
        });
        const stored = JSON.parse(localStorageMock.getItem('cart'));
        expect(stored['product-1']).toBeDefined();
        expect(stored['product-1'].quantity).toBe(1);
    });

    it('returns null for an unknown product', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.getCartItem('unknown-id')).toBeNull();
    });

    it('returns at most 3 recent items', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        act(() => {
            ['product-1', 'product-2', 'product-3', 'product-4'].forEach((id) => {
                result.current.updateCart(id, {
                    colorCode: 1, storageCode: 1, quantity: 1,
                    name: id, brand: 'X', imgUrl: '',
                });
            });
        });
        expect(result.current.recentItems).toHaveLength(3);
    });

    it('throws when used outside CartProvider', () => {
        const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(() => renderHook(() => useCart())).toThrow('useCart must be used within a CartProvider');
        spy.mockRestore();
    });

});
