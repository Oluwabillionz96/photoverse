"use client";
import EmptyPhotos from "@/components/EmptyStates/EmptyPhotos";
import ImageGrid from "@/components/ImageGrid";
import PhotoLoader from "@/components/loaders/PhotoLoader";
import Pagination from "@/components/Pagination";
import PhotosPreview from "@/components/photosPreview";
import useInputContext from "@/hooks/useInputContext";
import { useGetPhotosQuery } from "@/services/api";
import useCurrentPage from "@/hooks/useCurrentPage";

const Photos = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();

  const { files, setFiles, ref, openFileDialog } = useInputContext();
  const { data, isLoading, isFetching } = useGetPhotosQuery({
    page: currentPage,
  });
  const photos = data?.photos;

  return (
    <section className="relative pt-5 mx-2 h-fit md:py-20 overflow-hidden">
      <>
        {files.length > 0 ? (
          <PhotosPreview files={files} setFiles={setFiles} ref={ref} />
        ) : isLoading || isFetching ? (
          <PhotoLoader />
        ) : photos && photos.length > 0 ? (
          <>
            <ImageGrid photos={photos} route="photos" />
            <Pagination
              totalPages={data?.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <EmptyPhotos
            handleUpload={openFileDialog}
            files={files}
            setFiles={setFiles}
            ref={ref}
          />
        )}
      </>
    </section>
  );
};
export default Photos;
