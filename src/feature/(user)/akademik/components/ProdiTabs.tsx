"use client";

import { cn } from "@/shared/utils/cn";
import { prodiData } from "../data/prodiData";
import LogoOnBase from "./LogoOnBase";

interface ProdiTabsProps {
  activeProdiId: string;
  onSelectProdi: (id: string) => void;
}

export const ProdiTabs = ({ activeProdiId, onSelectProdi }: ProdiTabsProps) => {
  return (
    <div className="flex w-full flex-col gap-5">
      {prodiData.map((prodi) => {
        const active = activeProdiId === prodi.id;
        return (
          <button
            key={prodi.id}
            type="button"
            onClick={() => onSelectProdi(prodi.id)}
            aria-pressed={active}
            className={cn(
              "w-full rounded-2xl border text-center transition-all duration-500 ease-in-out",
              active
                ? "border-white/15 bg-primary-normal/60 px-6 py-7 shadow-lg shadow-black/40"
                : "border-white/10 bg-primary-normal/30 px-6 py-5 hover:bg-primary-normal/50",
            )}
          >
            {active ? (
              <div className="flex flex-col items-center gap-4">
                <LogoOnBase
                  logo={prodi.logo}
                  alt={`Logo ${prodi.nama}`}
                  className="max-w-[240px]"
                />
                <span className="text-xl font-semibold text-putih md:text-2xl">
                  {prodi.nama}
                </span>
              </div>
            ) : (
              <span className="text-lg font-semibold text-putih md:text-xl">
                {prodi.nama}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
