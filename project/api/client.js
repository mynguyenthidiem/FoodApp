import axios from "axios";
import { getToken } from "../utils/tokenStorage";

const API_ORIGIN = "http://10.0.2.2:5078";
const BASE_URL = `${API_ORIGIN}/api`;

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { API_ORIGIN };
export default api;