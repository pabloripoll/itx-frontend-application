import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import SearchBar from '../../components/SearchBar/SearchBar';
import ProductItem from '../../components/ProductItem/ProductItem';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
                setFiltered(data);
            } catch (_err) {
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const term = search.toLowerCase();
        const results = products.filter(
            (p) =>
                p.brand.toLowerCase().includes(term) ||
                p.model.toLowerCase().includes(term)
        );
        setFiltered(results);
    }, [search, products]);

    if (loading) return (
        <div id="preloder">
            <div className="loader"></div>
        </div>
    );

    if (error) return <div className="alert alert-danger m-4">{error}</div>;

    return (
        <section className="product spad">
            <div className="container">
                <div className="row align-items-center mb-4">
                    <div className="col-lg-4 col-md-4">
                        <div className="section-title">
                            <h4>Mobile Phones</h4>
                        </div>
                    </div>
                    <SearchBar value={search} onChange={setSearch} />
                </div>
                {filtered.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        No products found for &quot;{search}&quot;
                    </div>
                ) : (
                    <div className="row property__gallery">
                        {filtered.map((product) => (
                            <div
                                key={product.id}
                                className="col-lg-3 col-md-4 col-sm-6 mb-4 mt-4"
                            >
                                <ProductItem product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductListing;
