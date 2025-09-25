"use client";

import EmptyFavourite from "@/components/EmptyStates/EmptyFavourite";
import ImageGrid from "@/components/ImageGrid";
import PhotoLoder from "@/components/loaders/PhotoLoder";
import Pagination from "@/components/Pagination";
import { useGetFavouriteQuery } from "@/services/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FavouritesPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1")
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [currentPage, pathname, router]);
  const { data, isLoading, isFetching } = useGetFavouriteQuery({ page: 1 });
  const photos = data?.photos;
  return (
    <section className="px-2">
      {isLoading || isFetching ? (
        <PhotoLoder />
      ) : photos && photos.length > 0 ? (
        <>
          <ImageGrid photos={photos} route="photos" />
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={data?.totalPages}
          />
        </>
      ) : (
        <EmptyFavourite />
      )}
    </section>
  );
};

export default FavouritesPage;
