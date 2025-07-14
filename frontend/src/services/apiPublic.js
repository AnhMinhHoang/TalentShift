// src/api/apiPublic.js
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL || '';
const API_URL = `${baseUrl}/api`;

const apiPublic = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// No auth header interceptor
apiPublic.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject({
                message: error.response.data.message || 'An error occurred',
                status: error.response.status,
            });
        }
        return Promise.reject({ message: 'Network error' });
    }
);

export default apiPublic;
