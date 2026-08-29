import React from "react";
import Maskot from "@/assets/assetsos26/illustrasions/maskot.svg";
import Image from "next/image";
import Link from "next/link";
import Starfield from "@/shared/components/background/Starfield";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";

const AktivitasBeforeLogin = () => {
  return (
    <div className="space-bg relative w-full min-h-screen overflow-hidden flex flex-col justify-between bg-[#07132D]">
      <CircleGLow />
      <Starfield />
      <BgBawah />

      <div className="w-full overflow-hidden min-h-screen relative z-10 flex items-center justify-center py-24 px-6 md:px-12 lg:px-8 xl:px-22">
        <div className="flex justify-center flex-col-reverse w-full lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
          <AnimatedDiv delay={0.1} className="hidden lg:block">
            <Image
              src={Maskot}
              alt="Maskot"
              className="w-[212px] h-[456px] z-20 relative object-contain animate-bounce-idle"
              draggable={false}
            />
          </AnimatedDiv>

          <AnimatedDiv delay={0.2} className="w-full max-w-[800px]">
            <div className="liquid-glass z-20 flex w-full flex-col justify-center items-center rounded-[12px] px-6 sm:px-8 lg:px-12 py-8 lg:py-10 gap-5 h-fit relative">
              <h4 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold text-white drop-shadow-md">
                Halo, Adik Maba!
              </h4>
              <span className="text-white text-sm md:text-base text-center leading-relaxed">
                Yuk, masuk dulu biar bisa akses semua hal seru yang udah
                disiapin buat kamu!
              </span>

              <div className="w-full flex justify-center mt-1">
                <Link href="/login" className="w-full h-[48px] block">
                  <AktivitasButton className="w-full h-full flex items-center justify-center">
                    Masuk
                  </AktivitasButton>
                </Link>
              </div>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </div>
  );
};

export default AktivitasBeforeLogin;
