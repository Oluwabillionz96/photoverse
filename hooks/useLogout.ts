import { authApi } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function logout() {
    setLoading(true);

    const response = await authApi.logout();
    toast.success(response.message);
    sessionStorage.removeItem("csrfToken");
    router.push("/");

    setLoading(false);
  }
  return { logout, loading };
};

export default useLogout;
