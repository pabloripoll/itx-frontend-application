const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(
        () => Number(localStorage.getItem('cartCount')) || 0
    );
    // persists across page reloads to develop
};
