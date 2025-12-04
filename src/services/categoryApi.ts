import axios from 'axios';
import { services } from '@/config/appConfig';

const API_BASE_URL = services.category.baseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const categoryApi = {
  getCategories: async (params: any = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/categories?${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  getCategory: async (id: string) => {
   const res = await fetch(`/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch category");
    return res.json();
  },

  createCategory: async (data: any) => {
    const res = await fetch(`/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },

  updateCategory: async (id: string, data: any) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update category");
    return res.json();
  },

  deleteCategory: async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete category");
    return res.json();
  },

  getCategoryHierarchy: async (id: string) => {
    const response = await api.get(`/api/categories/${id}/hierarchy`);
    return response.data;
  },

  updateCategoryHierarchy: async (id: string, parentId: string | null) => {
    const response = await api.put(`/api/categories/${id}/hierarchy`, { parentId });
    return response.data;
  },
};
