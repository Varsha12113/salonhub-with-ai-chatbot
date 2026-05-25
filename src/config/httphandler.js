import axios from "axios";
import { axiosConfig } from "../config/config";

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
// 🔹 Define Public Routes
// --------------------------------------------------
const publicRoutes = [
  "/api/auth/login/",
  "/api/auth/admin/register/",
  "/api/services/user/genders/",
  "/api/services/user/main/",
];

// --------------------------------------------------
// 🔹 Auto-Attach Token (Except Public APIs)
// --------------------------------------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Ensure we get only the path for comparison
    const urlPath = new URL(config.url, window.location.origin).pathname;

    const isPublic = publicRoutes.some((route) => urlPath.startsWith(route));

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !publicRoutes.some((route) =>
        new URL(originalRequest.url, window.location.origin).pathname.startsWith(route)
      )
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.warn("No refresh token found - clearing auth and redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          // Redirect to login page to re-authenticate
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
          return Promise.reject({ detail: "No refresh token found" });
        }

        // Call refresh token endpoint
        const response = await api.post("api/auth/refresh/", { refresh: refreshToken });

        const newToken = response.data.access;
        localStorage.setItem("token", newToken);

        // Update Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error?.response?.data || { detail: "Network error" });
  }
);
// End of response interceptor

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
