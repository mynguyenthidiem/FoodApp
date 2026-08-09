import api from '../api/client';

// ======================================
// GET REVIEW BY ID
// GET /api/Review/{id}
// ======================================

export const getReviewById = async id => {
  const response = await api.get(`/Review/${id}`);

  return response.data;
};

// ======================================
// GET REVIEWS OF A FOOD
// GET /api/Review/food/{foodId}
// ======================================

export const getFoodReviews = async (foodId, pageNumber = 1, pageSize = 20) => {
  const response = await api.get(`/Review/food/${foodId}`, {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};

// ======================================
// CREATE REVIEW
// POST /api/Review
// ======================================

export const createReview = async data => {
  const response = await api.post('/Review', data);

  return response.data;
};

// ======================================
// UPDATE REVIEW
// PUT /api/Review/{id}
// ======================================

export const updateReview = async (id, data) => {
  const response = await api.put(`/Review/${id}`, data);

  return response.data;
};

// ======================================
// DELETE REVIEW
// DELETE /api/Review/{id}
// ======================================

export const deleteReview = async id => {
  const response = await api.delete(`/Review/${id}`);

  return response.data;
};
