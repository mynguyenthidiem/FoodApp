import api from "./client";

export const getCategories = () =>
  api.get("/Categories");

export const getCategoryById = (id) =>
  api.get(`/Categories/${id}`);

export const createCategory = (data) =>
  api.post("/Categories", data);

export const updateCategory = (id, data) =>
  api.put(`/Categories/${id}`, data);

export const deleteCategory = (id) =>
  api.delete(`/Categories/${id}`);