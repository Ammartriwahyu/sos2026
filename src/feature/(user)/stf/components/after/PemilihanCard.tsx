import Image from "next/image";
import React from "react";
import Dummy from "@/assets/assetsos26/shared/picture-template.webp";
import { Caketang } from "@/api/services/user/stf";
import { motion } from "framer-motion";

interface Props {
  data: Caketang;
  isActive: boolean;
  onClick: () => void;
  index: number;
  activeIndex: number;
}

const PemilihanCard = ({
  isActive = false,
  data,
  onClick,
  index,
  activeIndex,
}: Props) => {
  const isLeft = index < activeIndex;
  const isRight = index > activeIndex;

  let rotate = 0;
  let x = 0;
  if (isLeft) {
    rotate = -15;
    x = -20;
  } else if (isRight) {
    rotate = 15;
    x = 20;
  }

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer flex flex-col w-full max-w-32 sm:max-w-44 md:max-w-64 lg:max-w-72 rounded-t-[3rem] md:rounded-t-[5rem] rounded-b-3xl md:rounded-b-[3rem] overflow-hidden shadow-2xl transition-colors duration-300 ${
        isActive
          ? "bg-[#C4BCEB] z-30"
          : "bg-[#C4BCEB]/50 hover:bg-[#C4BCEB]/70 z-10"
      }`}
      animate={{
        scale: isActive ? 1.15 : 0.85,
        rotate: isActive ? 0 : rotate,
        x: isActive ? 0 : x,
        y: isActive ? -15 : 0,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
    >
      <div className="w-full pt-1.5 md:pt-2 px-1.5 md:px-2 pb-4 md:pb-6">
        <div className="w-full relative">
          <Image
            src={Dummy}
            width={400}
            height={400}
            alt="Foto Caketang"
            className="w-full h-32 sm:h-44 md:h-72 lg:h-80 object-cover rounded-t-[2.5rem] md:rounded-t-[4.5rem] rounded-b-xl md:rounded-b-2xl"
          />
          {/* Dimmer overlay for inactive cards */}
          {!isActive && (
            <div className="absolute inset-0 bg-[#2E1855]/60 rounded-t-[2.5rem] md:rounded-t-[4.5rem] rounded-b-xl md:rounded-b-2xl" />
          )}
        </div>
      </div>
      <div className="w-full -mt-6 md:-mt-8 relative z-10">
        <div
          className={`flex justify-center items-center px-1 sm:px-2 md:px-4 pt-3 md:pt-5 pb-3 md:pb-6 text-center min-h-[3.5rem] md:min-h-[4.5rem] rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] transition-colors duration-300 ${
            isActive
              ? "bg-[#F8F7FC] text-[#6543A7]"
              : "bg-[#2E1855] text-white/70 border-t border-white/10"
          }`}
        >
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold uppercase line-clamp-2 leading-tight tracking-wide">
            {data.nama}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PemilihanCard;
