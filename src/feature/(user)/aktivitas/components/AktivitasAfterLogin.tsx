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
  // Gaya liquid glass konsisten yang disamakan dengan form presensi
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
      <BgBawah gradientHeight="h-[400px]" />

      <div className="w-full flex flex-col min-h-[1227px] relative pt-24 lg:pt-36 pb-36 lg:pb-48 z-10 justify-between">
        <div className="mycontainer w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-[805px] h-auto min-h-[458px] flex flex-col gap-[16px] z-20 relative mb-20 lg:mb-28">
              <AnimatedDiv className="w-full" delay={0.1}>
                <div
                  className="w-full min-h-[124px] rounded-[12px] py-4 md:py-[24px] px-6 md:px-[48px] flex flex-col justify-center"
                  style={liquidGlassStyle}
                >
                  <h4 className="text-4xl font-semibold text-white mb-1 md:mb-2 drop-shadow-md">
                    Fasilitator
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-20 gap-y-1">
                    {user.kelompok?.distrik?.list_pjl.map((pjl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-2xl text-white">{pjl.nama}</span>
                        <span className="text-2xl font-normal text-white/90">
                          Line:{" "}
                          <span className="text-white font-normal">
                            {pjl.line.replace(/@/g, "")}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedDiv>

              <AnimatedDiv className="w-full" delay={0.2}>
                <div
                  className="w-full min-h-[318px] rounded-[12px] py-6 md:py-[24px] px-6 md:px-[48px] flex flex-col justify-center"
                  style={liquidGlassStyle}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 md:gap-x-20">
                    <div>
                      <p className="text-white text-2xl font-medium">
                        Nama Lengkap
                      </p>
                      <p className="text-xl text-white mt-0.5 font-normal">
                        {user.nama}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-2xl font-medium">Distrik</p>
                      <p className="text-xl text-white mt-4 font-normal">
                        {user.kelompok?.distrik?.nama_distrik}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-2xl font-medium">
                        Program Studi
                      </p>
                      <p className="text-xl text-white mt-4 font-normal">
                        {user.prodi}
                      </p>
                    </div>
                    <div>
                      <p className="text-white text-2xl font-medium">
                        Kelompok
                      </p>
                      <p className="text-xl text-white mt-4 font-normal">
                        {user.kelompok?.nama_kelompok}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-white text-2xl font-medium">NIM</p>
                      <p className="text-xl text-white mt-4 font-normal">
                        {user.nim}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedDiv>

              <AnimatedDiv
                delay={0.3}
                className="hidden lg:block absolute -bottom-55 -right-25 z-50 pointer-events-none"
              >
                <Image
                  src={Maskot}
                  alt="Maskot"
                  className="w-[152px] h-[327px] object-contain -scale-x-100 animate-bounce-idle"
                  draggable={false}
                />
              </AnimatedDiv>
            </div>
          </div>
        </div>

        <AnimatedDiv
          className="mycontainer w-full mt-16 lg:mt-24 z-20"
          delay={0.4}
        >
          <AktivitasListSection />
        </AnimatedDiv>
      </div>
    </SpaceBackground>
  );
};

export default AktivitasAfterLogin;
