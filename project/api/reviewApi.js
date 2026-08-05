import api from "./client";

export const getReviewById = (id) =>
  api.get(`/Review/${id}`);

export const getFoodReviews = (foodId) =>
  api.get(`/Review/food/${foodId}`);

export const createReview = (data) =>
  api.post("/Review", data);

export const updateReview = (id, data) =>
  api.put(`/Review/${id}`, data);

export const deleteReview = (id) =>
  api.delete(`/Review/${id}`);