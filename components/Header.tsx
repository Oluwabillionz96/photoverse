import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import AuthenticationMenu from "./AuthenticationMenu";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {" "}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-black rounded-full">
                <Image
                  src="/photoverse-logo.png"
                  width={50}
                  height={50}
                  alt="Photoverse Logo"
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                Photoverse
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#free"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                100% Free
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
            </nav>

            <div className="md:flex items-center space-x-4 hidden">
              <Link href={"/auth/login"}>
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href={"/auth/register"}>
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"
                >
                  Sign Up Free
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
