import api from "./client";

export const getRestaurants = async (
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