import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
//import SearchBar from '../../components/SearchBar/SearchBar';
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
            } catch (err) {
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

    if (loading) return <div className="text-center py-5">Loading products...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            {/* <SearchBar value={search} onChange={setSearch} /> */}
            {filtered.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    No products found for &quot;{search}&quot;
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-2">
                    {filtered.map((product) => (
                        <div className="col" key={product.id}>
                            <ProductItem product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductListing;
