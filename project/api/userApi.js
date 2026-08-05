import api from "./client";

export const updateProfile = (id, formData) =>
  api.put(`/user/profile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });