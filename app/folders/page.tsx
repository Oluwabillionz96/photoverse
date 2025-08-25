"use client";
import EmptyFolder from "@/components/EmptyStates/EmptyFolder";
import { changeCreateFolder, changeTab } from "@/lib/slices/routingSlice";
import { useDispatch } from "react-redux";

const Folders = () => {
  const dispatch = useDispatch();
  function setCreateFolder(value: boolean) {
    dispatch(changeCreateFolder(value));
  }
  const setTab = (value: string) => {
    dispatch(changeTab(value));
  };

  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      {/* <FileInput /> */}
      {/* <EmptyState tab={tab} setTab={setTab} setCreateFolder={setCreateFolder} /> */}
      <EmptyFolder setCreateFolder={setCreateFolder} setTab={setTab} />
    </section>
  );
};
export default Folders;
