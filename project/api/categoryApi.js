import api from "./client";

export const getSystemCategories = () =>
  api.get("/SystemCategories");

export const getSystemCategoryById = (id) =>
  api.get(`/SystemCategories/${id}`);

export const createSystemCategory = (data) =>
  api.post("/SystemCategories", data);

export const updateSystemCategory = (id, data) =>
  api.put(`/SystemCategories/${id}`, data);

export const deleteSystemCategory = (id) =>
  api.delete(`/SystemCategories/${id}`);