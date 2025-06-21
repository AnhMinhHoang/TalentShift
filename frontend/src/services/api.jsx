import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('Token in request interceptor:', token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific status codes
            if (error.response.status === 401) {
                // Handle unauthorized access
            }
            return Promise.reject({
                message: error.response.data.message || 'An error occurred',
                status: error.response.status,
            });
        }
        return Promise.reject({ message: 'Network error' });
    }
);

export default api;
