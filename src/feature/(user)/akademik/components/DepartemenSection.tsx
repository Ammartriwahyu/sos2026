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
import SectionTitle from "@/shared/components/SectionTitle";

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
    <SpaceBackground fullPage={false}>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[24%] right-0 w-[300px] translate-x-1/2 sm:w-[380px] lg:w-[480px]">
          <div className="peta-glow inset-0 h-full w-full opacity-60" />
          <Image src={CirclePurple} alt="" className="relative w-full" />
        </div>
      </div>

      <div
        ref={rootRef}
        className="relative z-10 mx-auto w-full max-w-6xl pt-navbar px-6 pb-12 md:px-10 md:pb-20"
      >
        <SectionTitle as="h1">Apa itu DSI ?</SectionTitle>

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-center md:gap-6 lg:gap-10">
          <div className="akd-fade-up peta-reveal relative hidden md:top-6 md:block md:w-[112px] md:shrink-0 lg:w-[130px]">
            <div className="relative">
              <Image
                src={QuestionMark}
                alt=""
                aria-hidden
                className="akademik-wiggle absolute -top-[6%] right-[2%] z-10 w-[32%] select-none"
              />
              <Image
                src={ManAkademik}
                alt="Ilustrasi mahasiswa"
                className="akademik-sway w-full select-none"
              />
            </div>
          </div>

          <div className="akd-fade-up peta-reveal order-2 flex-1 text-justify text-sm leading-6 text-putih/90 md:order-none md:text-base md:leading-7">
            <p>
              Departemen Sistem Informasi (DSI) adalah salah satu departemen di
              Fakultas Ilmu Komputer (FILKOM) Universitas Brawijaya (UB). DSI
              fokus pada pengembangan sistem informasi yang terintegrasi dengan
              kebutuhan bisnis dan manajemen, serta menghasilkan lulusan yang
              kompeten di bidang teknologi informasi. DSI juga membawahi tiga
              program studi, yaitu Sistem Informasi, Teknologi Informasi, dan
              Pendidikan Teknologi Informasi.
            </p>
          </div>

          <div className="akd-fade peta-reveal order-1 mx-auto w-[220px] shrink-0 md:order-none md:mx-0 md:w-[190px] lg:w-[230px]">
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
      </div>
    </SpaceBackground>
  );
};

export default DepartemenSection;
