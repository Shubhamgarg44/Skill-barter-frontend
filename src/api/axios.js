// src/api/axios.js
import axios from "axios";

/**
 * ✅ Production-ready Axios instance
 * Automatically points to the correct backend
 * and attaches JWT token if present.
 */

// Use environment variable so build can switch between dev/prod
// In Vite, you access env vars via import.meta.env
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Create Axios instance
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set true only if using cookies
});

// --- Attach token automatically ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Handle common response errors globally ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — remove it and redirect
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
