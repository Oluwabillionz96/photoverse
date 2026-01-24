import baseUrl from "@/baseUrl";
import axios from "axios";
import { getCsrfToken } from "./utils";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // For cookies
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const methodsRequiringCsrf = ["post", "put", "delete", "patch"];

    if (
      config.method &&
      methodsRequiringCsrf.includes(config.method?.toLowerCase())
    ) {
      const csrfToken = getCsrfToken();

      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 403 &&
      error.response?.data?.error?.includes("CSRF")
    ) {
      // CSRF token invalid/missing - could trigger re-authentication
      console.error("CSRF token validation failed");
      // Optionally: redirect to login or refresh tokens
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post("auth/refresh");

        return axiosInstance(originalRequest);
      } catch (refreshError) {
         window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error)
  },
);

export default axiosInstance;
