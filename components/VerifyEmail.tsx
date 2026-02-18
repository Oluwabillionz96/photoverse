"use client";
import {
  ChangeEvent,
  ClipboardEvent,
  SubmitEvent,
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
  type,
}: {
  email: string;
  verifyOTP: (e: SubmitEvent, inputValue: string[]) => void;
  isVerifying: boolean;
  type: "account_verification" | "account_recovery";
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
    const response = await resend({ email, type });
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
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Enter Verification Code
      </p>
      <form
        className="grid grid-cols-6 gap-3 w-full"
        onPaste={handlePaste}
        onSubmit={(e: SubmitEvent) => {
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
            className="h-14 rounded-xl text-center text-2xl font-bold bg-background/50 border-2 border-border/30 focus:border-primary/50 focus:outline-none transition-all text-foreground"
          />
        ))}
      </form>
      <Button
        className="w-full h-12 rounded-xl text-primary-foreground font-semibold bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all duration-300"
        disabled={
          inputValue.join("").length !== 6 ||
          !inputValue.join("").trim() ||
          loading
        }
        type="submit"
        form="email_verification"
      >
        {isVerifying && <Spinner />}
        {isVerifying ? "Verifying..." : "Verify Email"}
      </Button>

      <div className="border-t border-border/30 w-full my-2" />

      <div className="text-center space-y-3 pb-2">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the code?
        </p>
        <button
          onClick={resendOTP}
          type="button"
          disabled={loading || resendCode > 0}
          className="text-primary hover:text-primary/80 font-semibold text-sm disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
        >
          {resendCode > 0
            ? `Resend in ${resendCode}s`
            : isResending
              ? "Resending..."
              : "Resend Code"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
