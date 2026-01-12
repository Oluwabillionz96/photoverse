import baseUrl from "@/baseUrl";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // For cookies
  timeout: 10000,
});

export default axiosInstance;
