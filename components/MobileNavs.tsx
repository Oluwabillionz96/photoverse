"use client";
import useInputContext from "@/hooks/useInputContext";
import { Rootstate } from "@/lib/store";
import { usePathname } from "next/navigation";
import { FaX } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedPhoto } from "@/lib/slices/photoSlice";
import TopMobileNav from "./top-mobile-nav";
import BottomMobileNav from "./bottom-mobile-nav";
import MobileSelectedPhotoOptions from "./mobile-selected-photo-options";

const MobileNavs = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();
  const { selectedPhotosIds } = useSelector((state: Rootstate) => state.photo);
  const dispatch = useDispatch();

  const { files } = useInputContext();

  return (
    <>
      {(pathName.startsWith("/folders") || pathName.startsWith("/photos")) && (
        <>
          {selectedPhotosIds.length === 0 ? (
            <TopMobileNav />
          ) : (
            <div className="flex justify-between mt-4 mb-6 mx-2">
              <div className="flex gap-6">
                <button
                  onClick={() => {
                    dispatch(removeSelectedPhoto(selectedPhotosIds));
                  }}
                >
                  <FaX />
                </button>
                <p>{selectedPhotosIds.length}</p>
              </div>
              <div>
                <MobileSelectedPhotoOptions />
              </div>
            </div>
          )}
        </>
      )}
      {children}
      {(pathName.startsWith("/folders") || pathName.startsWith("/photos")) &&
        selectedPhotosIds.length === 0 &&
        files.length < 1 && <BottomMobileNav pathName={pathName} />}
    </>
  );
};

export default MobileNavs;
