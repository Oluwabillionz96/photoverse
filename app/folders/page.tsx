"use client";
import EmptyFolder from "@/components/EmptyStates/EmptyFolder";
import FolderLoader from "@/components/loaders/FolderLoader";
import Pagination from "@/components/Pagination";
// import { Rootstate } from "@/lib/store";
import { useGetFoldersQuery, useRenameFolderMutation } from "@/services/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import FolderCard from "@/components/FolderCard";
import RenameFolderModal from "@/components/modals/RenameFolderModal";
import toast from "react-hot-toast";

const Folders = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1")
  );
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, currentPage]);

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
      {isLoading || isFetching  ? (
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
