import Image from "next/image";
import React from "react";
import rocks from "@/assets/assetsos26/error/rocks.svg";

/**
 * Beberapa batu (rocks.svg dipakai ulang) tersebar seperti pada desain,
 * masing-masing mengambang dengan tempo berbeda agar terasa hidup.
 * Posisi & ukuran memakai persen/vw supaya responsif di semua device.
 */
type Rock = {
  top: string;
  left: string;
  width: string;
  rotate: number;
  duration: string;
  delay: string;
};

const ROCKS: Rock[] = [
  {
    top: "8%",
    left: "42%",
    width: "clamp(115px, 14vw, 210px)",
    rotate: -8,
    duration: "6.5s",
    delay: "0s",
  },
  {
    top: "16%",
    left: "52%",
    width: "clamp(56px, 6.5vw, 100px)",
    rotate: 12,
    duration: "5.5s",
    delay: "0.6s",
  },
  {
    top: "20%",
    left: "72%",
    width: "clamp(50px, 6vw, 88px)",
    rotate: 20,
    duration: "7s",
    delay: "1.1s",
  },
  {
    top: "26%",
    left: "79%",
    width: "clamp(32px, 4vw, 56px)",
    rotate: -14,
    duration: "6s",
    delay: "0.3s",
  },
  {
    top: "50%",
    left: "50%",
    width: "clamp(50px, 6vw, 90px)",
    rotate: 8,
    duration: "6.8s",
    delay: "0.9s",
  },
  {
    top: "59%",
    left: "53%",
    width: "clamp(30px, 3.4vw, 50px)",
    rotate: -22,
    duration: "5.8s",
    delay: "1.4s",
  },
  {
    top: "68%",
    left: "85%",
    width: "clamp(130px, 16vw, 250px)",
    rotate: 6,
    duration: "7.2s",
    delay: "0.2s",
  },
  {
    top: "62%",
    left: "94%",
    width: "clamp(44px, 5vw, 76px)",
    rotate: 16,
    duration: "6.2s",
    delay: "1s",
  },
  {
    top: "82%",
    left: "14%",
    width: "clamp(78px, 9.5vw, 138px)",
    rotate: -10,
    duration: "6.6s",
    delay: "0.5s",
  },
];

const FloatingRocks = () => {
  return (
    <div className="nf404-rocks" aria-hidden>
      {ROCKS.map((rock, i) => (
        <div
          key={i}
          className="nf404-rock"
          style={{
            top: rock.top,
            left: rock.left,
            width: rock.width,
            animationDuration: rock.duration,
            animationDelay: rock.delay,
          }}
        >
          <Image
            src={rocks}
            alt=""
            style={{ transform: `rotate(${rock.rotate}deg)` }}
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingRocks;
