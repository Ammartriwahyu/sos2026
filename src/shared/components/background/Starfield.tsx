import Image from "next/image";
import Star from "@/assets/assetsos26/shared/star.svg";

interface StarConfig {
  top: string;
  left: string;
  size: number;
  floatDur: number;
  twDur: number;
  delay: number;
}

const STARS: StarConfig[] = [
  { top: "5%", left: "7%", size: 14, floatDur: 6.5, twDur: 3.2, delay: 0 },
  { top: "9%", left: "92%", size: 12, floatDur: 5.5, twDur: 3.8, delay: 0.6 },
  { top: "15%", left: "3%", size: 10, floatDur: 7, twDur: 2.8, delay: 1.1 },
  { top: "19%", left: "96%", size: 10, floatDur: 6.6, twDur: 3.4, delay: 1.9 },
  { top: "24%", left: "12%", size: 18, floatDur: 6, twDur: 4.2, delay: 0.3 },
  { top: "29%", left: "88%", size: 16, floatDur: 5.8, twDur: 3.5, delay: 1.4 },
  { top: "36%", left: "5%", size: 12, floatDur: 7.2, twDur: 3, delay: 0.9 },
  { top: "41%", left: "94%", size: 14, floatDur: 6.4, twDur: 4, delay: 0.2 },
  { top: "46%", left: "10%", size: 16, floatDur: 5.6, twDur: 2.6, delay: 1.7 },
  { top: "52%", left: "90%", size: 10, floatDur: 6.8, twDur: 3.6, delay: 0.5 },
  { top: "57%", left: "3%", size: 10, floatDur: 6.2, twDur: 4.4, delay: 1.2 },
  { top: "63%", left: "97%", size: 18, floatDur: 5.4, twDur: 3.1, delay: 0.8 },
  { top: "68%", left: "8%", size: 20, floatDur: 7.4, twDur: 2.9, delay: 1.5 },
  { top: "73%", left: "87%", size: 12, floatDur: 6.1, twDur: 3.7, delay: 0.4 },
  { top: "79%", left: "13%", size: 12, floatDur: 5.9, twDur: 4.1, delay: 1.0 },
  { top: "84%", left: "93%", size: 16, floatDur: 6.7, twDur: 3.3, delay: 1.6 },
  { top: "91%", left: "5%", size: 14, floatDur: 5.7, twDur: 3.9, delay: 0.7 },
  { top: "95%", left: "89%", size: 10, floatDur: 6.9, twDur: 2.7, delay: 1.3 },
];

const Starfield = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {STARS.map((s) => (
        <span
          key={s.top + s.left}
          className="peta-star"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--peta-float-dur": `${s.floatDur}s`,
              "--peta-tw-dur": `${s.twDur}s`,
              "--peta-delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        >
          <Image src={Star} alt="" width={s.size} height={s.size} />
        </span>
      ))}
    </div>
  );
};

export default Starfield;
