export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'editor' | 'author' | 'reader';
  avatar_url?: string;
  bio?: string;
  is_active: boolean;
  created_at: string;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

export const userApi = {
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
    status?: string;
  }) => {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`/api/users?${query}`);
    return res.json();
  },

  getUserById: async (id: string) => {
    const res = await fetch(`/api/users/${id}`);
    return res.json();
  },

  updateUser: async (id: string, data: UpdateUserData) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  },

  deleteUser: async (id: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

