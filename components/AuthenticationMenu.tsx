import { motion, MotionConfig } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const AuthenticationMenu = ({
  setShowMenu,
}: {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const onLoginClick = () => router.push("/auth/login");
  const onRegisterClick = () => router.push("/auth/register");

  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className=" fixed h-full backdrop-blur-xl  bg-black z-50 top-0 left-0 right-0 bottom-0"
      />
      <motion.div
        className="w-full rounded-b-md h-1/3 bg-white z-50 fixed top-0 right-0 grid place-items-center"
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -200, opacity: 0 }}
      >
        <div
          className="absolute right-2 top-2"
          onClick={() => setShowMenu(false)}
        >
          <IoIosClose size={32} />
        </div>
        <div className="flex flex-col gap-2 w-full p-2 text-2xl">
          <Button
            className="w-full bg-blue-500 py-3"
            onClick={() => {
              setShowMenu(false);
              onLoginClick();
            }}
          >
            Login
          </Button>
          <Button
            className="w-full bg-blue-500 py-3"
            onClick={() => {
              setShowMenu(false);
              onRegisterClick();
            }}
          >
            Register
          </Button>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default AuthenticationMenu;
