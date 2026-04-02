import { useState, useEffect } from 'react';
import { addToCart } from '../../api/productApi';
import { useCart } from '../../context/CartContext';

const ProductActions = ({
    productId,
    storageOptions,
    colorOptions,
    quantity,
    onCartUpdated,
    onDecrease,
    onIncrease,
    onQuantityChange,
}) => {
    const { updateCart, isInCart } = useCart();
    const [selectedStorage, setSelectedStorage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [adding, setAdding] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const alreadyInCart = isInCart(productId);

    useEffect(() => {
        if (storageOptions?.length > 0) setSelectedStorage(String(storageOptions[0].code));
        if (colorOptions?.length > 0) setSelectedColor(String(colorOptions[0].code));
    }, [storageOptions, colorOptions]);

    const handleAddToCart = async () => {
        if (!selectedStorage || !selectedColor) return;
        setAdding(true);
        setFeedback(null);
        try {
            await addToCart({
                id: productId,
                colorCode: Number(selectedColor),
                storageCode: Number(selectedStorage),
            });
            updateCart(productId, {
                colorCode: Number(selectedColor),
                storageCode: Number(selectedStorage),
                quantity,
            });
            setFeedback({
                type: 'success',
                message: quantity === 0
                    ? 'Product removed from cart.'
                    : alreadyInCart
                        ? 'Cart updated!'
                        : 'Product added to cart!',
            });
            if (onCartUpdated) onCartUpdated();
        } catch (err) {
            setFeedback({ type: 'danger', message: 'Failed to update cart. Try again.' });
        } finally {
            setAdding(false);
        }
    };

    return (
        <>
            <div className="product__details__widget">
                <ul>
                    <li>
                        <span>Available storage:</span>
                        <div className="size__btn">
                            {storageOptions?.map((option) => (
                                <label
                                    key={`storage-${option.code}`}
                                    className={selectedStorage === String(option.code) ? 'active' : ''}
                                >
                                    <input
                                        type="radio"
                                        name="storage"
                                        value={option.code}
                                        checked={selectedStorage === String(option.code)}
                                        onChange={() => setSelectedStorage(String(option.code))}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </li>
                    <li>
                        <span>Available color:</span>
                        <div className="color__checkbox">
                            {colorOptions?.map((option) => (
                                <label
                                    key={`color-${option.code}`}
                                    title={option.name}
                                    className={selectedColor === String(option.code) ? 'active' : ''}
                                >
                                    <input
                                        type="radio"
                                        name="color"
                                        value={option.code}
                                        checked={selectedColor === String(option.code)}
                                        onChange={() => setSelectedColor(String(option.code))}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>

            <div className="product__details__button">
                <div className="quantity">
                    <span>Quantity:</span>
                    <div className="pro-qty">
                        <span className="dec qtybtn" onClick={onDecrease}>-</span>
                        <input type="text" value={quantity} onChange={onQuantityChange} disabled/>
                        <span className="inc qtybtn" onClick={onIncrease}>+</span>
                    </div>
                </div>
                <button
                    className="cart-btn"
                    onClick={handleAddToCart}
                    disabled={adding}
                >
                    <span className="icon_bag_alt"></span>
                    {adding
                        ? ' Updating...'
                        : alreadyInCart
                            ? ' Update cart'
                            : ' Add to cart'}
                </button>
            </div>

            {feedback && (
                <div className={`alert alert-${feedback.type} mt-3`}>
                    {feedback.message}
                </div>
            )}
        </>
    );
};

export default ProductActions;
