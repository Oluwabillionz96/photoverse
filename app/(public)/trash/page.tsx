"use client";

import EmptyTrash from "@/components/EmptyStates/EmptyTrash";
import useCurrentPage from "@/hooks/useCurrentPage";
import { useGetTrashedPhotosQuery } from "@/services/api";

const TrashPage = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const { data } = useGetTrashedPhotosQuery({ page: currentPage });
  const photos = data;
  console.log({ photos });
  return (
    <section className="px-2">
      <EmptyTrash />
    </section>
  );
};

export default TrashPage;
