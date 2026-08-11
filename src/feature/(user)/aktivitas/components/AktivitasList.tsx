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
      className="w-[210px] h-[200px] rounded-[12px] z-20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-102 hover:bg-[#4A3488] cursor-pointer group"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)"
      }}
    >
      <Icon
        className="text-white w-[60px] h-[62px] mb-[12px] transition-colors duration-300 group-hover:text-white/90 object-contain drop-shadow-md"
        strokeWidth={1.5}
      />

      <p className="text-4xl font-medium text-white text-center transition-opacity duration-300 group-hover:opacity-95 drop-shadow-md">
        {aktivitas.nama}
      </p>
    </Link>
  );
};

export default AktivitasList;