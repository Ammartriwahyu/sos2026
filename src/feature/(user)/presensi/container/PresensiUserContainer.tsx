"use client";
import React from "react";
import PresensiFormSection from "../components/PresensiFormSection";
import RekapPresensiSection from "../components/RekapPresensiSection";
import { useGetPresensiRekap } from "../hooks/useGetPresensiRekap";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

const PresensiUserContainer = () => {
  const {
    data: presensiData,
    refresh,
    error,
    isLoading,
  } = useGetPresensiRekap();

  return (
    <SpaceBackground className="w-full min-h-screen relative overflow-hidden">
      <CircleGLow />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[220px] md:h-[300px] lg:h-[380px] bg-linear-to-b from-transparent via-space-base/70 to-space-base" />

      <div className="w-full flex flex-col relative mt-20 pb-24 lg:pb-48 z-10">
        <div className="w-full flex flex-col gap-6 px-6 pt-8 md:px-8 lg:px-32">
          <AnimatedDiv className="w-full flex justify-start">
            <div className="w-full mt-6 md:mt-4">
              <Link
                href="/aktivitas"
                className="inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white shrink-0" />
                <span>Kembali</span>
              </Link>
            </div>
          </AnimatedDiv>

          <AnimatedDiv className="w-full" delay={0.1}>
            <PresensiFormSection refreshPresensi={refresh} />
          </AnimatedDiv>
        </div>

        <div className="relative w-full h-[200px] md:h-[320px] lg:h-[470px]">
          <BgBawah gradientHeight="h-[80px] md:h-[110px] lg:h-[150px]" />
        </div>

        <AnimatedDiv className="w-full px-6 md:px-8 lg:px-32" delay={0.2}>
          <RekapPresensiSection
            presensiData={presensiData ?? []}
            error={error}
            isLoading={isLoading}
          />
        </AnimatedDiv>
      </div>
    </SpaceBackground>
  );
};

export default PresensiUserContainer;
