"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";

const FolderLoader = () => {
  return (
    <div className="grid lg:grid-cols-4  gap-8">
      {Array.from({ length: 8 }, (item, index) => (
        <Card
          key={index}
          className="group cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] aspect-square flex items-center justify-center animate-pulse"
        >
          <CardContent className="w-full h-[70%] bg-black/10"></CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FolderLoader;
