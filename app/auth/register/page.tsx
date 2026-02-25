"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { RegistrationData } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/Input/password-input";
import { authApi } from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateEmail } from "@/lib/slices/authSlice";
import { AxiosError } from "axios";
import AuthLayout from "@/components/auth-layout";

const RegistrationPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting: loading },
  } = useForm<z.infer<typeof RegistrationData>>({
    resolver: zodResolver(RegistrationData),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: z.infer<typeof RegistrationData>) => {
    try {
      const response = await authApi.register(data.email, data.password);
      toast.success(response?.message);
      dispatch(updateEmail(data.email));
      router.push("/auth/verify-email");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error ||
            error?.response?.data ||
            error?.message
          : "An unexpected error occurred.";
      toast.error(errorMessage || "An unexpected error occurred.");
      console.error("Error in registration:", error);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="you@example.com"
                  className="h-12 bg-background/50 border-border/30 focus:border-primary/50 transition-all"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-xs mt-1"
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
                <FieldLabel
                  htmlFor="password"
                  className="text-sm font-semibold"
                >
                  Password
                </FieldLabel>
                <PasswordInput
                  fieldState={fieldState}
                  field={field}
                  id="password"
                  placeholder="••••••••"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-xs mt-1"
                    errors={[fieldState.error]}
                  />
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
                  className="text-sm font-semibold"
                >
                  Confirm Password
                </FieldLabel>
                <PasswordInput
                  fieldState={fieldState}
                  field={field}
                  id="confirmPassword"
                  placeholder="••••••••"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-xs mt-1"
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
          className="w-full h-12 font-semibold"
        >
          {loading ? (
            "Creating account..."
          ) : (
            <>
              Sign up
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground pt-2">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegistrationPage;
