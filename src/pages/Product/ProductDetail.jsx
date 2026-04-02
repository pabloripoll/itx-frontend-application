import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetail } from '../../api/productApi';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductDescription from '../../components/ProductDescription/ProductDescription';
import ProductActions from '../../components/ProductActions/ProductActions';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductDetail(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to load product details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-5">Loading product...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!product) return <div className="alert alert-warning">Product not found.</div>;

    return (
        <div>
            <Link to="/" className="btn btn-outline-secondary mb-4">
                ← Back to list
            </Link>
            <div className="row g-4">
                <div className="col-12 col-md-6">
                    <ProductImage imgUrl={product.imgUrl} model={product.model} />
                </div>
                <div className="col-12 col-md-6">
                    <ProductDescription product={product} />
                    <ProductActions
                        productId={product.id}
                        storageOptions={product.internalMemory}
                        colorOptions={product.colors}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
