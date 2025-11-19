import axios from "axios";
import { axiosConfig } from "./config";

// --------------------------------------------------
// 🔹 Create Axios instance
// --------------------------------------------------
const api = axios.create({
  ...axiosConfig,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------------------------------------
// 🔹 Auto-Attach Token (Except Public APIs)
// --------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Define public routes
    const publicRoutes = [
      "/api/auth/login/",
      "/api/auth/admin/register/",
      "/api/services/user/genders/",
      "/api/services/user/main/",
    ];

    const isPublic = publicRoutes.some((route) =>
      config.url.startsWith(route)
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------------------------------------
// 🔹 Global Error Handler
// --------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("HTTP Error:", error?.response || error);

    return Promise.reject(error?.response?.data || { detail: "Network error" });
  }
);

// --------------------------------------------------
// 🔹 CRUD Helper Functions
// --------------------------------------------------
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

export const httpPatch = async (url, data) => {
  const res = await api.patch(url, data);
  return res.data;
};

export const httpDelete = async (url) => {
  const res = await api.delete(url);
  return res.data;
};

export default api;
