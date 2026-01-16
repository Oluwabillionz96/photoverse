"use client";
import {
  ChangeEvent,
  ClipboardEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { useResendOTPMutation } from "@/services/api";
import toast from "react-hot-toast";
import Spinner from "./loaders/Spinner";

const VerifyEmail = ({
  email,
  verifyOTP,
  isVerifying,
}: {
  email: string;
  verifyOTP: (e: FormEvent, inputValue: string[]) => void;
  isVerifying: boolean;
}) => {
  const [inputValue, setInputValue] = useState(["", "", "", "", "", ""]);

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  // const [verify, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resend, { isLoading: isResending }] = useResendOTPMutation();
  const loading = isVerifying || isResending;
  const [resendCode, setResendCode] = useState(60);

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

  async function handlePaste(e: ClipboardEvent<HTMLFormElement>) {
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
    <div className="bg-white w-full md:h-fit flex flex-col justify-center items-center gap-6 pt-8 rounded-xl overflow-hidden">
      <p className="text-center text-[1.15rem] md:w-9/10">
        Enter Verification Code
      </p>
      <form
        className="grid grid-cols-6 md:gap-4 gap-2  md:w-9/10"
        onPaste={handlePaste}
        onSubmit={(e: FormEvent) => {
          verifyOTP(e, inputValue);
        }}
        id="email_verification"
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
      </form>
      <Button
        className="w-full h-11 rounded-sm text-white text-xl hover:cursor-pointer bg-blue-500 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-4"
        disabled={
          inputValue.join("").length !== 6 ||
          !inputValue.join("").trim() ||
          loading
        }
        type="submit"
        form="email_verification"
        // onClick={verifyOTP}
      >
        {loading ? <Spinner /> : ""}
        {loading ? "Confirming..." : "Confirm"}
      </Button>

      <div className="border-t border-border/50 w-full" />

      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?
        </p>
        <button
          onClick={resendOTP}
          disabled={loading || resendCode > 0}
          className="text-blue-500 hover:underline font-semibold text-sm disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
        >
          {/* {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"} */}
          {resendCode > 0
            ? ` Resend Code in ${resendCode} seconds`
            : isResending
            ? "Resending code"
            : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
