"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import EmailStep from "@/components/forgot-password/email-step";
import VerifyPasswordRecoveryEmail from "@/components/forgot-password/verify-email-for-password-recovery";
import ResetPassword from "@/components/forgot-password/reset-password";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "reset" | "success">(
    "reset"
  );
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    setIsLoading(true);
    // Add your send reset email logic here
    setTimeout(() => {
      setIsLoading(false);
      setStep("code");
    }, 1000);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value.toUpperCase();
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`reset-code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code.length !== 6) {
      alert("Please enter all 6 digits");
      return;
    }
    setIsLoading(true);
    // Add your verify code logic here
    setTimeout(() => {
      setIsLoading(false);
      setStep("reset");
    }, 1000);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    setIsLoading(true);
    // Add your reset password logic here
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1000);
  };

  const handleResendCode = async () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-md">
        {/* Step 1: Email */}
        {step === "email" && <EmailStep />}

        {/* Step 2: Verification Code */}
        {step === "code" && <VerifyPasswordRecoveryEmail email="" />}

        {/* Step 3: Reset Password */}
        {step === "reset" && <ResetPassword />}

        {/* Step 4: Success */}
        {step === "success" && (
          <>
            <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Password reset
                </h2>
                <p className="text-muted-foreground">
                  Your password has been successfully reset. You can now sign in
                  with your new password.
                </p>
              </div>
              <Button className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-blue-500-foreground font-semibold rounded-lg">
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 w-full"
                >
                  Back to login
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </Card>
          </>
        )}

        {/* Info */}
        {step !== "success" && (
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>🔒 Your account security is our priority</p>
          </div>
        )}
      </div>
    </div>
  );
}
