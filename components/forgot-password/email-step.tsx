import { ArrowRight, Mail } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetForgotPasswordOTPMutation } from "@/services/api";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

const EmailStep = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<"email" | "code" | "reset" | "success">>;
}) => {
  const [getForgotPasswordOTP, { isLoading }] =
    useGetForgotPasswordOTPMutation();

  const EmailSchema = z.object({
    email: z.email("Please enter a valid email address"),
  });

  const { control, handleSubmit } = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof EmailSchema>) {
    try {
      const response = await getForgotPasswordOTP(data);

      if ("data" in response) {
        toast.success(response?.data?.message);
        setStep("code");
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
      // Handle unexpected errors (network errors, runtime errors, etc.)
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

      toast.error(errorMessage);
      console.error("Error in forgot password OTP request:", error);
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <div className="inline-block mb-4 p-3 rounded-lg bg-blue-500/10">
          <Mail className="w-6 h-6 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Forgot password?
        </h1>
        <p className="text-muted-foreground">
          Enter your email and to help us confirm you account exsists
        </p>
      </div>

      <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    aria-invalid={fieldState.invalid}
                    className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-blue-500"
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
            className="w-full h-11 bg-blue-500 cursor-pointer text-white hover:bg-blue-500/90  font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isLoading ? "Sending..." : "Send reset code"}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-blue-500 hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </>
  );
};

export default EmailStep;
