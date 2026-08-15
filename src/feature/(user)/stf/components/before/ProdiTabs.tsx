"use client";

import { cn } from "@/shared/utils/cn";
import { prodiData } from "@/feature/(user)/akademik/data/prodiData";

interface ProdiTabsProps {
  activeProdiId: string;
  onSelectProdi: (id: string) => void;
}

export const ProdiTabs = ({ activeProdiId, onSelectProdi }: ProdiTabsProps) => {
  return (
    <div className="grid grid-cols-1 md:flex md:flex-col gap-4 w-full max-w-[400px]">
      {prodiData.map((prodi) => (
        <button
          key={prodi.id}
          onClick={() => onSelectProdi(prodi.id)}
          className={cn(
            "px-6 py-4 rounded-full border transition-all duration-300 ease-in-out text-center text-white",
            activeProdiId === prodi.id
              ? "bg-[#483d73] border-[#816ac5] shadow-[0_0_15px_rgba(129,106,197,0.4)] font-semibold"
              : "bg-transparent border-white/20 hover:bg-white/10",
          )}
        >
          <div className="flex justify-center items-center">
            <span className="text-base md:text-lg font-medium">
              {prodi.nama}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
