import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API calls
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
};

// User API calls
export const userAPI = {
    // Get user profile
    getProfile: (userId) => api.get(`/users/${userId}`),

    // Update basic profile
    updateBasicProfile: (userId, data) => api.put(`/users/${userId}/profile`, data),

    // Update freelancer profile
    updateFreelancerProfile: (userId, data) => api.put(`/users/${userId}/freelancer`, data),

    // Update hirer profile
    updateHirerProfile: (userId, data) => api.put(`/users/${userId}/hirer`, data),

    // Get all users (admin only)
    getAllUsers: () => api.get('/users/all'),
};

export default api; 