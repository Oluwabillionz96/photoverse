"use client";

import { useState } from "react";
import EmailStep from "@/components/forgot-password/email-step";
import VerifyPasswordRecoveryEmail from "@/components/forgot-password/verify-email-for-password-recovery";
import ChoiceStep from "@/components/forgot-password/choice-step";
import ResetPassword from "@/components/forgot-password/reset-password";
import PasswordResetSuccess from "@/components/forgot-password/password-reset-success";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<
    "email" | "code" | "choice" | "reset" | "success"
  >("choice");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-md">
        {/* Step 1: Email */}
        {step === "email" && <EmailStep setStep={setStep} />}

        {/* Step 2: Verification Code */}
        {step === "code" && <VerifyPasswordRecoveryEmail setStep={setStep} />}

        {/* Step 3: Choice */}
        {step === "choice" && <ChoiceStep setStep={setStep} />}

        {/* Step 4: Reset Password */}
        {step === "reset" && <ResetPassword />}

        {/* Step 5: Success */}
        {step === "success" && <PasswordResetSuccess />}

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
