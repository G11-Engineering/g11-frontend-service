import axios from 'axios';
import { services } from '@/config/appConfig';

const API_BASE_URL = services.category.baseUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tagApi = {
  getTags: async (params: any = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/tags?${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch tags");
    return res.json();
  },

  getTag: async (id: string) => {
    const res = await fetch(`/api/tags/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch tag");
    return res.json();
  },

  createTag: async (data: any) => {
    const res = await fetch(`/api/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create tag");
    return res.json();
  },

  updateTag: async (id: string, data: any) => {
    const res = await fetch(`/api/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update tag");
    return res.json();
  },

  deleteTag: async (id: string) => {
    const res = await fetch(`/api/tags/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete tag");
    return res.json();
  },

  getPopularTags: async (limit: number = 20) => {
    const res = await fetch(`/api/tags/popular?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch popular tags");
    return res.json();
  },
};

