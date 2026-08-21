"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { ProdiTabs } from "./ProdiTabs";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { stfData2024 } from "../../data/stfData2024";
import Bintang from "@/assets/assetsos26/stf/bintang.svg";
import SetengahBulan from "@/assets/assetsos26/stf/setengahbulan.svg";
import CirclePurple from "@/assets/assetsos26/shared/circle-purple.svg";

const CurrentSection = () => {
  const [activeProdiId, setActiveProdiId] = useState("sistem_informasi");

  const activeProdiData = useMemo(() => {
    return stfData2024.find((p) => p.id === activeProdiId);
  }, [activeProdiId]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <section className="relative z-10 w-full text-white overflow-hidden">
      {/* Setengah Bulan at top right (negative top offset to align with viewport top) */}
      <Image
        src={SetengahBulan}
        alt=""
        className="absolute -top-10 right-0 w-[180px] md:w-[280px] lg:w-[350px] pointer-events-none z-30"
      />

      {/* Circle Glow on the left and right (matching the glow wrapper technique from Peta page) */}
      <div className="absolute top-[60%] left-0 -translate-x-1/2 w-[250px] md:w-[400px] -translate-y-1/2 pointer-events-none z-10">
        <div className="peta-glow inset-0 h-full w-full opacity-60" />
        <Image
          src={CirclePurple}
          alt=""
          className="relative w-full opacity-50 mix-blend-screen scale-x-[-1]"
        />
      </div>
      <div className="absolute top-[70%] right-0 translate-x-1/2 w-[250px] md:w-[400px] -translate-y-1/2 pointer-events-none z-10">
        <div className="peta-glow inset-0 h-full w-full opacity-60" />
        <Image
          src={CirclePurple}
          alt=""
          className="relative w-full opacity-50 mix-blend-screen"
        />
      </div>

      <div className="mycontainer pt-16 pb-12 md:pt-24 md:pb-24 relative z-20">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-start text-left relative z-20 mt-8 lg:mt-0">
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-tight mb-6 relative">
              Shaping The
              <br /> Future 2025
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-md">
              Bersama kita membentuk masa depan dengan kepemimpinan yang
              inspiratif
            </p>

            <ProdiTabs
              activeProdiId={activeProdiId}
              onSelectProdi={setActiveProdiId}
            />
          </div>

          {/* Right Column (Candidate Card) */}
          <div className="relative z-20 flex justify-center lg:justify-end mt-12 lg:mt-0 lg:pr-12">
            <AnimatePresence mode="wait">
              {activeProdiData && (
                <motion.div
                  key={activeProdiId}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Arched Window - Saturated purple background */}
                  <div className="relative w-[320px] sm:w-[380px] md:w-[450px] h-[380px] sm:h-[450px] md:h-[480px] rounded-t-[250px] border-[3px] border-[#a78bfa] shadow-[0_0_25px_rgba(167,139,250,0.5)] bg-[#311a68] flex flex-col items-center overflow-visible">
                    {/* Decorative Star on the left edge of the arch - Enlarged & Animated */}
                    <motion.div
                      style={{ originX: 0.5, originY: 1 }}
                      animate={{
                        rotate: [-2.5, 2.5, -2.5],
                        filter: [
                          "drop-shadow(0px 0px 10px rgba(167,139,250,0.3))",
                          "drop-shadow(0px 0px 50px rgba(167,139,250,1))",
                          "drop-shadow(0px 0px 10px rgba(167,139,250,0.3))",
                        ],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/7 md:translate-y-1/5 z-40 origin-bottom"
                    >
                      <Image
                        src={Bintang}
                        alt=""
                        className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] peta-spin-rev pointer-events-none"
                      />
                    </motion.div>

                    {/* Decorative Star on the right edge of the arch - Enlarged & Animated */}
                    <motion.div
                      style={{ originX: 0.5, originY: 1 }}
                      animate={{
                        rotate: [2.5, -2.5, 2.5],
                        filter: [
                          "drop-shadow(0px 0px 10px rgba(167,139,250,0.3))",
                          "drop-shadow(0px 0px 50px rgba(167,139,250,1))",
                          "drop-shadow(0px 0px 10px rgba(167,139,250,0.3))",
                        ],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/7 md:translate-y-1/5 z-40 origin-bottom"
                    >
                      <div className="scale-x-[-1]">
                        <Image
                          src={Bintang}
                          alt=""
                          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] peta-spin-rev pointer-events-none"
                        />
                      </div>
                    </motion.div>

                    <div className="pt-8 md:pt-10 flex flex-col items-center text-center z-20">
                      <p className="text-sm md:text-base text-white/80 font-medium tracking-wide">
                        Ketua dan Wakil Ketua
                      </p>
                      <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 drop-shadow-md">
                        {activeProdiData.shortName} 2025
                      </h2>
                    </div>

                    {/* Candidate Image */}
                    <div className="absolute bottom-0 w-full h-[85%] flex justify-center items-end overflow-hidden rounded-t-[220px] z-10">
                      {activeProdiData.image && (
                        <Image
                          src={activeProdiData.image}
                          alt="Kandidat"
                          className={`w-[190%] max-w-none md:w-[175%] h-auto object-contain object-bottom drop-shadow-2xl ${activeProdiData.imageClassName || ""}`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Banner at the bottom */}
                  <div className="relative mt-4 md:mt-6 z-30 bg-[#a78bfa] text-white w-[320px] sm:w-[380px] md:w-[450px] py-2 md:py-3 rounded-t-[5px] rounded-b-[80px] shadow-xl text-center">
                    <p className="text-xl md:text-3xl font-bold">
                      {activeProdiData.ketangWaketang}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentSection;
