"use client";

import { useEffect, useState } from "react";

const useScreenSize = (maxSize: number = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < maxSize);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [maxSize]);

  return isMobile;
};

export default useScreenSize;
