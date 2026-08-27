import { AuthProfile } from "@/api/services/auth";
import React from "react";
import AktivitasListSection from "./AktivitasListSection";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";
import Image from "next/image";
import Maskot from "@/assets/assetsos26/illustrasions/maskot.svg";

import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

interface AktivitasAfterLoginProps {
  user: AuthProfile;
}

const AktivitasAfterLogin = ({ user }: AktivitasAfterLoginProps) => {
  const liquidGlassStyle = {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    boxShadow:
      "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)",
  };

  return (
    <SpaceBackground className="w-full min-h-screen">
      <CircleGLow />
      <BgBawah gradientHeight="h-[320px] lg:h-[560px]" />

      <div className="w-full flex flex-col relative pt-24 lg:pt-36 pb-16 lg:pb-24 z-10 gap-[220px] lg:gap-[380px]">
        <div className="w-full px-6 md:px-12 lg:px-8 xl:px-22">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[805px] h-auto flex flex-col gap-4 z-20 relative">
              <AnimatedDiv className="w-full" delay={0.1}>
                <div
                  className="w-full rounded-[12px] py-5 md:py-6 px-6 md:px-12 flex flex-col justify-center"
                  style={liquidGlassStyle}
                >
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2 drop-shadow-md">
                    Fasilitator
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-20 gap-y-1">
                    {user.kelompok?.distrik?.list_pjl.map((pjl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-base sm:text-lg lg:text-xl text-white">
                          {pjl.nama} - {pjl.line.replace(/@/g, "")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedDiv>

              <AnimatedDiv className="w-full" delay={0.2}>
                <div
                  className="w-full rounded-[12px] py-6 md:py-8 px-6 md:px-12 flex flex-col justify-center"
                  style={liquidGlassStyle}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-8 md:gap-x-20">
                    <div>
                      <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                        Nama Lengkap
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-white mt-1 font-normal">
                        {user.nama}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                        Distrik
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-white mt-1 font-normal">
                        {user.kelompok?.distrik?.nama_distrik}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                        Prodi
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-white mt-1 font-normal">
                        {user.prodi}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                        Kelompok
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-white mt-1 font-normal">
                        {user.kelompok?.nama_kelompok}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                        NIM
                      </p>
                      <p className="text-base sm:text-lg lg:text-xl text-white mt-1 font-normal">
                        {user.nim}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedDiv>

              <AnimatedDiv
                delay={0.3}
                className="hidden lg:block absolute -bottom-48 -right-24 z-50 pointer-events-none"
              >
                <Image
                  src={Maskot}
                  alt="Maskot"
                  className="w-[178px] h-[383px] object-contain -scale-x-100 animate-bounce-idle"
                  draggable={false}
                />
              </AnimatedDiv>
            </div>
          </div>
        </div>

        <AnimatedDiv
          className="w-full px-6 md:px-12 lg:px-8 xl:px-22 z-20"
          delay={0.4}
        >
          <AktivitasListSection />
        </AnimatedDiv>
      </div>
    </SpaceBackground>
  );
};

export default AktivitasAfterLogin;
