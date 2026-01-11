"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const RegistrationPage = () => {
  const { control, handleSubmit } = useForm<z.infer<typeof RegistrationData>>({
    resolver: zodResolver(RegistrationData),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegistrationData>) => {
    console.log(data);
    return;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">
                P
              </span>
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
          <GoogleButton handleClick={() => {}} text="Sign Up with Google" />

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
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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
                      <FieldError errors={[fieldState.error]} />
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
                    <div className="relative">
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Create a strong password"
                      />
                      {/* <FaRegEye className="absolute top-2 right-2" /> */}
                      {/* <FaRegEyeSlash className="absolute top-2 right-2" /> */}
                    </div>

                    <p className="text-xs text-muted-foreground mt-1">
                      At least 8 characters with a mix of letters and numbers
                    </p>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
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
                    <Input
                      {...field}
                      type="password"
                      id="confirmPassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              disabled={false}
              className="w-full h-11 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {false ? "Creating account..." : "Create account"}
              {false && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-semibold"
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
