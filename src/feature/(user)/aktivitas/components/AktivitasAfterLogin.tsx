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
  const listPjl = user.kelompok?.distrik?.list_pjl ?? [];

  return (
    <SpaceBackground className="w-full min-h-screen">
      <CircleGLow />
      <BgBawah gradientHeight="h-[320px] lg:h-[560px]" />

      <div className="pt-navbar w-full flex flex-col relative pb-16 lg:pb-24 z-10 gap-[220px] lg:gap-[380px]">
        <div className="w-full px-6 md:px-12 lg:px-8 xl:px-22">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[805px] h-auto flex flex-col gap-4 z-20 relative">
              <AnimatedDiv className="w-full" delay={0.1}>
                <div className="liquid-glass w-full rounded-[12px] py-5 md:py-6 px-6 md:px-12 flex flex-col justify-center gap-2">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white drop-shadow-md">
                    Fasilitator
                  </h4>
                  {listPjl.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-20 gap-y-1">
                      {listPjl.map((pjl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-sm md:text-base text-white">
                            {pjl.nama} - {pjl.line.replace(/@/g, "")}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedDiv>

              <AnimatedDiv className="w-full" delay={0.2}>
                <div className="liquid-glass w-full rounded-[12px] py-6 md:py-8 px-6 md:px-12 flex flex-col justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 gap-x-8 md:gap-x-20">
                    <div>
                      <p className="text-white text-base md:text-lg font-medium">
                        Nama Lengkap
                      </p>
                      <p className="text-sm md:text-base text-white mt-1 font-normal">
                        {user.nama}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-base md:text-lg font-medium">
                        Distrik
                      </p>
                      <p className="text-sm md:text-base text-white mt-1 font-normal">
                        {user.kelompok?.distrik?.nama_distrik}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-base md:text-lg font-medium">
                        Prodi
                      </p>
                      <p className="text-sm md:text-base text-white mt-1 font-normal">
                        {user.prodi}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-base md:text-lg font-medium">
                        Kelompok
                      </p>
                      <p className="text-sm md:text-base text-white mt-1 font-normal">
                        {user.kelompok?.nama_kelompok}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-white text-base md:text-lg font-medium">
                        NIM
                      </p>
                      <p className="text-sm md:text-base text-white mt-1 font-normal">
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
