import axiosInstance from "@/lib/axios";
import { FcGoogle } from "react-icons/fc";

function navigate(url: string) {
  window.location.href = url;
}

async function auth() {
  const response = await axiosInstance.post("/request");
  const data = response.data;
  navigate(data.url);
}

const GoogleButton = ({ text }: { text: string }) => {
  return (
    <button
      onClick={auth}
      className="w-full cursor-pointer flex items-center justify-center gap-3 md:px-4 px-2 md:py-3 py-1.5 border border-border rounded-lg hover:bg-secondary transition-colors duration-200 font-medium text-foreground"
    >
      <FcGoogle size={30} />
      {text}
    </button>
  );
};

export default GoogleButton;
