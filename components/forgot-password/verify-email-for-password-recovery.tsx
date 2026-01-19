import { Mail } from "lucide-react";
import { Card } from "../ui/card";
import VerifyEmail from "../VerifyEmail";
import { useVerifyForgotPasswordOTPMutation } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import toast from "react-hot-toast";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { updateVerificationId } from "@/lib/slices/authSlice";

const VerifyPasswordRecoveryEmail = ({
  setStep,
}: {
  setStep: Dispatch<
    SetStateAction<"email" | "code" | "choice" | "reset" | "success">
  >;
}) => {
  const [verifyForgotPasswordOTP, { isLoading }] =
    useVerifyForgotPasswordOTPMutation();
  const { email } = useSelector((state: Rootstate) => state.auth);
  const dispatch = useDispatch();

  async function verifyOTP(e: FormEvent, inputValue: string[]) {
    e.preventDefault();
    try {
      const response = await verifyForgotPasswordOTP({
        email,
        otp: inputValue.join(""),
      });

      if ("data" in response) {
        toast.success(response?.data?.message);
        dispatch(updateVerificationId(response?.data?.verificationId));
        setStep("choice");
      } else if ("error" in response) {
        const error = response.error as {
          status?: number | string;
          data?: { error: string };
        };

        const message =
          error?.data?.error ||
          (error?.status === "FETCH_ERROR"
            ? "Network error. Please check your connection."
            : "An unexpected error occurred.");

        toast.error(message);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

      toast.error(errorMessage);
      console.error(
        "Error in forgot password OTP verification request:",
        error
      );
    }
  }

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
        <VerifyEmail
          email={email}
          verifyOTP={verifyOTP}
          isVerifying={isLoading}
          type="account_recovery"
        />
      </Card>
    </>
  );
};

export default VerifyPasswordRecoveryEmail;
