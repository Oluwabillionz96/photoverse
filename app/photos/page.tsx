"use client";
import EmptyPhotos from "@/components/EmptyStates/EmptyPhotos";
import ImageGrid from "@/components/ImageGrid";
import PhotoLoader from "@/components/loaders/PhotoLoader";
import Pagination from "@/components/Pagination";
import PhotosPreview from "@/components/photosPreview";
import useInputContext from "@/hooks/useInputContext";
import { useGetPhotosQuery } from "@/services/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Photos = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1"),
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
    <section className="relative pt-5 mx-2 h-fit md:py-20 overflow-hidden">
      {/* Background Patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-30 -z-10">
        {/* Floating Circles */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-3xl"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
          animate={{
            y: [0, 60, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.line
            x1="0%"
            y1="20%"
            x2="100%"
            y2="20%"
            stroke="oklch(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.line
            x1="0%"
            y1="60%"
            x2="100%"
            y2="60%"
            stroke="oklch(var(--accent))"
            strokeWidth="1"
            strokeOpacity="0.1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
          />
        </svg>

        {/* Floating Dots */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <>
        {files.length > 0 ? (
          <PhotosPreview files={files} setFiles={setFiles} ref={ref} />
        ) : isLoading || isFetching ? (
          <PhotoLoader />
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
