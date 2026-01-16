import { Dispatch, SetStateAction } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { KeyRound, ArrowRight } from "lucide-react";
import { useContinueToAccountMutation } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import toast from "react-hot-toast";
import { updateVerificationId } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";

interface ChoiceStepProps {
  setStep: Dispatch<
    SetStateAction<"email" | "code" | "choice" | "reset" | "success">
  >;
}

const ChoiceStep = ({ setStep }: ChoiceStepProps) => {
  const [continueToAccount, { isLoading }] = useContinueToAccountMutation();
  const router = useRouter();
  const { verificationId } = useSelector((state: Rootstate) => state.auth);
  const dispatch = useDispatch();
  const handleProceedToAccount = async () => {
    try {
      const response = await continueToAccount({ verificationId });
      if ("data" in response) {
        toast.success(response?.data?.message);
        dispatch(updateVerificationId(""));
        router.push("/folders");
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
      console.error("Error in forgot password authentication request:", error);
    }
  };

  const handleResetPassword = () => {
    setStep("reset");
  };

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-block mb-4 p-3 rounded-lg bg-green-500/10">
          <KeyRound className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Email Verified!
        </h1>
        <p className="text-muted-foreground">What would you like to do next?</p>
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground text-center">
            Choose an option to continue
          </p>

          <div className="grid md:grid-cols-2 grid-rows-2 gap-4 ">
            <Button
              onClick={handleResetPassword}
              className="h-auto bg-blue-500 hover:bg-blue-500 cursor-pointer flex items-center gap-2"
            >
              <KeyRound className="w-5 h-5" />
              <span className="text-sm font-medium">Reset Password</span>
            </Button>
            <Button
              onClick={handleProceedToAccount}
              variant="link"
              className="h-auto flex flex-row-reverse cursor-pointer items-center gap-2 hover:bg-primary/5 hover:border-primary transition-all"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="text-sm font-medium">Proceed to Account</span>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ChoiceStep;
