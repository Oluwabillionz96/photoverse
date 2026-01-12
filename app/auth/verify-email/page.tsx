"use client";
import { Card } from "@/components/ui/card";
import VerifyEmail from "@/components/VerifyEmail";
import { Rootstate } from "@/lib/store";
import { Mail } from "lucide-react";
import { useSelector } from "react-redux";

export default function VerifyEmailPage() {
  const { email } = useSelector((state: Rootstate) => state.auth);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
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
          <VerifyEmail email={email} />

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
