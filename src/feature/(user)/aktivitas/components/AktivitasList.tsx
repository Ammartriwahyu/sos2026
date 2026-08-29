import React from "react";
import Link from "next/link";
import { Aktivitas } from "../data/aktivitasData";

interface AktivitasListProps {
  aktivitas: Aktivitas;
}

const AktivitasList = ({ aktivitas }: AktivitasListProps) => {
  const Icon = aktivitas.icon;

  return (
    <Link
      href={aktivitas.href}
      className="liquid-glass w-full aspect-square max-w-[210px] rounded-[12px] z-20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-102 hover:bg-[#4A3488] cursor-pointer group"
    >
      <Icon
        className="text-white w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 mb-2 lg:mb-3 transition-colors duration-300 group-hover:text-white/90 object-contain drop-shadow-md"
        strokeWidth={1.5}
      />

      <p className="text-sm sm:text-lg lg:text-2xl font-medium text-white text-center transition-opacity duration-300 group-hover:opacity-95 drop-shadow-md">
        {aktivitas.nama}
      </p>
    </Link>
  );
};

export default AktivitasList;
