"use client";
import EmptyPhotos from "@/components/EmptyStates/EmptyPhotos";
import ImageGrid from "@/components/ImageGrid";
import PhotoLoder from "@/components/loaders/PhotoLoder";
import Pagination from "@/components/Pagination";
import PhotosPreview from "@/components/photosPreview";
import useInputContext from "@/hooks/useInputContext";
import { useGetPhotosQuery } from "@/services/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Photos = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1")
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [router, pathname, currentPage]);

  const { files, setFiles, ref, openFileDialog } = useInputContext();
  const { data, isLoading, isFetching } = useGetPhotosQuery({
    page: currentPage,
  });
  const photos = data?.photos;

  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      <>
        {files.length > 0 ? (
          <PhotosPreview files={files} setFiles={setFiles} ref={ref} />
        ) : isLoading || isFetching ? (
          <PhotoLoder />
        ) : photos && photos.length > 0 ? (
          <>
            {" "}
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
