import { motion, MotionConfig } from "framer-motion";
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
      }
    );

    // Observe sections
    const heroSection = document.querySelector('section:first-of-type');
    const featuresSection = document.getElementById('features');
    const freeSection = document.getElementById('free');

    if (heroSection) {
      heroSection.id = 'hero';
      observer.observe(heroSection);
    }
    if (featuresSection) observer.observe(featuresSection);
    if (freeSection) observer.observe(freeSection);

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'features', label: 'Features' },
    { id: 'free', label: '100% Free' }
  ];

  return (
    <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
      {/* Beautiful backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-xl bg-background/80 z-50"
        onClick={() => setShowMenu(false)}
      />
      
      {/* Beautiful sliding menu */}
      <motion.div
        className="w-full h-auto glass rounded-b-3xl z-50 fixed top-0 right-0 border-b border-border/30 shadow-2xl"
        initial={{ y: -300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
      >
        {/* Header with logo and close button */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div className="flex items-center space-x-3">
            <Logo className="text-primary" size="sm" />
            <span className="text-lg font-bold text-foreground">Photoverse</span>
          </div>
          <motion.button
            className="p-2 rounded-full hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
            onClick={() => setShowMenu(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IoIosClose size={28} />
          </motion.button>
        </div>

        {/* Navigation links with indicators */}
        <div className="p-6 space-y-4">
          <nav className="space-y-3 mb-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setShowMenu(false);
                  setTimeout(() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className={`flex items-center justify-between w-full text-left py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-primary bg-primary/10 border border-primary/20'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted/30'
                }`}
              >
                <span className="text-lg font-medium">{item.label}</span>
                
                {/* Active indicator */}
                <motion.div
                  className={`flex items-center space-x-2 ${
                    activeSection === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  animate={{ opacity: activeSection === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-primary">ACTIVE</span>
                </motion.div>
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 py-4 text-lg font-semibold"
                onClick={() => {
                  setShowMenu(false);
                  onLoginClick();
                }}
              >
                {user.isAuthenticated ? "Folders" : "Login"}
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:border-primary/60 hover:bg-primary/5 py-4 text-lg font-semibold"
                onClick={() => {
                  setShowMenu(false);
                  onRegisterClick();
                }}
              >
                {user.isAuthenticated ? "Photos" : "Sign Up Free"}
              </Button>
            </motion.div>
          </div>

          {/* Feature highlights */}
          <div className="flex justify-center space-x-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span>Secure</span>
            </div>
          </div>
        </div>
      </motion.div>
    </MotionConfig>
  );
};

export default AuthenticationMenu;