// file: components/NavbarItem.tsx

import Link from "next/link";

interface NavbarItemProps {
  href: string;
  title: string;
  isActive: boolean;
}

const NavbarItem = ({ href, title, isActive }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className={`xl:text-lg 2xl:text-2xl text-xl md:text-lg transition-all ${
        isActive
          ? "font-bold text-white border-b-2 border-white pb-1"
          : "font-normal text-white/80"
      } hover:text-white`}
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
