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

