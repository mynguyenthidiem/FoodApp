import api from "./client";

// GET /api/Foods
export const getFoods = async (
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get("/Foods", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};

// GET /api/Foods/{id}
export const getFoodById = async (id) => {
  const response = await api.get(`/Foods/${id}`);
  return response.data;
};

// GET /api/Foods/category/{id}
export const getFoodsByCategory = async (
  categoryId,
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get(
    `/Foods/category/${categoryId}`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );

  return response.data;
};
