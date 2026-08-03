import React from "react";
import RangkaianSection from "../components/RangkaianSection";
import GrassDivider from "../components/GrassDivider";
import FlashbackSection from "../components/FlashbackSection";

const PetaContainer = () => {
  return (
    <main className="peta-rangkaian-bg overflow-x-hidden">
      <RangkaianSection />
      <GrassDivider />
      <FlashbackSection />
    </main>
  );
};

export default PetaContainer;
