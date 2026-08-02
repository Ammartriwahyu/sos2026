import React from "react";
import SpaceWaves from "./SpaceWaves";
import Starfield from "./Starfield";
import { wavePath } from "../waveShape";

/**
 * "Ombak" ungu yang dibawa roket. Bentuk tepinya digambar lewat SVG <clipPath>
 * (objectBoundingBox agar responsif). Nilai `d`-nya TIDAK dianimasikan di sini;
 * GSAP (di NotFoundContainer) yang meng-update `d` tiap frame agar puncaknya
 * sinkron dengan roket dalam satu timeline. `d` awal = ombak di luar layar (kiri).
 */
const PurpleCurtain = () => {
  return (
    <div className="nf404-curtain">
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <clipPath id="nf404-wave-clip" clipPathUnits="objectBoundingBox">
            <path id="nf404-wave-path" d={wavePath(-0.18)} />
          </clipPath>
        </defs>
      </svg>
      <SpaceWaves />
      <Starfield />
    </div>
  );
};

export default PurpleCurtain;
