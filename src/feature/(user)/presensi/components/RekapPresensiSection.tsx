"use client";
import React from "react";
import PresensiCard from "./PresensiCard";
import HeaderPresensiCard from "./HeaderPresensiCard";
import SectionTitle from "@/shared/components/SectionTitle";
import { RekapPresensi } from "@/api/services/user/presensi";

interface RekapPresensiSectionProps {
  presensiData: RekapPresensi[] | null;
  isLoading: boolean;
  error: string | null;
}

const RekapPresensiSection = ({
  presensiData,
  isLoading,
  error,
}: RekapPresensiSectionProps) => {
  if (isLoading) {
    return (
      <div className="w-11/12 md:w-2/3 mx-auto min-h-[50vh] flex justify-center items-center">
        <p className="text-white text-xl">Loading presensi data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 md:w-2/3 mx-auto min-h-[50vh] flex justify-center items-center">
        <p className="text-red-400 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1103px] mx-auto px-4 md:px-0 flex flex-col items-center">
      <SectionTitle animated={false} className="max-w-[1103px] mb-[40px]">
        Presensi
      </SectionTitle>

      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="w-full max-w-[1103px] min-w-[1050px] flex flex-col gap-[12px] bg-transparent shadow-none border-none mx-auto">
          <HeaderPresensiCard />

          {presensiData && presensiData.length > 0 ? (
            presensiData.map((presensi: RekapPresensi, index: number) => (
              <PresensiCard
                key={presensi.id ?? index}
                presensi={presensi}
                isLast={index === presensiData.length - 1}
              />
            ))
          ) : (
            <div className="w-full py-8 text-center text-white/70 text-lg bg-white/[0.05] backdrop-blur-[12px] rounded-[12px] border border-white/10">
              Belum ada data presensi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RekapPresensiSection;
