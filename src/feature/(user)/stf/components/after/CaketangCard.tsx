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
        className={`hidden md:flex flex-col cursor-pointer w-full max-w-72 rounded-[4rem] rounded-b-[3rem] overflow-hidden shadow-2xl transition-all duration-300 ${
          isActive
            ? "bg-[#C4BCEB] z-10"
            : "bg-[#C4BCEB]/70 hover:bg-[#C4BCEB]/90"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1.15 : 1, y: isActive ? -15 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-full pt-2 px-2 pb-8">
          <Image
            src={data.foto}
            width={300}
            height={300}
            alt="Caketang Photo"
            className="w-full object-cover rounded-t-[3.5rem] rounded-b-2xl h-64 md:h-72 lg:h-80"
          />
        </div>
        <div className="w-full px-4 pb-4 -mt-12">
          <div className="bg-[#F8F7FC] flex justify-center items-center px-4 py-4 text-center min-h-[5rem] rounded-[2.5rem] shadow-md border-b-4 border-white/40">
            <p className="text-[#6543A7] text-lg lg:text-xl font-bold uppercase line-clamp-2 leading-tight tracking-wide">
              {data.nama}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`md:hidden flex flex-col cursor-pointer w-full max-w-44 rounded-[3rem] rounded-b-3xl overflow-hidden transition-colors duration-300 ${
          isActive ? "bg-[#C4BCEB] shadow-xl scale-105 z-10" : "bg-[#C4BCEB]/70"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-full pt-1.5 px-1.5 pb-6">
          <Image
            src={data.foto}
            width={200}
            height={200}
            alt="Caketang Photo"
            className="w-full object-cover rounded-t-[2.5rem] rounded-b-xl h-44"
          />
        </div>
        <div className="w-full px-3 pb-3 -mt-8">
          <div className="bg-[#F8F7FC] flex justify-center items-center px-2 py-3 text-center min-h-[4rem] rounded-[2rem] shadow-md border-b-2 border-white/40">
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
