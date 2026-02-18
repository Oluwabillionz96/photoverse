"use client";
import VerifyEmail from "@/components/VerifyEmail";
import { Rootstate } from "@/lib/store";
import { authApi } from "@/services/auth";
import { AxiosError } from "axios";
import { Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, SubmitEvent } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Logo from "@/components/Logo";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/animated-background";
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
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Back Button */}
      <BackButton handleClick={() => router.back()} />

      {/* Content */}
      <div className="w-full flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Logo className="text-primary" size="md" />
            <span className="text-xl font-bold text-foreground">
              Photoverse
            </span>
          </div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <Mail className="w-8 h-8 text-primary" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Check your email
            </h2>
            <p className="text-muted-foreground text-lg mb-2">
              We sent a verification code to
            </p>
            <p className="text-primary font-semibold">
              {email || "your email"}
            </p>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6 sm:p-8 space-y-6 border border-border/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Verification Code Input */}
            <VerifyEmail
              email={email}
              verifyOTP={verifyOTP}
              isVerifying={isVerifying}
              type="account_verification"
            />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-6 flex items-center justify-center space-x-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 text-accent" />
              <span>Secure verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Encrypted</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
