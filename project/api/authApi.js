import api from "./client";

export const login = (data) =>
  api.post("/Auth/login", data);

export const register = (data) =>
  api.post("/Auth/register", data);

export const getProfile = () =>
  api.get("/Auth/profile");

export const googleLogin = (data) =>
  api.post("/Auth/google", data);

export const changePassword = (data) =>
  api.put("/Auth/change-password", data);