import { Folder } from "@/lib/apiTypes";
import Link from "next/link";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import Image from "next/image";
// import { useRenameFolderMutation } from "@/services/api";

const FolderCard = ({
  folder,
  openRenameModal,
}: {
  folder: Folder;
  openRenameModal: () => void;
}) => {
  const router = useRouter();
  const [openSideModal, setOpenSideModal] = useState(false);

  return (
    <Link href={`/folders/${folder.name}`}>
      {" "}
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted p-6">
          <div className="absolute right-3 top-3">
            <DropdownMenu open={openSideModal} onOpenChange={setOpenSideModal}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 bg-background/80 absolute md:static top-0 right-0 z-50 w-8 rounded-full hover:cursor-pointer backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  onClick={() => setOpenSideModal(true)}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(`/folders/${folder.name}`)}
                >
                  Open
                </DropdownMenuItem>
                {folder.name.toLowerCase() !== "general" && (
                  <DropdownMenuItem
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      openRenameModal();
                      setOpenSideModal(false);
                    }}
                  >
                    Rename
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex h-full items-center justify-center relative z-20">
            <Image
              src={"/folder_thumbnail.png"}
              width={200}
              height={200}
              alt="Folder Thumbnail"
            />
          </div>
        </div>

        {/* Folder Info */}
        <div className="p-4">
          <h3
            className="truncate font-medium text-card-foreground"
            title={folder.name}
          >
            {folder.name}
          </h3>
          {/* <p className="mt-1 text-sm text-muted-foreground">
          {folder.imageCount} {folder.imageCount === 1 ? "photo" : "photos"}
        </p> */}
        </div>
      </div>
    </Link>
  );
};

export default FolderCard;
