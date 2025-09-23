"use client";

import PhotoDisplay from "@/components/PhotoDisplay";
import { useParams } from "next/navigation";

const Photo = () => {
  const param = useParams();
  const foldername = param.folderName;
  return <PhotoDisplay route={`folders/${foldername}`} />;
};

export default Photo;
