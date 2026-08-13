import Image from "next/image";
import React from "react";
import Texture from "@/assets/user/card-texture.png";
import { Memori } from "../../data/memori";

interface MemoriCardProps {
  memori: Memori;
  isActive: boolean;
}

const MemoriCard = ({ memori, isActive }: MemoriCardProps) => {
  return (
    <div>
      <div
        className={`w-full relative overflow-hidden bg-secondary-200 text-center aspect-square group rounded-[4rem] p-1 font-semibold text-xl 2xl:text-3xl text-primary-600 flex items-center justify-center z-20 border-4 transition-all duration-300 ${
          isActive
            ? "md:border-14 border-10 border-primary-500"
            : "border-primary-500"
        }`}
      >
        {" "}
        <Image
          alt="texture"
          src={Texture}
          className="absolute z-10 w-full h-full"
        />
        {typeof memori.content === "string" &&
        memori.content.startsWith("http") ? (
          <Image
            src={memori.content}
            alt={memori.title}
            fill
            className="object-cover z-40"
          />
        ) : (
          <p className="z-40">{memori.content.toString()}</p>
        )}
      </div>
      <div
        className={`w-full h-[10rem] rounded-[4rem] flex items-end  relative z-10 -mt-28 bg-primary-500 transition-all duration-300 ${
          isActive ? "block" : "hidden"
        }`}
      >
        <div className="h-[4rem] flex items-center    w-full">
          <p className=" text-white  font-medium text-sm  text-center 2xl:text-lg  mx-auto">
            {memori.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemoriCard;
