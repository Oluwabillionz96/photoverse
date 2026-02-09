"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleButton from "@/components/google-button";
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
import Logo from "@/components/Logo";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-50 p-3 rounded-xl glass border border-border/30 hover:border-primary/50 transition-all duration-300 group"
        aria-label="Go back"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </motion.button>

      {/* Left Side - Branding (Hidden on mobile) */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-lg space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <Logo className="text-primary" size="lg" />
              <span className="text-2xl font-bold text-foreground">
                Photoverse
              </span>
            </div>

            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Your photos,{" "}
              <span className="text-gradient-primary">everywhere</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Access your entire photo collection from any device. Secure, fast,
              and completely free.
            </p>

            <div className="space-y-4">
              {[
                { icon: "✓", text: "Unlimited storage" },
                { icon: "⚡", text: "Lightning fast uploads" },
                { icon: "🔒", text: "Bank-level security" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {item.icon}
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <Logo className="text-primary" size="md" />
            <span className="text-xl font-bold text-foreground">
              Photoverse
            </span>
          </div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Create account
            </h2>
            <p className="text-muted-foreground text-lg">
              Start your journey with Photoverse
            </p>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6 sm:p-8 space-y-6 border border-border/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Google Sign Up */}
            <GoogleButton text="Continue with Google" />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-card text-muted-foreground font-medium">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FieldGroup>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="email"
                        className="text-sm font-semibold"
                      >
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
                className="w-full h-12 cursor-pointer bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Sign up
                    <ArrowRight className="w-4 h-4" />
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
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-6 flex items-center justify-center space-x-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span>Private</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;
