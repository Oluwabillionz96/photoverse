import { Mail } from "lucide-react";
import { Card } from "../ui/card";
import VerifyEmail from "../VerifyEmail";

const VerifyPasswordRecoveryEmail = ({ email }: { email: string }) => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
          <Mail className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Verify Email
        </h1>
        <p className="text-muted-foreground">
          We&apos;ve sent a 6-digit code to your email, please help us confirm
          your account
        </p>
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
        <VerifyEmail email={email} />
      </Card>
    </>
  );
};

export default VerifyPasswordRecoveryEmail;
