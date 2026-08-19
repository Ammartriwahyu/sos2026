import Image from "next/image";
import React from "react";
import Dummy from "@/assets/stf/dummy.png";
import { Caketang } from "@/api/services/user/stf";
import { motion } from "framer-motion";

interface Props {
  data: Caketang;
  isActive: boolean;
  onClick: () => void;
}

const PemilihanCard = ({ isActive = false, data, onClick }: Props) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer flex flex-col w-full max-w-sm rounded-[4rem] rounded-b-[3rem] overflow-hidden shadow-2xl transition-all duration-300 ${
        isActive ? "bg-[#F8F7FC] z-30" : "bg-[#2E1855] z-10 hover:bg-[#3D236B]"
      }`}
      animate={{
        scale: isActive ? 1.25 : 0.95,
        opacity: 1, // Full opacity for both to be "tidak tembus"
        y: isActive ? -20 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-full pt-4 px-4 pb-8">
        <Image
          src={data.foto || Dummy}
          width={400}
          height={400}
          alt="Foto Caketang"
          className="w-full h-80 md:h-96 object-cover rounded-t-[3.5rem] rounded-b-2xl"
        />
      </div>
      <div className="w-full px-4 pb-4 -mt-12">
        <div
          className={`flex flex-col justify-center items-center px-4 py-4 text-center min-h-[5rem] rounded-[2.5rem] shadow-md border-b-4 ${
            isActive
              ? "bg-[#F8F7FC] border-gray-200"
              : "bg-[#F8F7FC] border-gray-300/50"
          }`}
        >
          <p className="text-xl md:text-2xl font-bold uppercase line-clamp-2 leading-tight tracking-wide text-[#6543A7]">
            {data.nama}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PemilihanCard;
