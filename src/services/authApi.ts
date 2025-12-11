export const authApi = {
  logout: async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    return res.json();
  },

  getProfile: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data.user;
  },

  updateProfile: async (data: any) => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/users/change-password', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
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

