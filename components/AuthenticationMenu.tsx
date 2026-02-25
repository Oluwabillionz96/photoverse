import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Rootstate } from "@/lib/store";
import Logo from "./Logo";

const AuthenticationMenu = ({
  setShowMenu,
}: {
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { user } = useSelector((state: Rootstate) => state.auth);
  const [activeSection, setActiveSection] = useState<string>("");

  const onLoginClick = () =>
    router.push(user.isAuthenticated ? "/folders" : "/auth/login");
  const onRegisterClick = () =>
    router.push(user.isAuthenticated ? "/photos" : "/auth/register");

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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={() => setShowMenu(false)}
      />

      {/* Sliding menu */}
      <div className="w-full h-auto bg-card rounded-b-2xl z-50 fixed top-0 right-0 border-b border-border shadow-lg animate-in slide-in-from-top duration-300">
        {/* Header with logo and close button */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Logo className="text-foreground" size="sm" />
            <span className="text-lg font-bold">Photoverse</span>
          </div>
          <button
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={() => setShowMenu(false)}
          >
            <IoIosClose size={28} />
          </button>
        </div>

        {/* Navigation links */}
        <div className="p-6 space-y-4">
          <nav className="space-y-3 mb-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setShowMenu(false);
                  setTimeout(() => {
                    document
                      .getElementById(item.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                }}
                className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "text-foreground bg-secondary border border-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span className="text-lg font-medium">{item.label}</span>

                {/* Active indicator */}
                {activeSection === item.id && (
                  <span className="text-xs font-semibold">ACTIVE</span>
                )}
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              className="w-full py-4 text-lg font-semibold"
              onClick={() => {
                setShowMenu(false);
                onLoginClick();
              }}
            >
              {user.isAuthenticated ? "Folders" : "Sign In"}
            </Button>

            <Button
              variant="outline"
              className="w-full py-4 text-lg font-semibold"
              onClick={() => {
                setShowMenu(false);
                onRegisterClick();
              }}
            >
              {user.isAuthenticated ? "Photos" : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthenticationMenu;
