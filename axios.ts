import axios from 'axios';

// Connect to the backend API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject JWT token into secure requests
api.interceptors.request.use(
  (config) => {
    // Usually tokens are stored in localStorage or secure HTTP-only cookies
    const token = typeof window !== 'undefined' ? localStorage.getItem('medlink_token') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
