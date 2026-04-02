import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ProductListing from './pages/Product/ProductListing';
import ProductDetail from './pages/Product/ProductDetail';

const App = () => {
    return (
        <>
            <Header />
                <Routes>
                    <Route path="/" element={<ProductListing />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            <Footer />
        </>
    );
};

export default App;
