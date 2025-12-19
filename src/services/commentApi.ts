export const commentApi = {
  getComments: async (params: any = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/comments?${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch comments");
    return res.json();
  },

  getComment: async (id: string) => {
    const res = await fetch(`/api/comments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch comment");
    return res.json();
  },

  createComment: async (data: any) => {
    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create comment");
    return res.json();
  },

  updateComment: async (id: string, data: any) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update comment");
    return res.json();
  },

  deleteComment: async (id: string) => {
    const res = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete comment");
    return res.json();
  },

  moderateComment: async (id: string, action: string, reason?: string) => {
    const res = await fetch(`/api/comments/${id}/moderate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
      body: JSON.stringify({ action, reason }),
    });
    if (!res.ok) throw new Error("Failed to moderate comment");
    return res.json();
  },

  likeComment: async (id: string) => {
    const res = await fetch(`/api/comments/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to like comment");
    return res.json();
  },

  getCommentLikes: async (id: string) => {
    const res = await fetch(`/api/comments/${id}/likes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch comment likes");
    return res.json();
  },

  getCommentModeration: async (id: string) => {
    const res = await fetch(`/api/comments/${id}/moderation`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch comment moderation");
    return res.json();
  },
};
