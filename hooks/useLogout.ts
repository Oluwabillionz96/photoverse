import { updateUser } from "@/lib/slices/authSlice";
import { authApi } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  async function logout() {
    try {
      setLoading(true);

      const response = await authApi.logout();
      if (response.message) {
        toast.success(response.message);
        sessionStorage.removeItem("csrfToken");
        dispatch(updateUser({ email: "", isAuthenticated: false }));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured");
    }

    setLoading(false);
  }
  return { logout, loading };
};

export default useLogout;
