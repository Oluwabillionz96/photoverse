import baseUrl from "@/baseUrl";
import axios from "axios";
import { getCsrfToken } from "./utils";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 10000,
});

function reRoute() {
  if (window.location.pathname === "/") {
    window.location.href = "/";
  } else {
    window.location.href = "/auth/login";
  }
}

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
  (res) => res,
  async (error) => {
    console.log({ error });
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      try {
        await axiosInstance.post("auth/refresh");
        return axiosInstance(originalRequest);
      } catch {
        reRoute();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (data.csrfToken) {
      sessionStorage.setItem("csrfToken", data.csrfToken);
    }
    return res;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
