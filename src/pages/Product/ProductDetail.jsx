import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../../api/productApi';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductDescription, { FieldItem, FieldRow } from '../../components/ProductDescription/ProductDescription';
import ProductActions from '../../components/ProductActions/ProductActions';

const getStoredQuantity = (id) => Number(localStorage.getItem(`quantity_${id}`)) || 0;
const setStoredQuantity = (id, qty) => localStorage.setItem(`quantity_${id}`, qty);

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(() => getStoredQuantity(id));
    const [activeTab, setActiveTab] = useState('description');

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

    // Sync quantity to localStorage whenever it changes
    useEffect(() => {
        setStoredQuantity(id, quantity);
    }, [id, quantity]);

    const handleDecrease = () => setQuantity((q) => Math.max(0, q - 1));
    const handleIncrease = () => setQuantity((q) => q + 1);
    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 0) setQuantity(val);
    };

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
                    <div className="col-lg-6">
                        <ProductImage imgUrl={product.imgUrl} model={product.model} />
                    </div>
                    <div className="col-lg-6">
                        <div className="product__details__text">
                            <ProductDescription product={product} />
                            <div className="product__details__widget">
                                <ul>
                                    <FieldItem label="CPU" value={product.cpu} />
                                    <FieldItem label="RAM" value={product.ram} />
                                    <FieldItem label="Operating System" value={product.os} />
                                    <FieldItem label="Screen Resolution" value={product.displayResolution} />
                                    <FieldItem label="Battery" value={product.battery} />
                                    <FieldItem label="Rear Camera" value={product.primaryCamera?.join(', ')} />
                                    <FieldItem label="Front Camera" value={product.secondaryCmera?.join(', ')} />
                                    <FieldItem label="Dimensions" value={product.dimentions} />
                                    <FieldItem label="Weight" value={product.weight ? `${product.weight} g` : null} />
                                </ul>
                            </div>
                            <ProductActions
                                productId={product.id}
                                storageOptions={product.options?.storages}
                                colorOptions={product.options?.colors}
                                quantity={quantity}
                                onAddedToCart={() => setQuantity((q) => q + 1)}
                                onDecrease={handleDecrease}
                                onIncrease={handleIncrease}
                                onQuantityChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="product__details__tab">
                            <ul className="nav nav-tabs" role="tablist">
                                {['description', 'specification', 'reviews'].map((tab) => (
                                    <li className="nav-item" key={tab}>
                                        <button
                                            className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <div className="tab-content">
                                <div className={`tab-pane ${activeTab === 'description' ? 'active' : ''}`} role="tabpanel">
                                    <h6>Description</h6>
                                    <p>{product.model} by {product.brand}. {product.os ? `Runs on ${product.os}.` : ''} {product.cpu ? `Powered by ${product.cpu}.` : ''}</p>
                                </div>
                                <div className={`tab-pane ${activeTab === 'specification' ? 'active' : ''}`} role="tabpanel">
                                    <h6>Specification</h6>
                                    <table className="table table-borderless table-sm">
                                    <tbody>
                                        <FieldRow label="Network" value={product.networkTechnology} />
                                        <FieldRow label="SIM" value={product.sim} />
                                        <FieldRow label="Display" value={product.displayType} />
                                        <FieldRow label="Display Size" value={product.displaySize} />
                                        <FieldRow label="Chipset" value={product.chipset} />
                                        <FieldRow label="GPU" value={product.gpu} />
                                        <FieldRow label="External Memory" value={product.externalMemory} />
                                        <FieldRow label="WLAN" value={product.wlan?.join(', ')} />
                                        <FieldRow label="Bluetooth" value={product.bluetooth?.join(', ')} />
                                        <FieldRow label="GPS" value={product.gps} />
                                        <FieldRow label="USB" value={product.usb} />
                                        <FieldRow label="Sensors" value={product.sensors?.join(', ')} />
                                    </tbody>
                                </table>
                                </div>
                                <div className={`tab-pane ${activeTab === 'reviews' ? 'active' : ''}`} role="tabpanel">
                                    <h6>Reviews</h6>
                                    <p className="text-muted">No reviews yet for this product.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;