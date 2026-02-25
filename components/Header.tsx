"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import AuthenticationMenu from "./AuthenticationMenu";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import Logo from "./Logo";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state: Rootstate) => state.auth);

  return (
    <>
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="text-foreground" size="md" />
              <span className="text-xl font-bold">Photoverse</span>
            </Link>

            <div className="md:flex items-center space-x-4 hidden">
              <Link href={user.isAuthenticated ? "/folders" : "/auth/login"}>
                <Button variant="ghost" size="sm">
                  {user.isAuthenticated ? "Folders" : "Sign In"}
                </Button>
              </Link>
              <Link href={user.isAuthenticated ? "/photos" : "/auth/register"}>
                <Button size="sm">
                  {user.isAuthenticated ? "Photos" : "Get Started"}
                </Button>
              </Link>
            </div>
            <div className="block md:hidden" onClick={() => setShowMenu(true)}>
              <IoMenu size={32} />
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence mode="wait">
        {showMenu ? <AuthenticationMenu setShowMenu={setShowMenu} /> : null}
      </AnimatePresence>
    </>
  );
};

export default Header;
