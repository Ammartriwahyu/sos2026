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
      <BgBawah gradientHeight="h-[770px]" />

      <div className="w-full flex flex-col min-h-[1227px] relative mt-20 px-6 pt-8 md:px-8 lg:px-32 pb-36 lg:pb-48 z-10 gap-[350px]">
        <div className="w-full flex flex-col gap-6">
          <AnimatedDiv className="w-full flex justify-start">
            <div className="w-full">
              <Link
                href="/aktivitas"
                className="inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0" />
                <span>Kembali</span>
              </Link>
            </div>
          </AnimatedDiv>

          <AnimatedDiv className="w-full" delay={0.1}>
            <PresensiFormSection refreshPresensi={refresh} />
          </AnimatedDiv>
        </div>

        {/* Bagian Bawah: Rekap Presensi */}
        <AnimatedDiv className="w-full" delay={0.2}>
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
