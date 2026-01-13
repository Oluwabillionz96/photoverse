"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "code" | "reset" | "success">(
    "email"
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
        {step === "email" && (
          <>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
                Forgot password?
              </h1>
              <p className="text-muted-foreground">
                Enter your email and we&apos;ll send you a link to reset your
                password
              </p>
            </div>

            <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-blue-500-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Sending..." : "Send reset code"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-blue-500 hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </Card>
          </>
        )}

        {/* Step 2: Verification Code */}
        {step === "code" && (
          <>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
                Enter verification code
              </h1>
              <p className="text-muted-foreground">
                We&apos;ve sent a 6-digit code to {email}
              </p>
            </div>

            <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Verification code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`reset-code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        className="w-12 h-12 text-center text-lg font-bold border border-border rounded-lg bg-secondary/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      />
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-blue-500-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Verifying..." : "Verify code"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </Button>
              </form>

              <div className="border-t border-border/50" />

              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  Didn&apos;t receive the code?
                </p>
                <button
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0}
                  className="text-blue-500 hover:underline font-semibold text-sm disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors"
                >
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend code"}
                </button>
              </div>
            </Card>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <>
            <div className="text-center mb-8">
              <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
                Create new password
              </h1>
              <p className="text-muted-foreground">
                Enter a strong password for your account
              </p>
            </div>

            <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="new-password"
                    className="text-sm font-medium text-foreground"
                  >
                    New password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-blue-500"
                  />
                  <p className="text-xs text-muted-foreground">
                    At least 8 characters with a mix of letters and numbers
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-blue-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-blue-500-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Resetting..." : "Reset password"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </Button>
              </form>
            </Card>
          </>
        )}

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
                  href="/login"
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
