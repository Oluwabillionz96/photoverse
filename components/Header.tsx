"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import AuthenticationMenu from "./AuthenticationMenu";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import Logo from "./Logo";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { user } = useSelector((state: Rootstate) => state.auth);

  // Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    // Observe sections
    const heroSection = document.querySelector("section:first-of-type");
    const featuresSection = document.getElementById("features");
    const freeSection = document.getElementById("free");

    if (heroSection) {
      heroSection.id = "hero";
      observer.observe(heroSection);
    }
    if (featuresSection) observer.observe(featuresSection);
    if (freeSection) observer.observe(freeSection);

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "features", label: "Features" },
    { id: "free", label: "100% Free" },
  ];

  return (
    <>
      <header className="border-b border-border/20 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <Logo
                className="text-primary group-hover:text-accent transition-colors duration-300"
                size="md"
              />
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Photoverse
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-primary to-accent rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            <div className="md:flex items-center space-x-4 hidden">
              <Link href={user.isAuthenticated ? "/folders" : "/auth/login"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary hover:bg-primary/10"
                >
                  {user.isAuthenticated ? "Folders" : "Login"}
                </Button>
              </Link>
              <Link href={user.isAuthenticated ? "/photos" : "/auth/register"}>
                <Button
                  size="sm"
                  className="bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover:cursor-pointer"
                >
                  {user.isAuthenticated ? "Photos" : "Sign Up Free"}
                </Button>
              </Link>
            </div>
            <div
              className="block md:hidden text-primary"
              onClick={() => setShowMenu(true)}
            >
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
