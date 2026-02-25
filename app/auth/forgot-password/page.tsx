"use client";

import { useState } from "react";
import EmailStep from "@/components/forgot-password/email-step";
import VerifyPasswordRecoveryEmail from "@/components/forgot-password/verify-email-for-password-recovery";
import ChoiceStep from "@/components/forgot-password/choice-step";
import ResetPassword from "@/components/forgot-password/reset-password";
import PasswordResetSuccess from "@/components/forgot-password/password-reset-success";
import Logo from "@/components/Logo";
import BackButton from "@/components/back-button";
import { useRouter } from "next/navigation";
import BackgroundPattern from "@/components/background-pattern";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<
    "email" | "code" | "choice" | "reset" | "success"
  >("email");

  const steps = ["email", "code", "choice", "reset", "success"];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex relative bg-background overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Back Button */}
      <BackButton handleClick={() => router.push("/auth/login")} />

      {/* Content */}
      <div className="w-full flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Logo className="text-foreground" size="md" />
            <span className="text-xl font-bold">Photoverse</span>
          </div>

          {/* Progress Bar */}
          {step !== "success" && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password Recovery
                </span>
                <span className="text-xs font-semibold">
                  Step {currentStepIndex + 1}/{steps.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="relative">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-foreground rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Milestone dots */}
                <div className="absolute top-0 left-0 w-full h-2 flex justify-between items-center">
                  {steps.map((stepName, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <div
                        key={stepName}
                        className="relative"
                        style={{
                          left: index === 0 ? "0" : index === steps.length - 1 ? "auto" : "auto",
                          right: index === steps.length - 1 ? "0" : "auto",
                        }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            isCompleted
                              ? "bg-foreground border-foreground"
                              : "bg-background border-border"
                          } ${isCurrent ? "ring-4 ring-foreground/20" : ""}`}
                        >
                          {isCompleted && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-background rounded-full" />
                            </div>
                          )}
                        </div>

                        {/* Step label */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <span
                            className={`text-[10px] font-medium ${
                              isCompleted ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {stepName === "email"
                              ? "Email"
                              : stepName === "code"
                                ? "Verify"
                                : stepName === "choice"
                                  ? "Choose"
                                  : stepName === "reset"
                                    ? "Reset"
                                    : "Done"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Steps */}
          <div>
            {step === "email" && <EmailStep setStep={setStep} />}
            {step === "code" && <VerifyPasswordRecoveryEmail setStep={setStep} />}
            {step === "choice" && <ChoiceStep setStep={setStep} />}
            {step === "reset" && <ResetPassword setStep={setStep} />}
            {step === "success" && <PasswordResetSuccess />}
          </div>
        </div>
      </div>
    </div>
  );
}
