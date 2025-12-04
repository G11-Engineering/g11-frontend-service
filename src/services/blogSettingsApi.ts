import axios from 'axios';
import { services } from '@/config/appConfig';

const API_BASE_URL = services.content.baseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const blogSettingsApi = {
  getBlogSettings: async () => {
    const response = await api.get('/api/blog-settings');
    return response.data;
  },

  updateBlogSettings: async (data: {
    blogTitle: string;
    blogDescription?: string;
    blogLogoUrl?: string;
    blogFaviconUrl?: string;
    contactEmail?: string;
    socialFacebook?: string;
    socialTwitter?: string;
    socialLinkedin?: string;
    socialGithub?: string;
    seoMetaTitle?: string;
    seoMetaDescription?: string;
    seoKeywords?: string;
    googleAnalyticsId?: string;
  }) => {
    const response = await api.put('/api/blog-settings', data);
    return response.data;
  },
};

