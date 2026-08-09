import React from "react";
import Maskot from "@/assets/assetsos26/illustrasions/maskot.svg";
import Image from "next/image";
import Link from "next/link";
import Starfield from "@/shared/components/background/Starfield";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";

const AktivitasBeforeLogin = () => {
  return (
    <div className="space-bg relative w-full min-h-screen overflow-hidden flex flex-col justify-between bg-[#07132D]">
      <CircleGLow />
      <Starfield />
      <BgBawah />

      <div className="mycontainer w-full overflow-hidden min-h-screen relative z-10 flex items-start lg:items-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex lg:-mt-35 justify-center flex-col-reverse w-full lg:flex-row items-center gap-10">
          <Image
            src={Maskot}
            alt="Maskot"
            className="hidden lg:block w-[110px] h-[236px] md:w-[130px] md:h-[280px] lg:w-[152px] lg:h-[327px] z-20 relative object-contain"
          />

          <div className="z-20 flex w-full max-w-[530px] lg:h-[228px] flex-col justify-center items-center rounded-[12px] p-[24px] gap-[20px] bg-white/[0.15] backdrop-blur-[16px] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] h-fit">
            <h4 className="text-3xl sm:text-4xl text-center font-semibold text-white">
              Halo, Adik Maba!
            </h4>
            <span className="text-white text-sm sm:text-base lg:text-xl text-center my-4">
              Yuk, masuk dulu biar bisa akses semua hal seru yang udah disiapin
              buat kamu!
            </span>
            <div className="w-full">
              <Link href="/login">
                <AktivitasButton>Masuk</AktivitasButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AktivitasBeforeLogin;
