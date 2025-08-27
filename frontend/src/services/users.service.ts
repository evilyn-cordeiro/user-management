import api from "./auth.service";

export const userService = {
  async getAll() {
    const res = await api.get("/users");
    return res.data;
  },

  async create(user: { name: string; email: string; type: string; password: string }) {
    const res = await api.post("/users", user);
    return res.data;
  },

  async update(id: number, data: Partial<{ name: string; email: string; type: string; password: string }>) {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },

  async remove(id: number) {
    await api.delete(`/users/${id}`);
  }
};
