"use client";
import { Card } from "@/components/ui/card";
import VerifyEmail from "@/components/VerifyEmail";
import { Rootstate } from "@/lib/store";
import { authApi } from "@/services/auth";
import { AxiosError } from "axios";
import { Mail, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function VerifyEmailPage() {
  const { email } = useSelector((state: Rootstate) => state.auth);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const verifyOTP = async (e: FormEvent, inputValue: string[]) => {
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
    router.push("/auth/verirfifi");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card transition-colors duration-200 cursor-pointer"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
            <Mail className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
            Verify your email
          </h1>
          <p className="text-muted-foreground">
            We&apos;ve sent a 6-digit code to your email address
          </p>
        </div>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
          {/* Verification Code Input */}
          <VerifyEmail
            email={email}
            verifyOTP={verifyOTP}
            isVerifying={isVerifying}
            type="account_verification"
          />

          {/* Divider */}
          <div className="border-t border-border/50" />
        </Card>

        {/* Info */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>🔒 Your account is secure during verification</p>
        </div>
      </div>
    </div>
  );
}
