import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const { cartCount } = useCart();
    const location = useLocation();
    const isDetail = location.pathname.startsWith('/product/');

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand fw-bold" to="/">
                📱 Mobile Shop
            </Link>

            <nav className="ms-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <Link className="text-light" to="/">Home</Link>
                    </li>
                    {isDetail && (
                        <li className="breadcrumb-item active text-secondary">
                            Product Detail
                        </li>
                    )}
                </ol>
            </nav>

            <div className="ms-auto text-light">
                <span className="badge bg-primary">{cartCount}</span>
            </div>
        </header>
    );
};

export default Header;
