import axios from 'axios';
import { services } from '@/config/appConfig';

const API_BASE_URL = services.user.baseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  // Only access localStorage in browser environment
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  register: async (data: {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response.data.user;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/api/users/profile', data);
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.post('/api/users/change-password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  asgardeoLogin: async (idToken: string) => {
    const response = await api.post('/api/auth/asgardeo/login', { idToken });
    return response.data;
  },
};
