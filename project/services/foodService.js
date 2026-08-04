import api from "./client";

// ==============================
// GET ALL FOODS
// ==============================

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

// ==============================
// GET FOOD BY ID
// ==============================

export const getFoodById = async (id) => {
  const response = await api.get(
    `/Foods/${id}`
  );

  return response.data;
};

// ==============================
// GET FOODS BY CATEGORY
// ==============================

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

// ==============================
// GET FOODS BY RESTAURANT
// ==============================

export const getFoodsByRestaurant = async (
  restaurantId,
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get(
    `/Foods/restaurant/${restaurantId}`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );

  return response.data;
};

// ==============================
// SEARCH FOODS
// ==============================

export const searchFoods = async (
  keyword,
  pageNumber = 1,
  pageSize = 20
) => {
  const response = await api.get(
    "/Foods/search",
    {
      params: {
        keyword,
        pageNumber,
        pageSize,
      },
    }
  );

  return response.data;
};