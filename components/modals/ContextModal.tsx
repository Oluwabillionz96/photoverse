import {
  ContextMenu,
  // ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  // ContextMenuLabel,
  // ContextMenuRadioGroup,
  // ContextMenuRadioItem,
  ContextMenuSeparator,
  // ContextMenuShortcut,
  // ContextMenuSub,
  // ContextMenuSubContent,
  // ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useImageHandler from "@/hooks/useImageHandler";
import useScreenSize from "@/hooks/useScreenSize";
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

export default function ContextModal({
  children,
  canSelectAll,
  allIsSelected,
  handleAllSelection,
  isFavourite,
  photoId,
}: {
  children: ReactNode;
  canSelectAll?: boolean;
  allIsSelected?: boolean;
  handleAllSelection?: (arg: MouseEvent) => void;
  isFavourite: boolean;
  photoId: string;
}) {
  const pathname = usePathname();
  const isMobile = useScreenSize();
  const {
    mutations: {
      toggleIsFavourite,
      deletePhoto,
      movePhotoTotrash,
      restoretrashedPhoto,
    },
    handleImageSelection,
    selectedPhotoIds,
  } = useImageHandler();
  const isSelected = selectedPhotoIds.includes(photoId);
  // On mobile, skip context menu so long-press can select photos instead
  if (isMobile || selectedPhotoIds.length > 0) return <>{children}</>;
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        {/* <ContextMenuItem inset>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem> */}
        {/* <ContextMenuItem inset disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem> */}
        <ContextMenuItem
          onClick={(e) => {
            handleImageSelection(photoId, e);
          }}
        >
          {!isSelected ? "Select Image" : "Remove Selection"}
          {/* <ContextMenuShortcut>⌘R</ContextMenuShortcut> */}
        </ContextMenuItem>
        {canSelectAll && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={handleAllSelection}>
              {allIsSelected ? "Remove all selection" : "Select all"}
            </ContextMenuItem>
          </>
        )}

        <ContextMenuSeparator />
        {!pathname.startsWith("/trash") ? (
          <>
            <ContextMenuItem
              variant="destructive"
              onClick={(e) => {
                movePhotoTotrash([photoId], e);
              }}
            >
              Move To Trash
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              variant={isFavourite ? "destructive" : "default"}
              onClick={(e) => {
                toggleIsFavourite([photoId], e);
              }}
            >
              {!isFavourite ? "Mark as " : "Remove from "}Favourite
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Download Image</ContextMenuItem>
          </>
        ) : (
          <>
            <ContextMenuItem
              onClick={(e) => {
                restoretrashedPhoto([photoId], e);
              }}
            >
              Restore
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              variant="destructive"
              onClick={(e) => {
                deletePhoto([photoId], e);
              }}
            >
              Delete
            </ContextMenuItem>
          </>
        )}

        {/* <ContextMenuSub>
          <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            <ContextMenuItem>Save Page...</ContextMenuItem>
            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
            <ContextMenuSeparator />

          </ContextMenuSubContent>
        </ContextMenuSub> */}
        {/* <ContextMenuSeparator /> */}
        {/* <ContextMenuCheckboxItem checked>
          Show Bookmarks
        </ContextMenuCheckboxItem> */}
        {/* <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem> */}
        {/* <ContextMenuSeparator /> */}
        {/* <ContextMenuRadioGroup value="pedro"> */}
        {/* <ContextMenuLabel inset>People</ContextMenuLabel>
          <ContextMenuRadioItem value="pedro">
            Pedro Duarte
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
        </ContextMenuRadioGroup> */}
      </ContextMenuContent>
    </ContextMenu>
  );
}
