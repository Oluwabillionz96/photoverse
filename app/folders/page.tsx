"use client";
import EmptyFolder from "@/components/EmptyStates/EmptyFolder";
import FolderLoader from "@/components/loaders/FolderLoader";
import Pagination from "@/components/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Rootstate } from "@/lib/store";
import { useGetFoldersQuery } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Folders = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1")
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, currentPage]);

  const { data, isLoading, isFetching } = useGetFoldersQuery({
    page: currentPage,
  });
  const folders = data?.folders;
  const { authenticated } = useSelector((state: Rootstate) => state.auth);

  if (!authenticated) {
    return <FolderLoader />;
  }

  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      {isLoading || isFetching ? (
        <FolderLoader />
      ) : folders && folders?.length > 0 ? (
        <>
          {" "}
          <div className="grid md:grid-cols-3 md:gap-6 lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4">
            {folders?.map((folder) => (
              <Card
                key={folder._id}
                className="group cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <Link href={`/folders/${folder?.name}`}>
                  <CardContent className="p-2">
                    <div className="relative mb-3 h-20 md:h-28 lg:h-32 xl:h-36">
                      <Image
                        src={"/folderThumbnail.png"}
                        alt={"thumbnail"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        fill
                      />
                    </div>

                    <div className="space-y-1">
                      <h3
                        className="font-medium text-sm md:text-base truncate"
                        title={folder.name}
                      >
                        {folder.name}
                      </h3>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
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
