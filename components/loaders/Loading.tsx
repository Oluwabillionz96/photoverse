import Image from "next/image";

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-[999999999] backdrop-blur-sm bg-black/50 flex items-center justify-center animate-pulse">
      <Image src={"/photoverse-logo.png"} width={100} height={100} alt="logo" />
    </div>
  );
};
