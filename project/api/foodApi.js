import api from "./client";

export const getAllFoods = (pageNumber = 1, pageSize = 20) =>
  api.get("/Foods", { params: { pageNumber, pageSize } });

export const getFoodById = (id) => api.get(`/Foods/${id}`);
export const getFoodsByCategory = (categoryId, pageNumber = 1, pageSize = 20) =>
  api.get(`/Foods/category/${categoryId}`, { params: { pageNumber, pageSize } });
export const searchFoods = (keyword, pageNumber = 1, pageSize = 20) =>
  api.get("/Foods/search", { params: { keyword, pageNumber, pageSize } });