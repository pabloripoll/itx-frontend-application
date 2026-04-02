import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/img/logo.png';

const Header = () => {
    const { cartCount } = useCart();
    const location = useLocation();
    const isDetail = location.pathname.startsWith('/product/');

    return (
        <>
            {/* Offcanvas Menu Begin */}
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
            {/* Offcanvas Menu End */}

            {/* Header Section Begin */}
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
                                        <Link to="/"><i className="fas fa-home"></i></Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__right">
                                <ul className="header__right__widget">
                                    <li>
                                        <span className="icon_bag_alt"></span> <span>{cartCount}</span>
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
            {/* Header Section End */}

            {/* Breadcrumb Begin */}
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
            {/* Breadcrumb End */}
        </>
    );
};

export default Header;
