"use client";
import { motion } from "framer-motion";
import {
  ChangeEvent,
  ClipboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { useResendOTPMutation, useVerifyEmailMutation } from "@/services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authenticate } from "@/lib/slices/authSlice";
import Spinner from "./loaders/Spinner";
import { usePathname, useRouter } from "next/navigation";

const VerifyEmail = ({ email }: { email: string }) => {
  const [inputValue, setInputValue] = useState(["", "", "", "", "", ""]);

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [verify, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resend, { isLoading: isResending }] = useResendOTPMutation();
  const loading = isVerifying || isResending;
  const [resendCode, setResendCode] = useState(60);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (resendCode <= 0) return;

    const timerInterval = setInterval(() => {
      setResendCode((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [resendCode, setResendCode]);

  async function handlePaste(e: ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      if (/^\d{6}$/.test(text)) {
        setInputValue(text.split(""));
        inputRef.current[0]?.blur();
      }
    } catch (err) {
      console.error(err);
    }
  }

  const verifyOTP = async () => {
    const payload = { email: email, otp: inputValue.join("") };

    const response = await verify(payload);

    if ("data" in response) {
      toast.success(response?.data?.message);
      dispatch(authenticate({ token: response?.data?.token }));
      if (pathname === "/") {
        router.push("/folders");
      }
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { error: string };
      };

      const message =
        error?.data?.error ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
    return;
  };

  const resendOTP = async () => {
    const response = await resend({ email });
    if ("data" in response) {
      toast.success(response?.data?.message);
    } else if ("error" in response) {
      const error = response.error as {
        status?: number | string;
        data?: { error: string };
      };

      const message =
        error?.data?.error ||
        (error?.status === "FETCH_ERROR"
          ? "Network error. Please check your connection."
          : "An unexpected error occurred.");

      toast.error(message);
    }
    setResendCode(60);
    return;
  };

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
      <div
        className="grid grid-cols-6 md:gap-4 gap-2 md:px-4 px-2 md:w-9/10"
        onPaste={handlePaste}
      >
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
        className="w-9/10 h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-4"
        disabled={
          inputValue.join("").length !== 6 ||
          !inputValue.join("").trim() ||
          loading
        }
        onClick={verifyOTP}
      >
        {loading ? <Spinner /> : ""}
        {loading ? "Confirming..." : "Confirm"}
      </Button>
      {resendCode !== 0 ? (
        <p className="text-blue-500 text-[1.1rem]">
          Resend Code in {resendCode} seconds
        </p>
      ) : (
        <button
          onClick={resendOTP}
          disabled={loading}
          className="text-blue-500 text-[1.1rem] disabled:opacity-50"
        >
          {isResending ? "Resending code" : "Resend Code"}
        </button>
      )}
    </motion.div>
  );
};

export default VerifyEmail;
