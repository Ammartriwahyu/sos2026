import React from "react";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import SectionTitle from "@/shared/components/SectionTitle";
import RangkaianRow from "./RangkaianRow";
import SolarDecorations from "./SolarDecorations";
import { rangkaianItems } from "../data/rangkaian";

const RangkaianSection = () => {
  return (
    <SpaceBackground>
      <SolarDecorations />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <SectionTitle>Rangkaian</SectionTitle>

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {rangkaianItems.map((item) => (
            <RangkaianRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </SpaceBackground>
  );
};

export default RangkaianSection;
