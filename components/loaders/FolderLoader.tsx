"use client";
// import { Card, CardContent } from "../ui/card";

const FolderLoader = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          className="group relative overflow-hidden rounded-xl border border-border bg-black/20 transition-all animate-pulse"
          key={index}
        >
          {/* Image area */}
          <div className="relative aspect-[4/3] bg-muted/40">
            <div className="absolute right-3 top-3"></div>
          </div>

          {/* Folder Info */}
          <div className="p-4 space-y-2">
            <div className="h-5 w-3/4 rounded-md bg-muted/60" />
            {/* optional smaller text */}
            {/* <div className="h-4 w-1/3 rounded-md bg-muted/40 animate-pulse" /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FolderLoader;
