// components/CaketangCard.tsx

import Image from "next/image";
import React from "react";
import { Caketang } from "@/api/services/user/stf";
import Dummy from "@/assets/assetsos26/shared/picture-template.webp";
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
            ? "bg-[#C4BCEB] z-10"
            : "bg-[#C4BCEB]/70 hover:bg-[#C4BCEB]/90"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -15 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
      >
        <div className="w-full pt-2 px-2 pb-6">
          <Image
            src={Dummy}
            width={300}
            height={300}
            alt="Caketang Photo"
            className="w-full object-cover rounded-t-[4.5rem] rounded-b-2xl h-64 md:h-72 lg:h-80"
          />
        </div>
        <div className="w-full -mt-8 relative z-10">
          <div className="bg-[#F8F7FC] flex justify-center items-center px-4 pt-5 pb-6 text-center min-h-[4.5rem] rounded-t-[5rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <p className="text-[#6543A7] text-lg lg:text-xl font-bold uppercase line-clamp-2 leading-tight tracking-wide">
              {data.nama}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`md:hidden flex flex-col cursor-pointer w-full max-w-44 rounded-t-[4rem] rounded-b-[2.5rem] overflow-hidden transition-colors duration-300 ${
          isActive ? "bg-[#C4BCEB] shadow-xl z-10" : "bg-[#C4BCEB]/70"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
      >
        <div className="w-full pt-1.5 px-1.5 pb-4">
          <Image
            src={Dummy}
            width={200}
            height={200}
            alt="Caketang Photo"
            className="w-full object-cover rounded-t-[3.5rem] rounded-b-xl h-44"
          />
        </div>
        <div className="w-full -mt-6 relative z-10 flex-grow">
          <div className="bg-[#F8F7FC] flex justify-center items-center px-2 pt-4 pb-5 text-center min-h-[4rem] h-full rounded-t-[2rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <p className="text-[#6543A7] text-sm font-bold uppercase line-clamp-2 leading-tight">
              {data.nama}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CaketangCard;
