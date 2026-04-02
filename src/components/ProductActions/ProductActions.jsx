import { useState, useEffect } from 'react';
import { addToCart } from '../../api/productApi';
import { useCart } from '../../context/CartContext';

const ProductActions = ({ productId, storageOptions, colorOptions }) => {
    const { updateCartCount } = useCart();
    const [selectedStorage, setSelectedStorage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [adding, setAdding] = useState(false);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (storageOptions?.length > 0) setSelectedStorage(String(storageOptions[0].code));
        if (colorOptions?.length > 0) setSelectedColor(String(colorOptions[0].code));
    }, [storageOptions, colorOptions]);

    const handleAddToCart = async () => {
        if (!selectedStorage || !selectedColor) return;
        setAdding(true);
        setFeedback(null);
        try {
            const result = await addToCart({
                id: productId,
                colorCode: Number(selectedColor),
                storageCode: Number(selectedStorage),
            });
            updateCartCount(result.count);
            setFeedback({ type: 'success', message: 'Product added to cart!' });
        } catch (err) {
            setFeedback({ type: 'danger', message: 'Failed to add product. Try again.' });
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="product__details__button">
            <div className="product__details__widget">
                <ul>
                    <li>
                        <span>Storage:</span>
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
                        <span>Color:</span>
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
                                    <span className="checkmark"></span>
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>

            <button
                className="cart-btn"
                onClick={handleAddToCart}
                disabled={adding}
            >
                <span className="icon_bag_alt"></span>
                {adding ? ' Adding...' : ' Add to cart'}
            </button>

            {feedback && (
                <div className={`alert alert-${feedback.type} mt-3`}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

export default ProductActions;
