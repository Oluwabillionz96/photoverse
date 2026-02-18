import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { ReactNode } from "react";
import GoogleButton from "./google-button";
import AnimatedBackground from "./animated-background";
import BackButton from "./back-button";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isLogin = pathname === "/auth/login";
  const isRegister = pathname === "/auth/register";
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />
      {/* Back Button */}
      <BackButton handleClick={() => router.push("/")} />

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

      {/* Right Side -  Form */}
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

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {isRegister ? "Create account" : isLogin && "Welcome back"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {isRegister
                ? "Start your journey with Photoverse"
                : isLogin && "Sign in to continue your journey"}
            </p>
          </motion.div>
          <motion.div
            className="glass rounded-2xl p-6 sm:p-8 space-y-6 border border-border/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
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
              n
            </div>
            {children}
          </motion.div>

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

export default AuthLayout;
