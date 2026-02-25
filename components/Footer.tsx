"use client";

import Link from "next/link";
import Logo from "./Logo";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo and brand */}
          <div className="flex items-center space-x-3">
            <Logo className="text-primary" size="md" />
            <span className="text-xl font-bold text-foreground">
              Photoverse
            </span>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date(Date.now()).getFullYear()} Photoverse. All rights
              reserved.
            </p>
            <p className="mt-1 text-xs">
              Built with ❤️ by{" "}
              <Link href="https://goodluckreuben.netlify.app" target="blank">
                Goodluck Reuben
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
