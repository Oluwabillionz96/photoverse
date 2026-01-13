import { authApi } from "@/services/auth";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  async function logout() {
    setLoading(true);

    const response = await authApi.logout();
    toast.success(response.data);

    setLoading(false);
  }
  return { logout, loading };
};

export default useLogout;
