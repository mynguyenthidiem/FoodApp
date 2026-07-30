import api from "./client";

// ⚠️ Route là số ít: /api/Restaurant (không phải /Restaurants)
export const getAllRestaurants = (pageNumber = 1, pageSize = 20) =>
  api.get("/Restaurant", { params: { pageNumber, pageSize } });

export const getRestaurantById = (id) => api.get(`/Restaurant/${id}`);