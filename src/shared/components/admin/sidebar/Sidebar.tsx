"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { authService } from "@/api/services/auth";
import LogoSoS from "@/assets/logo-sos.svg";
import { useSidebarMenuItems } from "@/shared/data/SidebarData";

export const Sidebar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const sidebarMenuItems = useSidebarMenuItems();

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  return (
    <Tooltip.Provider delayDuration={0}>
      <aside className="hidden sm:flex sm:overflow-y-scroll lg:overflow-hidden fixed top-0 left-0 z-40 flex-col bg-primary-normal shadow-xl pt-8 pb-0 w-20 xl:w-72 h-screen transition-all duration-300">
        <div className="flex items-center justify-center xl:justify-start gap-4 px-6">
          <div className="w-12 h-12 rounded-xl flex-shrink-0">
            <Image
              alt="logo SOS"
              className="w-full h-full object-contain"
              src={LogoSoS}
            />
          </div>
          <p className="hidden xl:block text-[15px] leading-snug font-bold text-white">
            Synergy Of Symphony <br />& Shaping The Future
          </p>
        </div>

        <ul className="mt-12 flex flex-col gap-2 w-full">
          {sidebarMenuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === item.path
                : pathname.startsWith(item.path);
            return (
              <Tooltip.Root key={item.id}>
                <Tooltip.Trigger asChild>
                  <Link href={item.path} passHref className="w-full">
                    <li
                      className={`flex items-center justify-center xl:justify-start gap-x-4 py-4 px-6 transition-all duration-300 w-full ${
                        isActive
                          ? "bg-primary-light text-primary-normal"
                          : "text-white hover:bg-primary-normal-hover"
                      }`}
                    >
                      {React.createElement(item.icon, {
                        className: "h-[22px] w-[22px] flex-shrink-0",
                      })}
                      <span
                        className={`hidden xl:inline text-lg ${isActive ? "font-medium" : ""}`}
                      >
                        {item.label}
                      </span>
                    </li>
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="right"
                    className="z-50 xl:hidden px-3 py-1.5 text-sm font-medium text-primary-normal bg-primary-light rounded-md shadow-sm"
                  >
                    {item.label}
                    <Tooltip.Arrow className="fill-primary-light" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            );
          })}
        </ul>

        <div className="mt-auto w-full">
          <button
            onClick={handleLogout}
            title="Logout"
            className="w-full flex gap-x-4 items-center justify-center xl:justify-start py-5 px-6 bg-primary-light text-primary-normal hover:bg-primary-light-hover transition-colors"
          >
            <LogOut size={24} className="flex-shrink-0" />
            <span className="hidden xl:inline font-bold text-lg">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header / Hamburger */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          title="Buka Menu"
          className="fixed top-5 right-5 z-40 h-12 w-12 bg-primary-normal text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-normal-hover transition-all"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div className="sm:hidden fixed inset-0 z-50">
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <aside className="fixed top-0 right-0 h-full w-72 bg-primary-normal shadow-xl flex flex-col pt-6">
            <div className="flex items-center justify-between pb-4 px-6 border-b border-white/20">
              <span className="font-bold text-lg text-white">Menu</span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                title="Tutup Menu"
                className="p-1 rounded-full hover:bg-white/10 text-white"
              >
                <X size={24} />
              </button>
            </div>
            <ul className="flex-grow mt-6 flex flex-col gap-2 w-full">
              {sidebarMenuItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? pathname === item.path
                    : pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center gap-4 py-4 px-6 transition-colors w-full ${
                      isActive
                        ? "bg-primary-light text-primary-normal"
                        : "text-white hover:bg-primary-normal-hover"
                    }`}
                  >
                    <item.icon className="h-[22px] w-[22px] flex-shrink-0" />
                    <span
                      className={`text-lg ${isActive ? "font-medium" : ""}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </ul>
            <div className="mt-auto w-full">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 py-5 px-6 bg-primary-light text-primary-normal hover:bg-primary-light-hover transition-colors"
              >
                <LogOut className="h-6 w-6" />
                <span className="font-bold text-lg">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </Tooltip.Provider>
  );
};

export default Sidebar;
