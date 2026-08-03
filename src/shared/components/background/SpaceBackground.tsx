import React from "react";
import { cn } from "@/shared/utils/cn";
import Starfield from "./Starfield";

interface SpaceBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Background reusable bertema luar angkasa: warna dasar (var --color-space-base)
 * + bintang yang mengambang. Dipakai agar warna & bintang latar konsisten di
 * tiap halaman. Cukup bungkus konten halaman dengan komponen ini.
 *
 * Catatan: aset spesifik halaman (mis. solar-system) TIDAK termasuk di sini —
 * tambahkan sendiri sebagai child bila diperlukan.
 */
const SpaceBackground = ({ children, className }: SpaceBackgroundProps) => {
  return (
    <div className={cn("space-bg relative overflow-hidden", className)}>
      <Starfield />
      {children}
    </div>
  );
};

export default SpaceBackground;
