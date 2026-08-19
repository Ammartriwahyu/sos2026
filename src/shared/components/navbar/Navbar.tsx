"use client";

import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItems";
import { navListData } from "../../data/navListData";
import { Button } from "../ui/Button";
import { Sling as Hamburger } from "hamburger-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import LogoSoS from "@/assets/assetsos26/logo-sos26.svg";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import NavbarDropdown from "./NavbarDropdown";
import { authService } from "@/api/services/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const handleLogout = async () => {
  try {
    await authService.logout();
  } catch (error) {
    console.error("Gagal melakukan logout:", error);
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const pathname = usePathname();
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname, user]);
  return (
    <>
      <nav className="w-screen py-2 xl:py-2 2xl:py-4 bg-navbar-bg fixed top-0 left-0 z-[999]">
        <div className="mycontainer w-full h-full flex items-center justify-between">
          <div className="flex-2 md:flex-1 flex justify-start ">
            <Link
              href="/home"
              className="flex gap-1 text-white font-semibold items-center"
            >
              <Image
                className="w-14 h-14"
                width={300}
                height={300}
                src={LogoSoS}
                alt="Logo SoS"
                priority
              />
              <div className="text-white  text-xs lg:text-xs xl:text-xs 2xl:text-base">
                <h1>Synergy Of Symphony & </h1>
                <h2>Shaping The Future</h2>
              </div>
            </Link>
          </div>

          <ul className="gap-8 hidden lg:flex lg:gap-12 justify-center items-center">
            {navListData.map((item, idx) => (
              <li key={idx}>
                <NavbarItem {...item} isActive={pathname === item.href} />
              </li>
            ))}
          </ul>

          <div className="flex-1 flex items-center justify-end">
            <div className="hidden lg:flex">
              {user ? (
                <NavbarDropdown onLogout={handleLogout} user={user} />
              ) : (
                <Link href="/login">
                  <Button className="bg-violet-light-active hover:bg-violet-light-hover px-5 text-black font-bold py-3 whitespace-nowrap">
                    Masuk
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <div className="rounded-xl bg-violet-light-active m-1">
                <Hamburger
                  toggled={isMenuOpen}
                  toggle={setIsMenuOpen}
                  size={28}
                  color="#000000"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-navbar-bg text-white flex flex-col items-center pt-32  lg:hidden"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ul className="flex flex-col gap-8 text-center text-xl">
              {navListData.map((item, idx) => (
                <motion.li key={idx} variants={itemVariants}>
                  <NavbarItem isActive={pathname === item.href} {...item} />
                </motion.li>
              ))}
            </ul>
            <motion.div variants={itemVariants} className="mt-8">
              {user ? (
                <NavbarDropdown onLogout={handleLogout} user={user} />
              ) : (
                <Link href="/login">
                  <Button className="bg-violet-light-active hover:bg-violet-light-hover px-8 text-black font-bold py-3">
                    Masuk
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
