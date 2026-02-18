"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
// import { useState } from "react";
import { authApi } from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateEmail } from "@/lib/slices/authSlice";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import AuthLayout from "@/components/auth-layout";

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting: loading },
  } = useForm<z.infer<typeof LoginData>>({
    resolver: zodResolver(LoginData),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<z.infer<typeof LoginData>> = async (data) => {
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
          ? error.response?.data?.error ||
            error?.response?.data ||
            error?.message
          : "An unexpected error occurred.";
      toast.error(errorMessage || "An unexpected error occurred.");
      console.log("Error in login:", error);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                <div className="flex items-center justify-between mb-2">
                  <FieldLabel
                    htmlFor="password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </FieldLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
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
        </FieldGroup>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 cursor-pointer bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground pt-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-primary hover:text-primary/80 font-semibold transition-colors"
        >
          Sign up for free
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
