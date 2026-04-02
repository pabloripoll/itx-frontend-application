import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

const Footer = () => {
    return (
        <>
            {/* Footer Section Begin */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-7">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <Link to="/"><img src={logo} alt="ITX Mobiles" /></Link>
                                </div>
                                <p>Your one-stop shop for the latest mobile devices.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-3 col-sm-5">
                            <div className="footer__widget">
                                <h6>Quick links</h6>
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-8 col-sm-8">
                            <div className="footer__newslatter">
                                <h6>FOLLOW US</h6>
                                <div className="footer__social">
                                    <a href="#"><i className="fab fa-facebook"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-youtube"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                    <a href="#"><i className="fab fa-pinterest"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer__copyright__text">
                                <p>
                                    Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is made with{' '}
                                    <i className="fas fa-heart" aria-hidden="true"></i> by{' '}
                                    <a href="https://colorlib.com" target="_blank" rel="noreferrer">Colorlib</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Footer Section End */}
        </>
    );
};

export default Footer;
