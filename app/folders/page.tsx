"use client";
import EmptyFolder from "@/components/EmptyStates/EmptyFolder";
import FolderLoader from "@/components/loaders/FolderLoader";
import { Card, CardContent } from "@/components/ui/card";
import { useGetFoldersQuery } from "@/services/api";
import Image from "next/image";
import Link from "next/link";

const Folders = () => {
  const { data, isLoading, isFetching } = useGetFoldersQuery(undefined);
  const folders = data?.folder;

  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      {isLoading || isFetching ? (
        <FolderLoader />
      ) : folders && folders?.length > 0 ? (
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
      ) : (
        <EmptyFolder />
      )}
    </section>
  );
};
export default Folders;
