"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CirclePurple from "@/assets/assetsos26/shared/circle-purple.svg";
import LogoDepartemen from "@/assets/assetsos26/shared/logo-departemen.png";
import ManAkademik from "@/assets/assetsos26/akademik/man-akademik.svg";
import QuestionMark from "@/assets/assetsos26/akademik/question-mark.svg";
import LogoOnBase from "./LogoOnBase";

const DepartemenSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const fadeUp = gsap.utils.toArray<HTMLElement>(".akd-fade-up");
      const fade = gsap.utils.toArray<HTMLElement>(".akd-fade");

      if (reduce) {
        gsap.set([...fadeUp, ...fade], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(fadeUp, { opacity: 0, y: 24 });
      gsap.set(fade, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });

      tl.to(fadeUp, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.12,
      }).to(fade, { opacity: 1, duration: 0.8, ease: "power2.out" }, "<0.1");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SpaceBackground>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[24%] right-0 w-[300px] translate-x-1/2 sm:w-[380px] lg:w-[480px]">
          <div className="peta-glow inset-0 h-full w-full opacity-60" />
          <Image src={CirclePurple} alt="" className="relative w-full" />
        </div>
      </div>

      <div
        ref={rootRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-12 md:px-10 md:pt-32 md:pb-0 lg:pt-36"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-8 lg:gap-14">
          <div className="flex flex-col md:w-[210px] md:shrink-0 lg:w-[240px]">
            <p className="akd-fade-up peta-reveal text-4xl font-semibold whitespace-nowrap text-putih lg:text-5xl">
              Apa sih itu
            </p>
            <div className="akd-fade-up peta-reveal mt-6 hidden w-full md:block">
              <Image
                src={ManAkademik}
                alt="Ilustrasi mahasiswa"
                className="akademik-sway w-full select-none"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="akd-fade-up peta-reveal flex items-start mt-10">
                <h1 className="text-6xl font-bold text-putih lg:text-8xl">
                  DSI
                </h1>
                <Image
                  src={QuestionMark}
                  alt=""
                  aria-hidden
                  className="akademik-wiggle relative left-1 w-14 select-none lg:w-20"
                />
              </div>

              <div className="akd-fade peta-reveal w-[220px] shrink-0 md:-mt-6 lg:-mt-2 lg:w-[360px]">
                <LogoOnBase
                  logo={LogoDepartemen}
                  alt="Logo Departemen Sistem Informasi"
                  float
                  priority
                  logoWidth="w-[64%]"
                  logoBottom="bottom-[45%]"
                />
              </div>
            </div>

            <div className="akd-fade-up peta-reveal lg:mt-6 xl:mt-12 text-justify text-lg leading-8 text-putih/90 md:text-xl lg:text-xl xl:text-2xl xl:leading-9">
              <p>
                Departemen Sistem Informasi (DSI) adalah salah satu departemen
                di Fakultas Ilmu Komputer (FILKOM) Universitas Brawijaya (UB).
                DSI fokus pada pengembangan sistem informasi yang terintegrasi
                dengan kebutuhan bisnis dan manajemen, serta menghasilkan
                lulusan yang kompeten di bidang teknologi informasi. DSI juga
                membawahi tiga program studi, yaitu Sistem Informasi, Teknologi
                Informasi, dan Pendidikan Teknologi Informasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SpaceBackground>
  );
};

export default DepartemenSection;
