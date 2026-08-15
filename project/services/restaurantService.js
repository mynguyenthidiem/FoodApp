import api from "../api/client";

// GET /api/Restaurant
export const getAllRestaurants = async (
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get("/Restaurant", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};

// GET /api/Restaurant/{id}
export const getRestaurantById = async (id) => {
  const response = await api.get(`/Restaurant/${id}`);

  return response.data;
};

// POST /api/Restaurant
export const createRestaurant = async (data) => {
  const response = await api.post("/Restaurant", data);

  return response.data;
};

// PUT /api/Restaurant/{id}
export const updateRestaurant = async (id, data) => {
  const response = await api.put(`/Restaurant/${id}`, data);

  return response.data;
};

// DELETE /api/Restaurant/{id}
export const deleteRestaurant = async (id) => {
  const response = await api.delete(`/Restaurant/${id}`);

  return response.data;
};

// PATCH /api/Restaurant/{id}/status
export const updateRestaurantStatus = async (id, data) => {
  const response = await api.patch(
    `/Restaurant/${id}/status`,
    data
  );

  return response.data;
};

// GET /api/Restaurant/search
export const searchRestaurants = async (
  keyword,
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get("/Restaurant/search", {
    params: {
      keyword,
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};
// GET /api/Restaurant/top-rated
export const getTopRatedRestaurants = async (count = 10) => {
  const response = await api.get("/Restaurant/top-rated", {
    params: {
      count,
    },
  });

  return response.data;
};

// GET /api/Restaurant/open-now
export const getOpenNowRestaurants = async (
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get("/Restaurant/open-now", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};