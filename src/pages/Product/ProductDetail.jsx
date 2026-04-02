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

    if (loading) return (
        <div id="preloder">
            <div className="loader"></div>
        </div>
    );

    if (error) return <div className="alert alert-danger m-4">{error}</div>;
    if (!product) return <div className="alert alert-warning m-4">Product not found.</div>;

    return (
        <section className="product-details spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-3">
                        <Link to="/" className="btn btn-outline-secondary">
                            <i className="fa fa-arrow-left"></i> Back to list
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <ProductImage imgUrl={product.imgUrl} model={product.model} />
                    </div>
                    <div className="col-lg-6">
                        <ProductDescription product={product} />
                        <ProductActions
                            productId={product.id}
                            storageOptions={product.internalMemory}
                            colorOptions={product.colors}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
