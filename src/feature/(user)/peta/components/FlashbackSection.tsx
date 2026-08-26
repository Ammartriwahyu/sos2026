import React from "react";
import SectionTitle from "@/shared/components/SectionTitle";
import AuroraWaves from "./AuroraWaves";
import FlashbackCarousel from "./FlashbackCarousel";
import { flashbackPhotos } from "../data/rangkaian";

const FlashbackSection = () => {
  return (
    <section className="peta-flashback-bg relative overflow-hidden pt-10 pb-28 md:pt-16 md:pb-36">
      <AuroraWaves />

      <div className="content-container relative z-10">
        <SectionTitle className="mb-12 md:mb-16">
          Kilas Dibalik SOS
        </SectionTitle>

        <FlashbackCarousel photos={flashbackPhotos} />
      </div>
    </section>
  );
};

export default FlashbackSection;
