"use client";

import PhotoViewer from "@/components/PhotoViewer";
import { useParams } from "next/navigation";

export default function FolderPhotoPage() {
  const params = useParams();
  const folderName = Array.isArray(params.folderName) ? params.folderName[0] : params.folderName;
  
  return <PhotoViewer mode="view" navPrefix={`/folders/${folderName}`} />;
}
