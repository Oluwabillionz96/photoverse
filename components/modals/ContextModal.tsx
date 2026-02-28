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
import { usePathname } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

export default function ContextModal({
  children,
  handleSelectImage,
  isSelected,
  canSelectAll,
  allIsSelected,
  handleAllSelection,
  removeFavOption,
  handleMoveToTrash,
  handleRestore,
  handleDelete,
}: {
  children: ReactNode;
  handleSelectImage: (arg: MouseEvent) => void;
  isSelected: boolean;
  canSelectAll: boolean;
  allIsSelected: boolean;
  handleAllSelection: (arg: MouseEvent) => void;
  removeFavOption: boolean;
  handleMoveToTrash: (arg: MouseEvent) => void;
  handleRestore: (arg: MouseEvent) => void;
  handleDelete: (arg: MouseEvent) => void;
}) {
  const pathname = usePathname();
  console.log({ pathname });
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
        <ContextMenuItem onClick={handleSelectImage}>
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
        {!removeFavOption ||
          (!pathname.startsWith("/trash") && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem>Mark as Favourite</ContextMenuItem>
            </>
          ))}
        <ContextMenuSeparator />
        {!pathname.startsWith("/trash") ? (
          <>
            <ContextMenuItem variant="destructive" onClick={handleMoveToTrash}>
              Move To Trash
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Download Image</ContextMenuItem>
          </>
        ) : (
          <>
            <ContextMenuItem onClick={handleRestore}>Restore</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive" onClick={handleDelete}>
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
