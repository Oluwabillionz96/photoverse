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
import { MouseEvent, ReactNode } from "react";

export default function ContextModal({
  children,
  handleSelectImage,
  isSelected,
  canSelectAll,
  allIsSelected,
  handleAllSelection,
  removeFavOption,
}: {
  children: ReactNode;
  handleSelectImage: (arg: MouseEvent) => void;
  isSelected: boolean;
  canSelectAll: boolean;
  allIsSelected: boolean;
  handleAllSelection: (arg: MouseEvent) => void;
  removeFavOption: boolean;
}) {
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
        {!removeFavOption && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem>Mark as Favourite</ContextMenuItem>
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Move To Trash</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Download Image</ContextMenuItem>
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
