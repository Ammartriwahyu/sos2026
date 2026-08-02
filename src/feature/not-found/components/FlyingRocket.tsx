import Image from "next/image";
import React from "react";
import rocket from "@/assets/assetsos26/error/rocket.png";

/**
 * Roket yang melintas dari kiri ke kanan secara berulang, membawa efek cahaya
 * (nf404-glow) di ekornya. Animasi gerak diatur di globals.css (nf404-fly).
 */
const FlyingRocket = () => {
  return (
    <div className="nf404-rocket-wrap" aria-hidden>
      <div className="nf404-rocket">
        <span className="nf404-glow" />
        <Image
          src={rocket}
          alt=""
          className="nf404-rocket-img"
          sizes="(max-width: 768px) 40vw, 290px"
          priority
          draggable={false}
        />
      </div>
    </div>
  );
};

export default FlyingRocket;
