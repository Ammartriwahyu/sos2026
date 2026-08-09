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
      className="w-[210px] h-[200px] bg-white/[0.15] hover:bg-[#4A3488] backdrop-blur-[16px] border border-white/20 rounded-[12px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] z-20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-102 cursor-pointer group"
    >
      <Icon
        className="text-white w-[60px] h-[62px] mb-[12px] transition-colors duration-300 group-hover:text-white/90 object-contain"
        strokeWidth={1.5}
      />

      <p className="text-4xl font-medium text-white text-center transition-opacity duration-300 group-hover:opacity-95">
        {aktivitas.nama}
      </p>
    </Link>
  );
};

export default AktivitasList;
