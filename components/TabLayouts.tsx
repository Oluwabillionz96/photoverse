import React, { useState } from "react";
import { Button } from "./ui/button";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import DropDown from "./dropDown";
import { FaFolder, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import { changeModalStatus, changeTab } from "@/lib/slices/routingSlice";
import { usePathname } from "next/navigation";

const TabLayouts = () => {
  const { tab, modalStatus } = useSelector((state: Rootstate) => state.routing);

  const dispatch = useDispatch();
  const setModalStatus = (value: "" | "preview" | "select" | "foldername") => {
    dispatch(changeModalStatus(value));
  };
  const filterValues = ["Recent", "Name(a-z)", "Name(z-a)", "Size"];
  const [values, setValues] = useState("Recent");
  const pathname = usePathname();
  function setTab(value: "photos" | "folders") {
    dispatch(changeTab(value));
  }

  return (
    <div className="md:flex  justify-between items-center px-4 my-4 hidden">
      <div className="flex justify-center  gap-8">
        <Button
          variant={"outline"}
          className={`w-[8.6rem] hover:transition hover:duration-500 h-[2.6rem] flex items-center  hover:bg-white hover:scale-105 hover:rotate-1 hover:border-blue-500 hover:text-blue-500 hover:border justify-center gap-4 rounded-[5px] hover:cursor-pointer ${
            tab === "photos" &&
            pathname === `/${tab}` &&
            "bg-blue-500 hover:bg-blue-500 hover:text-white hover:border-none  text-white border-0"
          }`}
          onClick={() => {
            setTab("photos");
          }}
        >
          <MdOutlinePhotoSizeSelectActual
            className={`${pathname === `/${tab}` ? "text-blue-500" : ""}`}
          />
          Photos
        </Button>

        <Button
          variant={"outline"}
          className={`w-[8.6rem] h-[2.6rem] hover:transition hover:duration-500 flex items-center  hover:bg-white hover:scale-105 hover:rotate-1 hover:border-blue-500 hover:text-blue-500 hover:border justify-center gap-4 rounded-[5px] hover:cursor-pointer ${
            tab === "folders" &&
            pathname === `/${tab}` &&
            "bg-blue-500 hover:bg-blue-500 hover:text-white hover:border-none  text-white border-0"
          }`}
          onClick={() => {
            setTab("folders");
          }}
        >
          <FaFolder
            className={`${
              tab !== "folders" && pathname === `/${tab}` ? "text-blue-500" : ""
            }`}
          />
          Folders
        </Button>
      </div>
      <div className="flex items-center justify-center gap-6 relative">
        <DropDown
          trigger={values}
          items={filterValues}
          initialValue={values}
          changeValue={setValues}
          className="w-32"
        />
        {pathname === "/folders" && (
          <Button
            variant={"outline"}
            disabled={modalStatus === "foldername"}
            className="w-[8.6rem] h-[2.6rem] flex items-center disabled:cursor-not-allowed justify-center gap-2"
            onClick={() => {
              setModalStatus("foldername");
            }}
          >
            <FaPlus />
            Create Folder
          </Button>
        )}
      </div>
    </div>
  );
};

export default TabLayouts;
