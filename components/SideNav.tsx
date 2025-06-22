"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegStar, FaTrashAlt } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { IoHome } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";

export const navLinks = [
  {
    icon: ({
      className,
      size,
      color,
    }: {
      className: string;
      size: number;
      color: string;
    }) => <IoHome className={className} size={size} color={color} />,
    label: "Home",
    url: "/",
  },
  {
    icon: ({
      className,
      size,
      color,
    }: {
      className: string;
      size: number;
      color: string;
    }) => <FaRegStar className={className} size={size} color={color} />,
    label: "Favourite",
    url: "/favourite",
  },
  {
    icon: ({
      className,
      size,
      color,
    }: {
      className: string;
      size: number;
      color: string;
    }) => <FaTrashAlt className={className} size={size} color={color} />,
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
    return pathname.startsWith(`${url}/`) || pathname === url;
  };
  return (
    <motion.aside
      initial={{ width: "17.5rem", paddingInline: "0.5rem" }}
      animate={{
        width: collapsed ? "5rem" : "17.5rem",
        paddingInline: collapsed ? "0.2rem" : "0.5rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`hidden md:block bg-black fixed top-0 bottom-0 left-0 `}
    >
      <div className="  h-8 mb-12 relative">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className=" absolute top-6 right-2 hover:cursor-pointer"
        >
          {collapsed ? (
            <GoSidebarCollapse size={30} color="white" />
          ) : (
            <GoSidebarExpand size={30} color="white" />
          )}
        </button>
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
                  <span className={`inline-block -mb-[3px] z-20 font-semibold`}>
                    {nav.label}
                  </span>
                )}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      exit={{ opacity: 0, x: 300 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      layoutId="active_state"
                      className={`absolute inset-0 bg-[#636262] rounded-[10px] cursor-pointer z-0`}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default SideNav;
