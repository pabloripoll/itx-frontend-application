import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductListing from './pages/Product/ProductListing';
import ProductDetail from './pages/Product/ProductDetail';

const App = () => {
    return (
        <>
            <Header />
            <main className="container py-4">
                <Routes>
                    <Route path="/" element={<ProductListing />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </main>
        </>
    );
};

export default App;
