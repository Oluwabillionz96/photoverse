"use client";
import VerifyEmail from "@/components/VerifyEmail";
import { Rootstate } from "@/lib/store";
import { authApi } from "@/services/auth";
import { AxiosError } from "axios";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, SubmitEvent } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Logo from "@/components/Logo";
import BackButton from "@/components/back-button";

export default function VerifyEmailPage() {
  const { email } = useSelector((state: Rootstate) => state.auth);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const verifyOTP = async (e: SubmitEvent, inputValue: string[]) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const response = await authApi.verifyOTP(email, inputValue.join(""));
      toast.success(response?.message);
      router.push("/folders");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error
          : "An unexpected error occurred.";

      toast.error(errorMessage);
      console.error("Error in OTP verification:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (!email.trim()) {
    router.push("/auth/login");
  }

  return (
    <div className="min-h-screen flex relative bg-background">
      {/* Back Button */}
      <BackButton handleClick={() => router.back()} />

      {/* Content */}
      <div className="w-full flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Logo className="text-foreground" size="md" />
            <span className="text-xl font-bold">Photoverse</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6">
              <Mail className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-[1.1]">
              Check your email
            </h2>
            <p className="text-muted-foreground mb-2">
              We sent a verification code to
            </p>
            <p className="font-semibold">{email || "your email"}</p>
          </div>

          <div className="rounded-xl p-6 sm:p-8 space-y-6 border border-border bg-card">
            {/* Verification Code Input */}
            <VerifyEmail
              email={email}
              verifyOTP={verifyOTP}
              isVerifying={isVerifying}
              type="account_verification"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
