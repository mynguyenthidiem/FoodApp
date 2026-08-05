import api from "./client";

export const getUsers = () =>
  api.get("/User");

export const getUserById = (id) =>
  api.get(`/User/${id}`);

export const updateProfile = (id, data) =>
  api.put(`/User/profile/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteUser = (id) =>
  api.delete(`/User/${id}`);

export const createOwner = (data) =>
  api.post("/User/create-owner", data);