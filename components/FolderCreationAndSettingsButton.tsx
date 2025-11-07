import React from "react";
import { Button } from "./ui/button";
import { redirect, useParams, usePathname } from "next/navigation";
import useModalContext from "@/hooks/useModalContext";
import useInputContext from "@/hooks/useInputContext";
import { FaPlus } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/services/api";
import toast from "react-hot-toast";
import { Rootstate } from "@/lib/store";
import { logUserOut } from "@/lib/slices/authSlice";

const FolderCreationAndSettingsButton = ({ useLogout }:{useLogout:() => ReturnType<typeof useLogoutMutation>}) => {
  const pathname = usePathname();
  const { modalStatus, changeModalStatus: setModalStatus } = useModalContext();
  const { ref, openFileDialog } = useInputContext();
  const params = useParams();
  const { refreshToken } = useSelector((state: Rootstate) => state.auth);
  const [logout] = useLogout();
  const dispatch = useDispatch();

  async function Logout() {
    const payload = { token: refreshToken };

    const response = await logout(payload);
    if ("data" in response) {
      dispatch(logUserOut(false));
      toast.success(response.data?.message);
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
  }
  return (
    <div className="flex items-center justify-center gap-6 relative">
      {/* <DropDown
              trigger={values}
              items={filterValues}
              initialValue={values}
              changeValue={setValues}
              className="w-32"
            /> */}
      <Button
        variant={"outline"}
        disabled={modalStatus === "foldername"}
        className="w-[8.6rem] h-[2.6rem] flex items-center disabled:cursor-not-allowed justify-center gap-2"
        onClick={() => {
          if (params.folderName || pathname === "/photos") {
            openFileDialog(ref);
            return;
          }
          setModalStatus("foldername");
        }}
      >
        <FaPlus />
        {pathname === "/folders"
          ? "Create Folder"
          : params.folderName || pathname === "/photos"
          ? "Add photo"
          : ""}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <IoSettingsSharp /> Settings
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-16" align="end">
          <DropdownMenuItem
            onClick={() => {
              Logout();
              redirect("/");
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FolderCreationAndSettingsButton;
