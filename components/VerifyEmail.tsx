import { motion } from "framer-motion";
import { ChangeEvent, useRef, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const VerifyEmail = ({
  email,
  resendCode,
}: {
  email: string;
  resendCode: number;
}) => {
  const [inputValue, setInputValue] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <motion.div
      initial={{ y: 600 }}
      animate={{ y: 0 }}
      exit={{ y: 600 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="bg-white lg:w-[30%] md:w-[60%] w-9/10  md:h-fit flex flex-col justify-center items-center gap-6 py-8 rounded-xl overflow-hidden"
    >
      <h2 className="md:text-3xl text-xl  font-semibold  md:w-fit mx-auto text-center">
        Confirm Your Email
      </h2>
      <p className="text-center text-[1.15rem] md:w-9/10">
        Please enter the 6-digit code that was sent to {email}
      </p>
      <div className="grid grid-cols-6 md:gap-4 gap-2 md:px-4 px-2 md:w-9/10">
        {inputValue.map((item, index) => (
          <input
            type="text"
            ref={(el) => {
              inputRef.current[index] = el;
            }}
            key={index}
            value={item}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              if (
                value !== "" &&
                (isNaN(Number(value)) || value.includes("."))
              ) {
                return;
              }

              const update = [...inputValue];
              update[index] = value;
              setInputValue(update);

              if (value !== "" && index < inputValue.length - 1) {
                inputRef.current[index + 1]?.focus();
              } else if (value !== "" && index === inputValue.length - 1) {
                inputRef.current[index]?.blur();
              }
            }}
            maxLength={1}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !item && index > 0) {
                inputRef.current[index - 1]?.focus();
              }
            }}
            className="border-2 border-gray-300 h-12 rounded-[8px] text-center text-xl"
          />
        ))}
      </div>
      <Button
        className="w-9/10 h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={
          inputValue.join("").length !== 6 || !inputValue.join("").trim()
        }
      >
        Confirm
      </Button>
      {resendCode !== 0 ? (
        <p className="text-blue-500 text-[1.1rem]">
          Resend Code in {resendCode} seconds
        </p>
      ) : (
        <Link href={""} className="text-blue-500 text-[1.1rem]">
          Resend Code
        </Link>
      )}
    </motion.div>
  );
};

export default VerifyEmail;
