"use client";
import React from "react";
import PresensiFormSection from "../components/PresensiFormSection";
import RekapPresensiSection from "../components/RekapPresensiSection";
import { useGetPresensiRekap } from "../hooks/useGetPresensiRekap";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";

const PresensiUserContainer = () => {
  const {
    data: presensiData,
    refresh,
    error,
    isLoading,
  } = useGetPresensiRekap();

  return (
    <SpaceBackground className="w-full min-h-screen relative overflow-hidden">
      {/* Background Enhancements */}
      <CircleGLow />
      <BgBawah gradientHeight="h-[770px]" />

      {/* Main Container dengan jarak top persis 127px dari navbar dan tinggi minimum 1227px */}
      <div className="w-full flex flex-col min-h-[1227px] relative pt-[127px] px-6 py-8 md:px-8 lg:px-32 pb-36 lg:pb-48 z-10 gap-[357px]">
        <PresensiFormSection refreshPresensi={refresh} />

        <RekapPresensiSection
          presensiData={presensiData ?? []}
          error={error}
          isLoading={isLoading}
        />
      </div>
    </SpaceBackground>
  );
};

export default PresensiUserContainer;
