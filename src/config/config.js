// src/utils/Config.js

// ✅ Base API URL — picked from environment variable or default localhost
export const API_BASE =
  process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/";

// ✅ Default Axios config (CORS + JSON headers)
export const axiosConfig = {
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // helps with cookies/session if backend allows CORS credentials
};
