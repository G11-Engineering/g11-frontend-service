export const authApi = {
  logout: async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    return res.json();
  },

  getProfile: async () => {
    const res = await fetch('/api/users/profile');
    const data = await res.json();
    return data.user;
  },

  updateProfile: async (data: any) => {
    const res = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const res = await fetch('/api/users/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return res.json();
  },

  asgardeoLogin: async (idToken: string) => {
    const res = await fetch('/api/auth/asgardeo/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });
    return res.json();
  },
};

