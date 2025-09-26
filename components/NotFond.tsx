import { AlertTriangleIcon, FolderIcon, ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const NotFond = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-6 sm:mb-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-500 delay-200">
          <AlertTriangleIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 animate-pulse" />
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-200 rounded-full animate-bounce delay-300"></div>
        <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-orange-200 rounded-full animate-bounce delay-500"></div>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 md:text-xl md:mb-2">
        Oops! Seems you&apos;re lost
      </h1>
      <p className="text-gray-600 md:mb-6 mb-8 md:max-w-sm max-w-md leading-relaxed md:text-sm lg:text-[1rem] text-base md:px-4 px-0">
        Let&apos;s get you back on track
      </p>
      <div className="flex flex-col md:flex-row gap-3 w-full justify-center items-center min-w-fit overflow-hidden md:w-[25%] lg:w-[15%] md:p-4">
        <Link href={"/folders"} className="w-full">
          <Button className="flex items-center hover:cursor-pointer justify-center space-x-2 bg-blue-500 hover:bg-blue-600 transition-all duration-200 hover:scale-105 hover:shadow-lg w-full md:w-auto">
            <FolderIcon className="w-4 h-4" />
            <span>Browse Folders</span>
          </Button>
        </Link>
        <Link href={"/photos"} className="w-full">
          <Button
            variant="outline"
            className="flex items-center hover:cursor-pointer justify-center space-x-2  bg-green-500 hover:bg-green-600 transition-all w-full md:w-auto duration-200 hover:scale-105 hover:shadow-md"
            onClick={() => {
              // setTab("photos");
            }}
          >
            <ImageIcon className={`w-4 h-4 ${"text-white"}`} />
            <span className={`${"text-white"}`}>Browse Photos</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFond;
