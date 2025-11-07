"use client";
import { useLogoutMutation, useMovePhotoToTrashMutation, useToggleFavouriteMutation } from "@/services/api";
import { Loading } from "./modals/AuthenticationModal";
import DesktopTabNavs from "./DesktopTabNavs";
import FolderCreationAndSettingsButton from "./FolderCreationAndSettingsButton";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import useToggleIsFavourite from "@/hooks/useToggleIsFavourite";
import { removeSelectedPhoto } from "@/lib/slices/photoSlice";
import useMoveToTrash from "@/hooks/useMoveToTrash";

const TabLayouts = () => {
  // const filterValues = ["Recent", "Name(a-z)", "Name(z-a)", "Size"];
  // const [values, setValues] = useState("Recent");
  const [, { isLoading }] = useLogoutMutation();
  const { selectedPhotosIds } = useSelector((state: Rootstate) => state.photo);
  const toggleIsFavourite = useToggleIsFavourite(useToggleFavouriteMutation);
  const moveToTrash = useMoveToTrash(useMovePhotoToTrashMutation);
  const dispatch = useDispatch();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : selectedPhotosIds.length > 0 ? (
        <div className="md:flex  justify-between items-center px-4 mt-4 hidden">
          <div className="space-x-4">
            <Button
              variant={"outline"}
              onClick={async () => {
                await moveToTrash(selectedPhotosIds);
                dispatch(removeSelectedPhoto(selectedPhotosIds));
              }}
              className="w-[8.6rem] h-[2.6rem] hover:cursor-pointer hover:bg-red-100 hover:border-red-300 group"
            >
              <Trash2Icon className="group-hover:text-red-400" />
              Move to trash
            </Button>
            <Button
              variant={"outline"}
              className="w-fit h-[2.6rem] hover:cursor-pointer group  hover:border-pink-300 hover:bg-pink-100"
              onClick={async () => {
                await toggleIsFavourite(selectedPhotosIds);
                dispatch(removeSelectedPhoto(selectedPhotosIds));
              }}
            >
              <FaHeart className="group-hover:text-pink-500 " />
              Favourite
            </Button>
          </div>
        </div>
      ) : (
        <div className="md:flex  justify-between items-center px-4 my-4 hidden">
          <DesktopTabNavs />
          <FolderCreationAndSettingsButton useLogout={useLogoutMutation} />
        </div>
      )}
    </>
  );
};

export default TabLayouts;
