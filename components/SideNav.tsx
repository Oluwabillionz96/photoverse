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
    url: "/",
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
      className={`hidden transition-all duration-500 ease-in-out md:block bg-black fixed top-0 bottom-0 left-0 ${
        collapsed
          ? "w-[5rem] px-[0.2rem]"
          : "md:w-[9rem] lg:w-[17.5rem] px-[0.5rem]"
      }`}
    >
      <div className="  h-8 my-6 flex justify-end relative lg:visible invisible">
        <Button
          size={"icon"}
          onClick={() => {
            setCollapsed(!collapsed);
            if (typeof window !== "undefined") {
              localStorage.setItem("collapsed", JSON.stringify(!collapsed));
            }
          }}
          className="hover:cursor-pointer font-bold"
        >
          {collapsed ? <GoSidebarCollapse /> : <GoSidebarExpand />}
        </Button>
      </div>
      <nav>
        {navLinks.map((nav, id) => {
          const isActive = active(nav.url);
          return (
            <Link key={id} href={nav.url}>
              <motion.div
                className={`flex items-center relative cursor-pointer 
            ${
              !collapsed
                ? " px-[23px] py-[13.7px] pr-[45px] mb-[11.7px]"
                : "p-4  w-full justify-center"
            }
             rounded-[14px] text-[15px] leading-[150%] text-white 
             font-light tracking-[-0.02em] transition-all duration-300`}
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  transition: { duration: 0.3 },
                }}
              >
                {nav.icon({
                  className: `mr-3 relative z-20`,
                  size: 21,
                  color: "white",
                })}
                {!collapsed && (
                  <span
                    className={`inline-block -mb-[3px] z-20 font-semibold md:hidden lg:inline-block`}
                  >
                    {nav.label}
                  </span>
                )}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layoutId="active_state"
                      className={`absolute inset-0 bg-[#636262] rounded-[10px] cursor-pointer z-0`}
                      transition={{ duration: 0.01 }}
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
