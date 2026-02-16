"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { IoHome } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";

interface Icon {
  className: string;
  size: number;
  color: string;
}

export const navLinks = [
  {
    icon: ({ className, size, color }: Icon) => (
      <IoHome className={className} size={size} color={color} />
    ),
    label: "Home",
    url: "/folders",
  },
  {
    icon: ({ className, size, color }: Icon) => (
      <FaRegHeart className={className} size={size} color={color} />
    ),
    label: "Favourites",
    url: "/favourites",
  },
  {
    icon: ({ className, size, color }: Icon) => (
      <FaTrashAlt className={className} size={size} color={color} />
    ),
    label: "Trash",
    url: "/trash",
  },
];

const SideNav = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (arg: boolean) => void;
}) => {
  const pathname = usePathname();

  const active = (url: string) => {
    if (url === "/") {
      return pathname.startsWith("/folders") || pathname.startsWith("/photos");
    }
    return pathname.startsWith(`${url}/`) || pathname === url;
  };

  return (
    <aside
      className={`hidden transition-all duration-500 ease-in-out md:flex flex-col fixed top-0 bottom-0 left-0 border-r border-border/30 glass ${
        collapsed ? "w-20" : "md:w-56 lg:w-64"
      }`}
    >
      {/* Collapse Toggle at Top */}
      <div className="p-4 border-b border-border/30 mt-20">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setCollapsed(!collapsed);
              if (typeof window !== "undefined") {
                localStorage.setItem("collapsed", JSON.stringify(!collapsed));
              }
            }}
            className={`hover:bg-primary/10 hover:text-primary transition-all h-12 ${
              collapsed ? "w-full" : "w-full"
            }`}
          >
            {collapsed ? (
              <GoSidebarExpand className="w-6 h-6" />
            ) : (
              <GoSidebarCollapse className="w-6 h-6" />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((nav, id) => {
          const isActive = active(nav.url);
          return (
            <Link key={id} href={nav.url}>
              <motion.div
                className={`flex items-center relative cursor-pointer rounded-xl transition-all duration-300 ${
                  collapsed ? "justify-center p-3" : "px-4 py-3 gap-3"
                } ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                {nav.icon({
                  className: `relative z-20 transition-transform ${isActive ? "scale-110" : ""}`,
                  size: 20,
                  color: "currentColor",
                })}

                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="z-20 font-semibold text-sm"
                  >
                    {nav.label}
                  </motion.span>
                )}

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="active_state"
                      className="absolute inset-0 bg-linear-to-r from-primary to-accent rounded-xl z-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;
