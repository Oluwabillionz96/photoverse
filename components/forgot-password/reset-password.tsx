import { ArrowRight, Mail } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import PasswordInput from "../Input/password-input";
import { useResetPasswordMutation } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
import { updateVerificationId } from "@/lib/slices/authSlice";

const ResetPassword = ({
  setStep,
}: {
  setStep: Dispatch<
    SetStateAction<"email" | "code" | "choice" | "reset" | "success">
  >;
}) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const PasswordSchema = z
    .object({
      password: z
        .string()
        .min(5, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const { control, handleSubmit } = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { verificationId } = useSelector((state: Rootstate) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    try {
      const response = await resetPassword({
        verificationId,
        password: data.password,
      });

      if ("data" in response) {
        toast.success(response?.data?.message);
        dispatch(updateVerificationId(""));
        setStep("success");
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
      console.error("Error in forgot password reset request:", error);
    }
  };

  return (
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="new-password"
                    className="text-sm font-medium text-foreground"
                  >
                    New password
                  </FieldLabel>
                  <PasswordInput
                    field={field}
                    fieldState={fieldState}
                    id="new-password"
                    placeholder="Create a strong password"
                  />
                  {fieldState.invalid ? (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground mt-1">
                      At least 8 characters with a mix of letters and numbers
                    </p>
                  )}
                </Field>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm Password
                  </FieldLabel>

                  <PasswordInput
                    field={field}
                    fieldState={fieldState}
                    id="confirmPassword"
                    placeholder="Confirm your password"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

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
  );
};

export default ResetPassword;
