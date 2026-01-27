import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";

export function useProtectedRoute() {
  const router = useRouter();
  const { user, loading } = useSelector((state: Rootstate) => state.auth);

  useEffect(() => {
    if (!loading && !user.isAuthenticated) {
      router.push("/auth/login");
    }
  }, [user.isAuthenticated, loading, router]);

  return { isAuthenticated: user.isAuthenticated, loading };
}
