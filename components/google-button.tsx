import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({
  handleClick,
  text,
}: {
  handleClick: () => void;
  text: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className="w-full cursor-pointer flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors duration-200 font-medium text-foreground"
    >
      <FcGoogle size={30} />
      {text}
    </button>
  );
};

export default GoogleButton;
