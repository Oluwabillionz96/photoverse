"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import GoogleButton from "@/components/google-button";
import { FieldGroup } from "@/components/ui/field";

const LoginPage = () => {
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
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your Photoverse account
          </p>
        </div>

        <Card className="border border-border/50 backdrop-blur-sm bg-card/95 p-8 space-y-6 shadow-lg">
          {/* Google Sign In */}
          <GoogleButton text="Continue with Google" handleClick={() => {}} />

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
          <form onSubmit={() => {}} className="space-y-4">
            <FieldGroup></FieldGroup>
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
                value={""}
                onChange={() => {}}
                required
                className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={""}
                onChange={() => {}}
                required
                className="h-11 bg-secondary/50 border-border placeholder-muted-foreground/50 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={false}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {false ? "Signing in..." : "Sign in"}
              {!false && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-xs text-muted-foreground space-y-2">
          <p>🔒 Your data is encrypted and secure</p>
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
