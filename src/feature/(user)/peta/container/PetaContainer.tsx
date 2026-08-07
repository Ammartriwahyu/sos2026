import React from "react";
import RangkaianSection from "../components/RangkaianSection";
import GrassDivider from "@/shared/components/background/GrassDivider";
import FlashbackSection from "../components/FlashbackSection";

const PetaContainer = () => {
  return (
    <main className="space-bg overflow-x-hidden">
      <RangkaianSection />
      <GrassDivider />
      <FlashbackSection />
    </main>
  );
};

export default PetaContainer;
