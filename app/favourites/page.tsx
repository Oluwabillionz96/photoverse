"use client";

import ImageGrid from "@/components/ImageGrid";
import PhotoLoder from "@/components/loaders/PhotoLoder";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useGetFavouriteQuery } from "@/services/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

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
      <div className="flex items-center my-4  text-xl">
        <Button
          onClick={() => {
            router.back();
          }}
          className="w-fit h-fit text-black bg-transparent hover:bg-transparent flex items-center justify-center"
        >
          <FaArrowLeft />
        </Button>
        <p className="">Favourites</p>
      </div>
      {isLoading || isFetching ? (
        <PhotoLoder />
      ) : photos && photos.length > 0 ? (
        <>
          {" "}
          <ImageGrid photos={photos} route="photos" />
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={data?.totalPages}
          />
        </>
      ) : (
        <p>You&apos;ve got no favourites</p>
      )}
    </section>
  );
};

export default FavouritesPage;
