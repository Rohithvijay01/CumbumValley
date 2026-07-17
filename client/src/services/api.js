import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add a request interceptor to attach the JWT token
API.interceptors.request.use(
  (config) => {
    // Assuming token is saved in localStorage (we'll implement this via Redux later)
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
      
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
