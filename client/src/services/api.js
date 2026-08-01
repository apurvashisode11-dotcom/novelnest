import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// --- Auth ---
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// --- Books ---
export const fetchBooks = () => api.get('/books');

// --- Orders ---
export const placeOrder = (orderData) => api.post('/orders', orderData);
export const fetchOrders = () => api.get('/orders');

// --- Users / Profile ---
export const getUserProfile = (userId) => api.get(`/users/${userId}`);
export const updateUserProfile = (userId, profileData) => api.put(`/users/${userId}/profile`, profileData);
export const changeUserPassword = (userId, passwordData) => api.put(`/users/${userId}/password`, passwordData);

export default api;
