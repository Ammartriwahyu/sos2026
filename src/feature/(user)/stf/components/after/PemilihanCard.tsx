import Image from "next/image";
import React from "react";
import { Caketang } from "@/api/services/user/stf";
import { motion } from "framer-motion";

interface Props {
  data: Caketang;
  isActive: boolean;
  onClick: () => void;
  index: number;
  activeIndex: number;
  total: number;
}

const PemilihanCard = ({
  isActive = false,
  data,
  onClick,
  index,
  total,
}: Props) => {
  const centerIndex = (total - 1) / 2;
  const staticDistance = index - centerIndex;

  // Calculate dynamic rotation and shift based on static position
  const rotate = staticDistance * 8;
  const x = staticDistance * 40;

  return (
    <motion.div
      onClick={onClick}
      style={{ zIndex: isActive ? 30 : 20 - Math.abs(staticDistance) }}
      className={`relative cursor-pointer flex flex-col w-full max-w-32 sm:max-w-44 md:max-w-64 lg:max-w-72 rounded-t-[3rem] md:rounded-t-[5rem] rounded-b-3xl md:rounded-b-[3rem] overflow-hidden shadow-2xl transition-colors duration-300 ${
        isActive
          ? "bg-[var(--color-stf-text)]"
          : "bg-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary-hover)]"
      }`}
      animate={{
        scale: isActive ? 1.15 : 0.85,
        rotate: rotate, // Static rotation
        x: x, // Static x position
        y: 0,
        zIndex: isActive ? 30 : Math.round(20 - Math.abs(staticDistance)),
      }}
      transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
    >
      <div className="w-full pt-1.5 md:pt-2 px-1.5 md:px-2 pb-0 md:pb-0">
        <div className="w-full relative">
          <Image
            src={data.foto || "/placeholder-image.jpg"}
            width={400}
            height={533}
            alt="Foto Caketang"
            className="w-full h-auto aspect-[3/4] object-contain object-bottom rounded-t-[3rem] md:rounded-t-[5rem] rounded-b-none"
          />
          {/* Dimmer overlay for inactive cards */}
          {!isActive && (
            <div className="absolute inset-0 bg-black/40 rounded-t-[3rem] md:rounded-t-[5rem]" />
          )}
        </div>
      </div>
      <div className="w-full -mt-4 md:-mt-6 relative z-10 flex-grow flex flex-col">
        <div
          className={`flex-grow flex justify-center items-center px-1 sm:px-2 md:px-4 py-3 md:py-4 text-center min-h-[3rem] md:min-h-[4rem] rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-4px_10px_rgba(0,0,0,0.1)] transition-colors duration-300 ${
            isActive
              ? "bg-[var(--color-stf-text)] text-[var(--color-stf-purple)]"
              : "bg-[var(--color-stf-primary)] text-white/90 border-t border-white/10"
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
