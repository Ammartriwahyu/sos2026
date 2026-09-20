// components/CaketangCard.tsx

import Image from "next/image";
import React from "react";
import { Caketang } from "@/api/services/user/stf";
import { motion } from "framer-motion";

interface CaketangCardProps {
  data: Caketang;
  isActive: boolean;
  onClick: () => void;
}

const CaketangCard = ({ data, isActive, onClick }: CaketangCardProps) => {
  return (
    <>
      <motion.div
        className={`hidden md:flex flex-col cursor-pointer w-full max-w-72 rounded-t-[5rem] rounded-b-[3rem] overflow-hidden shadow-2xl transition-colors duration-300 ${
          isActive
            ? "bg-[var(--color-primary-light)] z-10"
            : "bg-[var(--color-primary-light)]/70 hover:bg-[var(--color-primary-light-hover)]"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -15 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
      >
        <div className="w-full pt-2 px-2 pb-0">
          <Image
            src={data.foto || "/placeholder-image.jpg"}
            width={300}
            height={400}
            alt="Caketang Photo"
            className="w-full h-auto aspect-[3/4] object-contain object-bottom rounded-t-[4.5rem] rounded-b-none"
          />
        </div>
        <div className="w-full -mt-8 relative z-10">
          <div className="bg-[#EAEAEA] flex justify-center items-center px-4 pt-5 pb-6 text-center min-h-[4.5rem] rounded-t-[5rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <p className="text-[#6C4AB6] text-lg lg:text-xl font-bold uppercase line-clamp-2 leading-tight tracking-wide">
              {data.nama}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`md:hidden flex flex-col cursor-pointer w-full max-w-44 rounded-t-[4rem] rounded-b-xl overflow-hidden transition-colors duration-300 ${
          isActive
            ? "bg-[var(--color-primary-light)] shadow-xl z-10"
            : "bg-[var(--color-primary-light)]/70 hover:bg-[var(--color-primary-light-hover)]"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
      >
        <div className="w-full pt-1.5 px-1.5 pb-0">
          <Image
            src={data.foto || "/placeholder-image.jpg"}
            width={200}
            height={266}
            alt="Caketang Photo"
            className="w-full h-auto aspect-[3/4] object-contain object-bottom rounded-t-[3.5rem] rounded-b-none"
          />
        </div>
        <div className="w-full -mt-6 relative z-10 flex-grow">
          <div className="bg-[#EAEAEA] flex justify-center items-center px-2 py-1.5 text-center min-h-[2.5rem] h-full rounded-t-[2.5rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <p className="text-[#6C4AB6] text-sm font-bold uppercase line-clamp-2 leading-tight">
              {data.nama}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CaketangCard;
