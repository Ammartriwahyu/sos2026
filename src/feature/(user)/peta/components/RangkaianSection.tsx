import React from "react";
import RangkaianTitle from "./RangkaianTitle";
import RangkaianRow from "./RangkaianRow";
import SolarDecorations from "./SolarDecorations";
import Starfield from "./Starfield";
import { rangkaianItems } from "../data/rangkaian";

const RangkaianSection = () => {
  return (
    <section className="peta-rangkaian-bg relative overflow-hidden">
      <SolarDecorations />
      <Starfield />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <RangkaianTitle />

        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {rangkaianItems.map((item) => (
            <RangkaianRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RangkaianSection;
