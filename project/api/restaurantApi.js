import api from "./client";

export const getAllRestaurants = () =>
  api.get("/Restaurant");

export const getRestaurantById = (id) =>
  api.get(`/Restaurant/${id}`);

export const createRestaurant = (data) =>
  api.post("/Restaurant", data);

export const updateRestaurant = (id, data) =>
  api.put(`/Restaurant/${id}`, data);

export const deleteRestaurant = (id) =>
  api.delete(`/Restaurant/${id}`);

export const updateRestaurantStatus = (id, data) =>
  api.patch(`/Restaurant/${id}/status`, data);