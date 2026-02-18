"use client";
import EmptyFolder from "@/components/EmptyStates/EmptyFolder";
import FolderLoader from "@/components/loaders/FolderLoader";
import Pagination from "@/components/Pagination";
// import { Rootstate } from "@/lib/store";
import { useGetFoldersQuery, useRenameFolderMutation } from "@/services/api";
// import { useSelector } from "react-redux";
import FolderCard from "@/components/FolderCard";
import RenameFolderModal from "@/components/modals/RenameFolderModal";
import toast from "react-hot-toast";
import useCurrentPage from "@/hooks/useCurrentPage";
import { useState } from "react";

const Folders = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();

  const [isRenameModalOpen, setIsRenamModalOpen] = useState(false);
  const [folderId, setFolderId] = useState("");
  const [renameFolder, { isLoading: isRenaming }] = useRenameFolderMutation();

  async function handleRenameFolder(folderId: string, foldername: string) {
    const payload = { id: folderId, foldername: foldername };
    const response = await renameFolder(payload);
    if ("data" in response) {
      toast.success(response?.data?.message);
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { error: string };
      };

      const message =
        error?.data?.error ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
    setIsRenamModalOpen(false);
  }

  const { data, isLoading, isFetching } = useGetFoldersQuery({
    page: currentPage,
  });
  const folders = data?.folders;
  // const { authenticated } = useSelector((state: Rootstate) => state.auth);

  // if (!authenticated) {
  //   return <FolderLoader />;
  // }

  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      {isLoading || isFetching ? (
        <FolderLoader />
      ) : folders && folders?.length > 0 ? (
        <>
          {" "}
          <div className="grid md:grid-cols-3 md:gap-6 lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4">
            {folders?.map((folder) => (
              <FolderCard
                key={folder._id}
                folder={folder}
                openRenameModal={() => {
                  setIsRenamModalOpen(true);
                  setFolderId(folder._id);
                }}
              />
            ))}
          </div>
          <RenameFolderModal
            isOpen={isRenameModalOpen}
            setIsOpen={setIsRenamModalOpen}
            folderId={folderId}
            handleRename={handleRenameFolder}
            loading={isRenaming}
          />
          <Pagination
            totalPages={data?.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <EmptyFolder />
      )}
    </section>
  );
};
export default Folders;
