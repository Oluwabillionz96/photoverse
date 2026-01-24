"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import GoogleButton from "@/components/google-button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import z from "zod";
import { RegistrationData } from "@/lib/zod-schemas";
import PasswordInput from "@/components/Input/password-input";
import { authApi } from "@/services/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateEmail } from "@/lib/slices/authSlice";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Image from "next/image";

const RegistrationPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting: isLoading },
  } = useForm<z.infer<typeof RegistrationData>>({
    resolver: zodResolver(RegistrationData),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof RegistrationData>) => {
    try {
      const response = await authApi.register(data.email, data.password);
      toast.success(response?.message);
      dispatch(updateEmail(data.email));
      router.push("/auth/verify-email");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : "An unexpected error occurred.";

      toast.error(errorMessage);
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4 relative">
      {/* Back Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 z-10 p-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-card transition-colors duration-200 cursor-pointer"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <div className="bg-black rounded-full">
                <Image
                  src="/photoverse-logo.png"
                  width={50}
                  height={50}
                  alt="Photoverse Logo"
                />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
            Join Photoverse
          </h1>
          <p className="text-muted-foreground">
            Create your account and start sharing
          </p>
        </div>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
          {/* Google Sign Up */}
          <GoogleButton text="Sign Up with Google" />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Or create with email
              </span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
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

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <PasswordInput
                      field={field}
                      fieldState={fieldState}
                      id="password"
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
                    <FieldLabel htmlFor="confirmPassword">
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
              className="w-full h-11 cursor-pointer bg-blue-500 hover:bg-blue-500/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-xs text-muted-foreground space-y-2">
          <p>✓ Fast and easy setup</p>
          <p>🔒 Your photos are always private and secure</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
