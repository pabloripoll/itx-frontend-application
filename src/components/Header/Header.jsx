import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/img/logo.png';

const Header = () => {
    const { cartCount, recentItems } = useCart();
    const location = useLocation();
    const isDetail = location.pathname.startsWith('/product/');
    const [cartOpen, setCartOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                 
                setCartOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const prevLocation = useRef(location);


    useEffect(() => {
        if (prevLocation.current !== location) {
            prevLocation.current = location;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCartOpen(false);
        }
    }, [location]);

    return (
        <>
            <div className="offcanvas-menu-overlay"></div>
            <div className="offcanvas-menu-wrapper">
                <div className="offcanvas__close">+</div>
                <div className="offcanvas__logo">
                    <Link to="/"><img src={logo} alt="ITX Mobiles" /></Link>
                </div>
                <nav id="mobile-menu-wrap">
                    <ul className="offcanvas__widget">
                        <li>
                            <Link to="/"><i className="fas fa-home"></i> Home</Link>
                        </li>
                    </ul>
                </nav>
                <div className="offcanvas__cart">
                    <span className="icon_bag_alt"></span>
                    <div className="tip">{cartCount}</div>
                </div>
            </div>

            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-2">
                            <div className="header__logo">
                                <Link to="/"><img src={logo} alt="ITX Mobiles" /></Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <nav className="header__menu">
                                <ul>
                                    <li className={!isDetail ? 'active' : ''}>
                                        <Link to="/"><i className="fas fa-home"></i> Home</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__right">
                                <ul className="header__right__widget">
                                    <li
                                        ref={dropdownRef}
                                        style={{ position: 'relative', cursor: 'pointer' }}
                                        onClick={() => setCartOpen((prev) => !prev)}
                                    >
                                        <span className="icon_bag_alt"></span>
                                        {cartCount > 0 && <span className="tip">{cartCount}</span>}

                                        {cartOpen && (
                                            <div className="cart__dropdown" style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0,
                                                minWidth: '280px',
                                                background: '#fff',
                                                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                                zIndex: 999,
                                                padding: '16px',
                                                borderRadius: '4px',
                                            }}>
                                                {recentItems.length === 0 ? (
                                                    <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                                                        Your cart is empty.
                                                    </p>
                                                ) : (
                                                    <>
                                                        <p className="mb-2" style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                            Last {recentItems.length} added
                                                        </p>
                                                        <ul className="list-unstyled mb-0">
                                                            {recentItems.map((item) => (
                                                                <li key={item.id} style={{ width: '100%', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                                                                    <Link
                                                                        to={`/product/${item.id}`}
                                                                        style={{ color: '#333', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
                                                                    >
                                                                        <img
                                                                            src={item.imgUrl}
                                                                            alt={item.name}
                                                                            style={{ width: '44px', height: '44px', objectFit: 'contain', flexShrink: 0, border: '1px solid #f0f0f0', borderRadius: '4px' }}
                                                                        />
                                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                                            <div style={{ fontWeight: 500, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                                {item.name}
                                                                            </div>
                                                                            <div style={{ fontSize: '12px', color: '#999' }}>
                                                                                {item.brand}
                                                                            </div>
                                                                        </div>
                                                                        <b style={{ fontSize: '12px', color: '#999', flexShrink: 0 }}>
                                                                            x{item.quantity}
                                                                        </b>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>

            {isDetail && (
                <div className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__links">
                                    <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                    <span>Product Detail</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
