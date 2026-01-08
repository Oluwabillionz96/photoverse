"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

 const RegistrationPage = () => {

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
          <button
            onClick={()=>{}}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors duration-200 font-medium text-foreground"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            Sign up with Google
          </button>

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
          <form onSubmit={()=>{}} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                value={""}
                onChange={()=>{}}
                required
                className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={""}
                onChange={()=>{}}
                required
                className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                name="password"
                value={""}
                onChange={()=>{}}
                required
                className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                At least 8 characters with a mix of letters and numbers
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                name="confirmPassword"
                value={""}
                onChange={()=>{}}
                required
                className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-primary"
              />
            </div>

            {/* Terms Checkbox */}
            {/* <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={false}
                onChange={()=>{}}
                className="mt-1 w-4 h-4 rounded border-border cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs text-muted-foreground cursor-pointer"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary hover:underline font-semibold"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-primary hover:underline font-semibold"
                >
                  Privacy Policy
                </Link>
              </label>
            </div> */}

            <Button
              type="submit"
              disabled={false}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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
}

export default RegistrationPage;
