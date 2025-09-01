"use client";

import { useParams } from "next/navigation";

const Folder = () => {
  const params = useParams();
  console.log(params);
  return <div>{params.folderName}</div>;
};

export default Folder;
