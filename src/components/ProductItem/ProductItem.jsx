import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div
            className="card h-100 shadow-sm"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <img
                src={product.imgUrl}
                alt={`${product.brand} ${product.model}`}
                className="card-img-top p-3"
                style={{ objectFit: 'contain', height: '200px' }}
            />
            <div className="card-body text-center">
                <h6 className="card-title mb-1">{product.brand}</h6>
                <p className="card-text text-muted mb-1">{product.model}</p>
                <p className="card-text fw-bold">
                    {product.price ? `${product.price} €` : 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default ProductItem;
