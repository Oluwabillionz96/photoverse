"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import GoogleButton from "@/components/google-button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { LoginData } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/Input/password-input";
import { useState } from "react";
import { authApi } from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateEmail } from "@/lib/slices/authSlice";
import { AxiosError } from "axios";
import Image from "next/image";

const LoginPage = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof LoginData>>({
    resolver: zodResolver(LoginData),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<z.infer<typeof LoginData>> = async (data) => {
    setLoading(true);
    try {
      const response = await authApi.login(data.email, data.password);

      toast.success(response?.message);
      if (response?.requiresVerification === true) {
        router.push("/auth/verify-email");
        dispatch(updateEmail(data.email));
        return;
      }
      router.push("/folders");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : "An unexpected error occurred.";

      toast.error(errorMessage || "An unexpected error occurred.");
      console.error("Error in login:", error);
    } finally {
      setLoading(loading);
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
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your Photoverse account
          </p>
        </div>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
          {/* Google Sign In */}
          <GoogleButton text="Continue with Google" />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
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
                      fieldState={fieldState}
                      field={field}
                      id="password"
                      placeholder="••••••••"
                    />
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
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
              disabled={loading}
              className="w-full h-11 bg-blue-500 hover:bg-blue-500/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </Card>

        {/* Trust Indicators */}
        {/* <div className="mt-8 text-center text-xs text-muted-foreground space-y-2">
          <p>🔒 Your data is encrypted and secure</p>
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
