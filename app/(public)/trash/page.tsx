"use client";

import EmptyTrash from "@/components/EmptyStates/EmptyTrash";
import ImageGrid from "@/components/ImageGrid";
import PhotoLoader from "@/components/loaders/PhotoLoader";
import Pagination from "@/components/Pagination";
import useCurrentPage from "@/hooks/useCurrentPage";
import { useGetTrashedPhotosQuery } from "@/services/api";

const TrashPage = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const { data, isLoading } = useGetTrashedPhotosQuery({ page: currentPage });
  const photos = data?.photos;
  console.log({ photos });
  return (
    <section className="px-2">
      {isLoading ? (
        <PhotoLoader />
      ) : photos && photos.length > 0 ? (
        <>
          <ImageGrid photos={photos} route="trash" />
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={data?.totalPages}
          />
        </>
      ) : (
        <EmptyTrash />
      )}
    </section>
  );
};

export default TrashPage;
