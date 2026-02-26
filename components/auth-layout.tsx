import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { ReactNode } from "react";
import GoogleButton from "./google-button";
import BackButton from "./back-button";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isLogin = pathname === "/auth/login";
  const isRegister = pathname === "/auth/register";

  return (
    <div className="min-h-screen flex relative bg-background">
      {/* Back Button */}
      <BackButton handleClick={() => router.push("/")} />

      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 border-r border-border">
        <div className="max-w-lg space-y-8">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <Logo className="text-foreground" size="lg" />
              <span className="text-2xl font-bold">Photoverse</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-[1.1]">
              Your photos, everywhere
            </h1>

            <p className="text-lg text-muted-foreground leading-snug mb-6">
              Access your entire photo collection from any device. Secure, fast, and completely free.
            </p>

            <div className="space-y-4">
              {[
                { icon: "✓", text: "Unlimited storage" },
                { icon: "⚡", text: "Lightning fast uploads" },
                { icon: "🔒", text: "Bank-level security" },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-semibold">
                    {item.icon}
                  </div>
                  <span className="text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <Logo className="text-foreground" size="md" />
            <span className="text-xl font-bold">Photoverse</span>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 leading-[1.1]">
              {isRegister ? "Create account" : isLogin && "Welcome back"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-snug">
              {isRegister
                ? "Start your journey with Photoverse"
                : isLogin && "Sign in to continue your journey"}
            </p>
          </div>

          <div className="rounded-xl p-6 sm:p-8 space-y-5 border border-border bg-card">
            <GoogleButton text="Continue with Google" />

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-card text-muted-foreground font-medium">
                  Or continue with email
                </span>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
