import {
  getAllRestaurants as getAllRestaurantsApi,
  getRestaurantById as getRestaurantByIdApi,
} from "../api/restaurantApi";

// GET ALL

export const getAllRestaurants = async (pageNumber = 1, pageSize = 20) => {
  const response = await getAllRestaurantsApi();

  return response.data;
};

// GET DETAIL

export const getRestaurantById = async (id) => {
  const response = await getRestaurantByIdApi(id);

  return response.data;
};
