"use client";

import Link from "next/link";
import Logo from "./Logo";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="flex flex-col items-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <Logo className="text-primary" size="md" />
            <span className="text-xl font-bold text-foreground">
              Photoverse
            </span>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground text-center max-w-md">
            Your photos, everywhere you need them. Free, secure, and always
            accessible.
          </p>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date(Date.now()).getFullYear()} Photoverse. All rights
              reserved.
            </p>
            <p className="mt-2 text-xs">
              Built with ❤️ by{" "}
              <Link href="https://goodluckreuben.netlify.app" target="blank">
                Goodluck Reuben
              </Link>
            </p>
          </div>

          {/* Subtle animation element */}
          <motion.div
            className="w-2 h-2 bg-primary/40 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
