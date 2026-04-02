import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className="product__item"
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div
                className="product__item__pic set-bg"
                style={{ backgroundImage: `url(${product.imgUrl})` }}
            />
            <div className="product__item__text">
                <h6>{product.brand}</h6>
                <p className="text-muted mb-1">{product.model}</p>
                <div className="product__price">
                    {product.price ? `${product.price} €` : 'N/A'}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
