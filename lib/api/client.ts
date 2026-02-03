// Centralized Axios Client Configuration
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // Return only data
  },
  (error: AxiosError) => {
    // Handle errors globally
    const errorMessage = (error.response?.data as any)?.message || error.message;
    
    // You can add global error handling here
    console.error('API Error:', errorMessage);

    // Handle specific error codes
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      // window.location.href = '/login';
    }

    return Promise.reject({
      message: errorMessage,
      statusCode: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default apiClient;
