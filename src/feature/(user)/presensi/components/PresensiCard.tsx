import { RekapPresensi } from "@/api/services/user/presensi";
import React from "react";

interface Props {
  presensi: RekapPresensi;
  isLast?: boolean;
}

const PresensiCard = ({ presensi, isLast = false }: Props) => {
  const centerClass = "flex items-center";

  return (
    <div
      className={`w-[1050px] h-[68px] mx-auto flex px-12 text-white font-normal gap-4 text-2xl ${
        isLast ? "rounded-t-none rounded-b-[12px]" : "rounded-none border-b-0"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(250, 250, 250, 0.25) 0%, rgba(250, 250, 250, 0.15) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderBottomWidth: isLast ? "1px" : "0px",
        boxShadow:
          "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)",
      }}
    >
      <div className={`w-3/12 ${centerClass}`}>
        <span>{presensi.rangkaian}</span>
      </div>
      <div className={`w-2/12 ${centerClass}`}>
        <span>{presensi.sesi}</span>
      </div>
      <div className={`w-3/12 ${centerClass}`}>
        <span>{presensi.waktu}</span>
      </div>
      <div className={`w-4/12 ${centerClass}`}>
        <span>{presensi.tanggal}</span>
      </div>
    </div>
  );
};

export default PresensiCard;
