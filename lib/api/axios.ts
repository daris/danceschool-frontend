import axios from "axios";
import {store} from "@/lib/store";
import {logout} from "@/lib/features/auth/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Logout if 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) store.dispatch(logout());
    return Promise.reject(error);
  }
);

export default api;