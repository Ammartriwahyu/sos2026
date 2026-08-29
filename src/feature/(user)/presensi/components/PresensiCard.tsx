import { RekapPresensi } from "@/api/services/user/presensi";
import { cn } from "@/shared/utils/cn";
import React from "react";

interface Props {
  presensi: RekapPresensi;
  isLast?: boolean;
}

const PresensiCard = ({ presensi, isLast = false }: Props) => {
  const kolom = [
    { label: "Rangkaian", value: presensi.rangkaian, width: "w-3/12" },
    { label: "Sesi", value: presensi.sesi, width: "w-2/12" },
    { label: "Waktu", value: presensi.waktu, width: "w-3/12" },
    { label: "Tanggal", value: presensi.tanggal, width: "w-4/12" },
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-full min-h-[76px] items-center gap-2 border border-white/20 px-3 py-3 text-[11px] font-normal text-white sm:text-xs",
        "md:h-[68px] md:min-h-0 md:gap-4 md:px-12 md:py-0 md:text-2xl",
        isLast ? "rounded-b-[12px]" : "border-b-0",
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(250, 250, 250, 0.25) 0%, rgba(250, 250, 250, 0.15) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)",
      }}
    >
      {kolom.map(({ label, value, width }) => (
        <div
          key={label}
          className={cn(
            "min-w-0 leading-snug break-words text-center md:text-left",
            width,
          )}
        >
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default PresensiCard;
