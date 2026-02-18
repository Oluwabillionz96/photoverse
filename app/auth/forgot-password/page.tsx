"use client";

import { useState } from "react";
import EmailStep from "@/components/forgot-password/email-step";
import VerifyPasswordRecoveryEmail from "@/components/forgot-password/verify-email-for-password-recovery";
import ChoiceStep from "@/components/forgot-password/choice-step";
import ResetPassword from "@/components/forgot-password/reset-password";
import PasswordResetSuccess from "@/components/forgot-password/password-reset-success";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import AnimatedBackground from "@/components/animated-background";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<
    "email" | "code" | "choice" | "reset" | "success"
  >("email");

  const steps = ["email", "code", "choice", "reset", "success"];
  const currentStepIndex = steps.indexOf(step);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

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

          {/* Progress Bar */}
          {step !== "success" && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Password Recovery
                </span>
                <span className="text-xs font-semibold text-primary">
                  Step {currentStepIndex + 1}/{steps.length}
                </span>
              </div>

              {/* Progress bar with milestones */}
              <div className="relative">
                {/* Background track */}
                <div className="h-2 bg-border/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>

                {/* Milestone dots */}
                <div className="absolute top-0 left-0 w-full h-2 flex justify-between items-center">
                  {steps.map((stepName, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                      <motion.div
                        key={stepName}
                        className="relative"
                        style={{
                          left:
                            index === 0
                              ? "0"
                              : index === steps.length - 1
                                ? "auto"
                                : "auto",
                          right: index === steps.length - 1 ? "0" : "auto",
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                        }}
                      >
                        <motion.div
                          className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            isCompleted
                              ? "bg-primary border-primary shadow-lg shadow-primary/50"
                              : "bg-background border-border/50"
                          } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                          animate={
                            isCurrent
                              ? {
                                  scale: [1, 1.2, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {isCompleted && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                            </motion.div>
                          )}
                        </motion.div>

                        {/* Step label */}
                        <motion.div
                          className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <span
                            className={`text-[10px] font-medium ${
                              isCompleted
                                ? "text-primary"
                                : "text-muted-foreground"
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
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Steps */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === "email" && <EmailStep setStep={setStep} />}
            {step === "code" && (
              <VerifyPasswordRecoveryEmail setStep={setStep} />
            )}
            {step === "choice" && <ChoiceStep setStep={setStep} />}
            {step === "reset" && <ResetPassword setStep={setStep} />}
            {step === "success" && <PasswordResetSuccess />}
          </motion.div>

          {/* Security Info */}
          {step !== "success" && (
            <motion.div
              className="mt-6 flex items-center justify-center space-x-6 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Encrypted</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
