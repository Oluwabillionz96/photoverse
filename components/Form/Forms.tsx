import { LoginInfo, RegisterInfo, ViewPassword } from "@/lib/types";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Forms = ({
  isLogin,
  setIsLogin,
  loginInfo,
  setLoginInfo,
  registerInfo,
  setRegisterInfo,
  viewPassword,
  setViewPassword,
}: {
  isLogin: boolean;
  setIsLogin: (arg: boolean) => void;
  loginInfo: LoginInfo;
  setLoginInfo: (arg: LoginInfo) => void;
  registerInfo: RegisterInfo;
  setRegisterInfo: (arg: RegisterInfo) => void;
  viewPassword: ViewPassword;
  setViewPassword: (arg: ViewPassword) => void;
}) => {
  return (
    <motion.div
      initial={{ y: -600 }}
      animate={{ y: 0 }}
      exit={{ y: -600 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="bg-white lg:w-[30%] md:w-[60%] w-9/10  md:h-fit flex flex-col justify-center items-center gap-6 py-8 rounded-xl overflow-hidden"
    >
      <motion.h2
        initial={{ x: 0 }}
        animate={{
          x: [-400, 0],
        }}
        transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
        className="md:text-3xl text-xl  font-semibold  w-fit mx-auto text-center"
      >
        Welcome To Photoverse
      </motion.h2>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: [-400, 0] }}
        transition={{ duration: 0.5, ease: "easeIn", delay: 0.6 }}
        className="md:flex w-[74%] mx-auto hidden"
      >
        <MotionConfig transition={{ duration: 0.1, ease: "easeInOut" }}>
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            className={`h-10 rounded-tl-sm  rounded-bl-sm text-xl font-semibold hover:cursor-pointer flex-1/2 ${
              isLogin ? " bg-blue-500 text-white" : "bg-[#EAEAEB]"
            }`}
            onClick={() => {
              setIsLogin(true);
            }}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            onClick={() => {
              setIsLogin(false);
            }}
            className={`h-10 flex-1/2 rounded-tr-sm  md:block rounded-br-sm font-semibold hover:cursor-pointer text-xl ${
              !isLogin ? " bg-blue-500 text-white" : "bg-[#EAEAEB]"
            }`}
          >
            Register
          </motion.button>
        </MotionConfig>
      </motion.div>
      <AnimatePresence mode="wait">
        {isLogin ? (
          <LoginForm
            key={"login"}
            loginInfo={loginInfo}
            setLoginInfo={setLoginInfo}
            viewPassword={viewPassword}
            setViewPassword={setViewPassword}
            setIsLogin={setIsLogin}
          />
        ) : (
          <RegistrationForm
            key={"register"}
            registerInfo={registerInfo}
            setRegisterInfo={setRegisterInfo}
            viewPassword={viewPassword}
            setViewPassword={setViewPassword}
            setIsLogin={setIsLogin}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Forms;
