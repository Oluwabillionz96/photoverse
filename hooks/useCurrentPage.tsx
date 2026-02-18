import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useCurrentPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1"),
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [router, pathname, currentPage]);

  return { currentPage, setCurrentPage };
};

export default useCurrentPage;
