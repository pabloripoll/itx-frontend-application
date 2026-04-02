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
        if (storageOptions?.length > 0) setSelectedStorage(storageOptions[0].code);
        if (colorOptions?.length > 0) setSelectedColor(colorOptions[0].code);
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
        <div>
            <div className="mb-3">
                <label className="form-label fw-bold">Storage</label>
                <select
                    className="form-select"
                    value={selectedStorage}
                    onChange={(e) => setSelectedStorage(e.target.value)}
                >
                    {storageOptions?.map((option) => (
                        <option key={option.code} value={option.code}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Color</label>
                <select
                    className="form-select"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                >
                    {colorOptions?.map((option) => (
                        <option key={option.code} value={option.code}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="btn btn-primary w-100"
                onClick={handleAddToCart}
                disabled={adding}
            >
                {adding ? 'Adding...' : 'Add to Cart'}
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
