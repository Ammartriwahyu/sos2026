import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { User, LogOut, ChevronDown, Settings } from "lucide-react";

interface NavbarDropdownProps {
  user: {
    nama?: string | null;
  };
  onLogout: () => void;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownId = "user-dropdown-menu";

  const closeDropdown = () => setIsOpen(false);

  const handleLogoutClick = () => {
    onLogout();
    closeDropdown();
  };

  const handleLinkClick = () => {
    closeDropdown();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 bg-violet-light-active text-default-dark font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-normal focus-visible:ring-offset-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-violet-light-hover transition-all duration-200 shadow-lg hover:shadow-xl group"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-white/40 rounded-lg">
          <User className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        <span className="block max-w-20 sm:max-w-24 text-sm sm:text-base truncate">
          {user.nama?.split(" ")[1] || user.nama || "Pengguna"}
        </span>
        <ChevronDown
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        id={dropdownId}
        className={`absolute -right-10 lg:right-0 mt-2 w-48 sm:w-64 origin-top rounded-2xl bg-white border border-gray-200 shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out backdrop-blur-sm ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        {isOpen && (
          <div className="py-2">
            {/* Header Section */}
            <div className="px-3 sm:px-4 py-2 sm:py-3 mb-2 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-t-2xl">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/50 rounded-lg shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-default-dark/70" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm sm:text-base text-default-dark truncate">
                    {user.nama || "Pengguna"}
                  </p>
                  <p className="text-xs sm:text-sm text-default-dark/50 truncate">
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="px-2 space-y-1">
              <Link href="/profile" passHref>
                <span
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 sm:gap-3 w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-default-dark hover:bg-secondary-200 hover:text-primary-600 rounded-xl transition-all duration-150 cursor-pointer group font-medium"
                >
                  <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-primary-100 text-primary-600 rounded-lg transition-colors duration-150 shrink-0">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <span className="truncate">Lihat Profil</span>
                </span>
              </Link>
            </div>

            {/* Divider */}
            <div className="my-2 mx-2 h-px bg-gray-200"></div>

            {/* Logout Button */}
            <div className="px-2 pb-2">
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 sm:gap-3 w-full px-2 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-150 group font-medium"
              >
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-red-100 group-hover:bg-red-200 rounded-lg transition-colors duration-150 shrink-0">
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                </div>
                <span className="truncate">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarDropdown;
