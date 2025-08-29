"use client";
import EmptyFolder from "@/components/EmptyStates/EmptyFolder";
import { changeTab } from "@/lib/slices/routingSlice";
import { useDispatch } from "react-redux";

const Folders = () => {
  const dispatch = useDispatch();
  const setTab = (value: string) => {
    dispatch(changeTab(value));
  };

  return (
    <section className=" pt-5 mx-2 h-fit md:py-20">
      <EmptyFolder setTab={setTab} />
    </section>
  );
};
export default Folders;
