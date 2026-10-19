// components/CaketangCard.tsx

import Image from "next/image";
import React from "react";
import { Caketang } from "@/api/services/user/stf";
import { motion } from "motion/react";

interface CaketangCardProps {
  data: Caketang;
  isActive: boolean;
  onClick: () => void;
}

const CaketangCard = React.memo(
  ({ data, isActive, onClick }: CaketangCardProps) => {
    return (
      <motion.div
        className={`flex flex-col cursor-pointer w-full max-w-44 md:max-w-72 rounded-t-[4rem] md:rounded-t-[5rem] rounded-b-xl md:rounded-b-[3rem] overflow-hidden shadow-2xl transition-colors duration-300 ${
          isActive
            ? "bg-[var(--color-primary-light)] z-10 shadow-xl"
            : "bg-[var(--color-primary-light)]/70 hover:bg-[var(--color-primary-light-hover)]"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1.12 : 1, y: isActive ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
      >
        <div className="w-full pt-1.5 md:pt-2 px-1.5 md:px-2 pb-0">
          <Image
            src={data.foto || "/placeholder-image.jpg"}
            width={300}
            height={400}
            sizes="(max-width: 768px) 176px, 288px"
            alt={data.nama}
            className="w-full h-auto aspect-[3/4] object-contain object-bottom rounded-t-[3.5rem] md:rounded-t-[4.5rem] rounded-b-none"
          />
        </div>
        <div className="w-full -mt-6 md:-mt-8 relative z-10 flex-grow">
          <div className="bg-[var(--color-stf-text)] flex justify-center items-center px-2 md:px-4 py-2 md:pt-5 md:pb-6 text-center min-h-[2.5rem] md:min-h-[4.5rem] h-full rounded-t-[2.5rem] md:rounded-t-[5rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <p className="text-[var(--color-stf-purple)] text-xs sm:text-sm md:text-lg lg:text-xl font-bold uppercase line-clamp-2 leading-tight tracking-wide">
              {data.nama}
            </p>
          </div>
        </div>
      </motion.div>
    );
  },
);

CaketangCard.displayName = "CaketangCard";

export default CaketangCard;
