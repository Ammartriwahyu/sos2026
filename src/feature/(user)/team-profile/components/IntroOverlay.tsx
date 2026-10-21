import React from "react";
import Image from "next/image";
import LogoSos from "@/assets/assetsos26/logo-sos26.svg";
import SolarSystem from "@/assets/assetsos26/shared/solar-system.png";
import { round, seeded } from "../data/motion";
import {
  divisions,
  getDivisionAccentStyle,
  teamMembers,
} from "../data/teamMembers";

interface IntroOverlayProps {
  overlayRef: React.RefObject<HTMLDivElement | null>;
  onSkip: () => void;
}

const TITLE_WORDS = ["SYNERGY", "OF", "SYMPHONY"];
const SUBTITLE = "WEB DEVELOPER TEAM";
const STREAK_COUNT = 20;
const STAR_COUNT = 40;
const FLYER_COUNT = 22;
const FULL_TURN = Math.PI * 2;

const STREAKS = Array.from({ length: STREAK_COUNT }, (_, index) => ({
  angle: round(index * (360 / STREAK_COUNT) + seeded(index, 51) * 12),
  length: round(16 + seeded(index, 52) * 18),
  offset: round(4 + seeded(index, 53) * 10),
}));

const STARS = Array.from({ length: STAR_COUNT }, (_, index) => ({
  angle: round(seeded(index, 61) * FULL_TURN, 3),
  radius: round(0.18 + seeded(index, 62) * 0.82, 3),
  size: round(2 + seeded(index, 63) * 3),
}));

const FLYERS = Array.from({ length: FLYER_COUNT }, (_, index) => ({
  angle: round(seeded(index, 71) * FULL_TURN, 3),
  size: round(2 + seeded(index, 72) * 3),
}));

const renderTitle = (charClassName?: string) =>
  TITLE_WORDS.map((word) => (
    <span key={word} className="inline-flex whitespace-nowrap">
      {word.split("").map((char, index) => (
        <span key={`${word}-${index}`} className={charClassName}>
          {char}
        </span>
      ))}
    </span>
  ));

const IntroOverlay = ({ overlayRef, onSkip }: IntroOverlayProps) => {
  return (
    <div
      ref={overlayRef}
      className="tp-intro fixed inset-0 z-50 overflow-hidden bg-black-darker"
    >
      <noscript>
        <style>{".tp-intro{display:none}"}</style>
      </noscript>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="tp-intro-space tp-intro-hidden absolute inset-0" />

        <div className="tp-intro-nebula tp-intro-nebula-a tp-intro-hidden" />
        <div className="tp-intro-nebula tp-intro-nebula-b tp-intro-hidden" />

        <div className="tp-intro-solar tp-intro-hidden absolute -right-[18vmax] -top-[14vmax] w-[62vmax]">
          <Image
            src={SolarSystem}
            alt=""
            priority
            className="peta-spin peta-spin-slow h-auto w-full"
          />
        </div>

        {STARS.map((star, index) => (
          <span
            key={index}
            className="tp-intro-star tp-intro-hidden"
            data-angle={star.angle}
            data-radius={star.radius}
            style={{ width: star.size, height: star.size }}
          />
        ))}

        {FLYERS.map((flyer, index) => (
          <span
            key={index}
            className="tp-intro-flyer tp-intro-hidden"
            data-angle={flyer.angle}
            style={{ width: flyer.size, height: flyer.size }}
          />
        ))}

        {STREAKS.map((streak, index) => (
          <span
            key={index}
            className="tp-streak-arm"
            style={
              {
                "--tp-angle": `${streak.angle}deg`,
                "--tp-length": `${streak.length}vmax`,
                "--tp-offset": `${streak.offset}vmax`,
              } as React.CSSProperties
            }
          >
            <span className="tp-streak" />
          </span>
        ))}

        <span className="tp-intro-burst tp-intro-hidden" />
        <span className="tp-intro-spark tp-intro-hidden" />
      </div>

      <div className="tp-intro-content relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="relative">
          <div
            className="tp-intro-glow-wrap tp-intro-hidden absolute -inset-12"
            aria-hidden
          >
            <span className="tp-intro-glow" />
          </div>
          <span className="tp-intro-ring tp-intro-hidden" aria-hidden />
          <span className="tp-intro-ring tp-intro-hidden" aria-hidden />
          <Image
            src={LogoSos}
            alt=""
            className="tp-intro-logo tp-intro-hidden relative h-24 w-24 md:h-36 md:w-36"
          />
        </div>

        <p className="sr-only">Synergy of Symphony, {SUBTITLE.toLowerCase()}</p>

        <div className="relative mt-8" aria-hidden>
          <div className="flex flex-wrap justify-center gap-x-[0.45em] font-upanddownnormal text-4xl leading-tight text-putih sm:text-6xl md:text-7xl lg:text-8xl">
            {renderTitle("tp-char")}
          </div>
          <div className="tp-intro-shine tp-intro-hidden absolute inset-0 flex flex-wrap justify-center gap-x-[0.45em] font-upanddownnormal text-4xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {renderTitle("inline-block")}
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col items-center" aria-hidden>
          <p className="tp-intro-subtitle tp-intro-hidden whitespace-nowrap pl-[0.3em] font-poppins text-xs font-semibold tracking-[0.3em] text-secondary-500 sm:text-base md:text-lg">
            {SUBTITLE}
          </p>
          <span className="tp-intro-underline tp-intro-hidden mt-3 h-0.5 w-[min(70vw,28rem)]" />
        </div>

        <p className="tp-intro-count tp-intro-hidden mt-7 font-poppins text-sm font-semibold uppercase tracking-[0.25em] text-putih md:text-lg">
          <span className="tp-intro-count-number">{teamMembers.length}</span>{" "}
          orang · {divisions.length} divisi · 1 misi
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden>
        {divisions.map((division) => (
          <div
            key={division.id}
            className="tp-intro-band tp-intro-hidden"
            style={getDivisionAccentStyle(division)}
          >
            <span className="tp-intro-band-label font-upanddownnormal text-4xl uppercase sm:text-6xl md:text-8xl">
              {division.label}
            </span>
          </div>
        ))}
        <div className="tp-intro-flash tp-intro-hidden absolute inset-0 bg-putih" />
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="absolute right-4 top-4 z-30 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-putih/60 bg-black-darker/70 px-5 font-poppins text-sm font-medium text-putih transition-colors hover:bg-putih/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-putih md:right-8 md:top-8"
      >
        Lewati
      </button>
    </div>
  );
};

export default IntroOverlay;
