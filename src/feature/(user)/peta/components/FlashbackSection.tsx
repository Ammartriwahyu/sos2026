import React from "react";
import AuroraWaves from "./AuroraWaves";
import FlashbackCarousel from "./FlashbackCarousel";
import { flashbackPhotos } from "../data/rangkaian";

const FlashbackSection = () => {
  return (
    <section className="peta-flashback-bg relative overflow-hidden pt-10 pb-28 md:pt-16 md:pb-36">
      <AuroraWaves />

      <div className="content-container relative z-10">
        <h2 className="mb-12 text-center text-3xl font-semibold text-putih md:mb-16 md:text-5xl">
          Kilas Dibalik SOS
        </h2>

        <FlashbackCarousel photos={flashbackPhotos} />
      </div>
    </section>
  );
};

export default FlashbackSection;
