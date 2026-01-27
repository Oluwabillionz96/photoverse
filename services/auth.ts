import axiosInstance from "@/lib/axios";

export const authApi = {
  async register(email: string, password: string) {
    const response = await axiosInstance.post("auth/register", {
      email,
      password,
    });
    return response.data;
  },
  async verifyOTP(email: string, otp: string) {
    const response = await axiosInstance.post("auth/verify-otp", {
      email,
      otp,
    });
    return response.data;
  },
  async login(email: string, password: string) {
    const response = await axiosInstance.post("auth/login", {
      email,
      password,
    });
    return response.data;
  },
  async logout() {
    const response = await axiosInstance.post("auth/logout");
    return response.data;
  },
  async getUser() {
    const response = await axiosInstance.get("auth/me");
    return response.data;
  },
};
