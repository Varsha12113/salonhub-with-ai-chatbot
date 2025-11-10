import axios from "axios";
import { axiosConfig } from "./config";

// ✅ Create Axios instance with base config
const api = axios.create({
  ...axiosConfig,
  withCredentials: true, // Needed if using cookies or JWT with CORS
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token for protected routes only
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Skip adding Authorization for public routes
    const isPublic =
      config.url.includes("api/auth/admin/register") ||
      config.url.includes("api/auth/login/");

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("HTTP Error:", error?.response || error);
    return Promise.reject(error?.response?.data || error.message);
  }
);

// ✅ CRUD helper functions
export const httpGet = async (url, params = {}) => {
  const res = await api.get(url, { params });
  return res.data;
};

export const httpPost = async (url, data) => {
  const res = await api.post(url, data);
  return res.data;
};

export const httpPut = async (url, data) => {
  const res = await api.put(url, data);
  return res.data;
};

export const httpDelete = async (url) => {
  const res = await api.delete(url);
  return res.data;
};

// ✅ Export the Axios instance
export default api;
