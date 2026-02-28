"use client";

import EmptyFavourite from "@/components/EmptyStates/EmptyFavourite";
import ImageGrid from "@/components/ImageGrid";
import PhotoLoader from "@/components/loaders/PhotoLoader";
import Pagination from "@/components/Pagination";
import useCurrentPage from "@/hooks/useCurrentPage";
import { useGetFavouriteQuery } from "@/services/api";

const FavouritesPage = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const { data, isLoading, isFetching } = useGetFavouriteQuery({
    page: currentPage,
  });
  const photos = data?.photos;
  return (
    <section className="px-2">
      {isLoading || isFetching ? (
        <PhotoLoader />
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
