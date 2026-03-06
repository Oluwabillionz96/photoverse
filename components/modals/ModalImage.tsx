import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Photo } from "@/lib/apiTypes";
import { cloudinaryLoader } from "@/components/ImageGrid";
import IndividualPhotoLoader from "@/components/individual-photo-loader";

interface ModalImageProps {
  photo: Photo;
  direction: number;
}

export default function ModalImage({ photo, direction }: ModalImageProps) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center max-w-full max-h-full mx-2 md:mx-0"
      custom={direction}
      variants={{
        enter: (dir: number) => ({
          x: dir > 0 ? 300 : -300,
          opacity: 0,
        }),
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1,
        },
        exit: (dir: number) => ({
          zIndex: 0,
          x: dir < 0 ? 300 : -300,
          opacity: 0,
        }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <Image
        src={photo?.link || "/placeholder.svg"}
        alt={"Image"}
        width={1200}
        height={800}
        className="min-w-full max-h-[80vh] object-contain"
        priority
        loader={cloudinaryLoader}
        loading="eager"
        onLoad={() => setImageLoading(false)}
      />
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <IndividualPhotoLoader inline />
        </div>
      )}
    </motion.div>
  );
}
