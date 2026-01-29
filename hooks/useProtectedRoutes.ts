import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";

export function useProtectedRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useSelector((state: Rootstate) => state.auth);

  useEffect(() => {
    if (!loading && !user.isAuthenticated) {
      if (
        pathname.startsWith("/photos") ||
        pathname.startsWith("/folders") ||
        pathname.startsWith("/favourites") ||
        pathname.startsWith("/trash")
      )
        router.push("/auth/login");
    }
  }, [user.isAuthenticated, loading, router, pathname]);

  return { isAuthenticated: user.isAuthenticated, loading };
}
