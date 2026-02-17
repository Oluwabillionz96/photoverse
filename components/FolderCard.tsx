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
import Logo from "./Logo";
import { cloudinaryLoader } from "./ImageGrid";
import { getRandomGradient } from "@/lib/utils";

const FolderCard = ({
  folder,
  openRenameModal,
}: {
  folder: Folder;
  openRenameModal: () => void;
}) => {
  const router = useRouter();
  const [openSideModal, setOpenSideModal] = useState(false);

  // Get consistent gradient for this folder
  const gradient = getRandomGradient(folder._id);

  return (
    <Link href={`/folders/${folder.name}`}>
      <div className="group relative overflow-hidden rounded-xl border border-border glass transition-all hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50">
        <div className="relative aspect-4/3 bg-linear-to-br from-muted/50 to-muted overflow-hidden">
          <div className="absolute right-3 top-3 z-50">
            <DropdownMenu open={openSideModal} onOpenChange={setOpenSideModal}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full glass border border-border/30 hover:bg-background/90 backdrop-blur-sm transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenSideModal(true);
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="glass border-border/30"
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/folders/${folder.name}`);
                  }}
                  className="hover:bg-primary/10 hover:text-primary cursor-pointer"
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
                    className="hover:bg-primary/10 hover:text-primary cursor-pointer"
                  >
                    Rename
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {folder.photos && folder.photos.length > 0 ? (
            // Show first photo as folder thumbnail
            <Image
              src={folder.photos[folder.photos.length - 1].link}
              alt={folder.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loader={cloudinaryLoader}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            // Show placeholder with logo (no shimmer)
            <div
              className={`absolute inset-0 bg-linear-to-br ${gradient} flex items-center justify-center`}
            >
              <Logo className="text-foreground/20" size="lg" />
            </div>
          )}
        </div>

        {/* Folder Info */}
        <div className="p-4 glass border-t border-border/30">
          <h3
            className="truncate font-semibold text-foreground"
            title={folder.name}
          >
            {folder.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default FolderCard;
