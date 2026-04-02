import { createContext, useContext, useState } from 'react';

const CART_KEY = 'cart';

const loadCart = () => {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || {};
    } catch {
        return {};
    }
};

const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => loadCart());

    const cartCount = Object.keys(cart).length;

    const updateCart = (productId, { colorCode, storageCode, quantity }) => {
        setCart((prev) => {
            const next = { ...prev };
            if (quantity <= 0) {
                delete next[productId];
            } else {
                next[productId] = { colorCode, storageCode, quantity };
            }
            saveCart(next);
            return next;
        });
    };

    const getCartItem = (productId) => cart[productId] || null;

    const isInCart = (productId) => !!cart[productId];

    return (
        <CartContext.Provider value={{ cart, cartCount, updateCart, getCartItem, isInCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
