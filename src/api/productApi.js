import axios from 'axios';
import { getCache, setCache } from '../service/cacheService';

const BASE_URL = 'https://itx-frontend-test.onrender.com';

const api = axios.create({
    baseURL: BASE_URL,
});

/**
 * Get all products.
 * Cached for 1 hour.
 */
export const getProducts = async () => {
    const cacheKey = 'products';
    const cached = getCache(cacheKey);

    if (cached) return cached;

    const { data } = await api.get('/api/product');
    setCache(cacheKey, data);

    return data;
};

/**
 * Get product detail by ID.
 * Cached individually per product ID for 1 hour.
 */
export const getProductDetail = async (id) => {
    const cacheKey = `product_${id}`;
    const cached = getCache(cacheKey);

    if (cached) return cached;

    const { data } = await api.get(`/api/product/${id}`);
    setCache(cacheKey, data);

    return data;
};

/**
 * Add product to cart.
 * Returns the updated cart count.
 */
export const addToCart = async ({ id, colorCode, storageCode }) => {
    const { data } = await api.post('/api/cart', { id, colorCode, storageCode });

    return data;
};
