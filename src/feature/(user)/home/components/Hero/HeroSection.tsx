"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Asap from "@/assets/home/asap.png";
import AsapPink from "@/assets/home/asap-pink.webp";
import batuIreng from "@/assets/home/batu-ireng.webp";
import BatuLebar from "@/assets/home/batu-lebar.webp";
import PortalNether from "@/assets/home/portal-nether.webp";
import { HeroTextSVG } from "./HeroTextSVG";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const hasUnlocked = useRef(false);

  useEffect(() => {
    if (hasUnlocked.current) return;

    lenis?.stop();

    const timer = setTimeout(() => {
      hasUnlocked.current = true;
      lenis?.start();
    }, 3000);

    return () => {
      clearTimeout(timer);
      lenis?.start();
    };
  }, [lenis]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      const commonTo = {
        y: 0,
        x: 0,
        filter: "blur(0px)",
        duration: 1.8,
        ease: "power3.out",
      };

      tl.fromTo(
        ".batu-ireng-left",
        { scale: 10, y: -1200, x: -3000, filter: "blur(10px)" },
        { scale: 1, ...commonTo },
        0.2,
      )
        .fromTo(
          ".batu-ireng-right",
          { scaleX: -10, scaleY: 10, y: -1200, x: 3000, filter: "blur(10px)" },
          { scaleX: -1, scaleY: 1, ...commonTo },
          0.2,
        )
        .fromTo(
          ".portal-batu-container",
          {
            scale: 1.2,
            y: 1000,
            transformOrigin: "bottom center",
            filter: "blur(10px)",
          },
          {
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power3.out",
          },
          "<0.6",
        );

      document
        .querySelectorAll<SVGPathElement>(".hero-text-path")
        .forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, {
            strokeDasharray: len,
            strokeDashoffset: len,
            fillOpacity: 0,
          });
        });

      tl.to(
        ".hero-text-path",
        {
          strokeDashoffset: 0,
          duration: 5,
          ease: "power2.inOut",
          stagger: 0.2,
        },
        "1.5",
      ).to(
        ".hero-text-path",
        { fillOpacity: 1, duration: 1.5, ease: "power2.inOut" },
        "-=4",
      );

      const asaps = document.querySelectorAll<HTMLImageElement>(
        ".asap-item, .asap-bg",
      );
      if (asaps.length > 0) {
        gsap.set(asaps, {
          "--mask-v": -40,
          webkitMaskImage:
            "linear-gradient(45deg, black 0%, black calc(var(--mask-v) * 1%), transparent calc((var(--mask-v) + 35) * 1%), transparent 100%)",
          webkitMaskRepeat: "no-repeat",
          webkitMaskSize: "100% 100%",
        });
        const maskTo = (target: string, duration: number) => ({
          "--mask-v": 120,
          duration,
          ease: "power2.out",
          onComplete: () => gsap.set(target, { webkitMaskImage: "none" }),
        });
        tl.to(".asap-item", maskTo(".asap-item", 4), "-=5.5").to(
          ".asap-bg",
          maskTo(".asap-bg", 8),
          "<",
        );

        gsap.to(".asap-item", {
          skewX: 8,
          skewY: -5,
          repeat: -1,
          yoyo: true,
          duration: 4,
          ease: "sine.inOut",
          transformOrigin: "10% 80%",
          delay: 0.5,
        });
      }

      const pOpt = {
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto" as const,
      };
      const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
        const x = clientX / window.innerWidth - 0.5;
        const y = clientY / window.innerHeight - 0.5;
        gsap.to(".parallax-depth", { x: x * 32, y: y * 18, ...pOpt });
        gsap.to(".parallax-batu-ireng", { x: x * 58, y: y * 34, ...pOpt });
      };
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef },
  );

  const imgProps = { unoptimized: true, draggable: false, priority: true };

  return (
    <section
      ref={containerRef}
      className="h-screen w-full flex bg-linear-to-b from-pink-950 to-blue-950 items-center justify-center overflow-hidden sticky top-0 -z-10"
    >
      <div className="animate-skew-wobble absolute left-[-40%] top-[-10%]  lg:left-[-15%] lg:top-[-45%] w-[120%] lg:w-[66%] opacity-10 blur-lg">
        <Image
          {...imgProps}
          src={Asap}
          alt="Asap"
          className="asap-bg w-full rotate-95 select-none"
        />
      </div>
      <div className="animate-skew-wobble absolute right-[-35%] top-0 lg:right-[-20%] lg:top-[-45%] w-[120%] lg:w-[66%] opacity-10 blur-lg">
        <Image
          {...imgProps}
          src={Asap}
          alt="Asap"
          className="asap-bg w-full rotate-45 lg:rotate-105 scale-y-[-1] select-none"
        />
      </div>
      <Image
        {...imgProps}
        src={batuIreng}
        alt="batuHitam"
        className="batu-ireng-left parallax-batu-ireng absolute bottom-0 w-[90%] lg:w-[33%] left-[-40%] lg:left-[11%] aspect-square select-none"
      />
      <Image
        {...imgProps}
        src={batuIreng}
        alt="batuHitam"
        className="batu-ireng-right parallax-batu-ireng absolute bottom-0 w-[90%] lg:w-[33%] right-[-40%] lg:right-[16%] aspect-square select-none"
      />
      <div className="parallax-depth absolute inset-0 pointer-events-none">
        <div className="portal-batu-container absolute inset-0">
          <Image
            {...imgProps}
            src={BatuLebar}
            alt="BatuLebar"
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[110vw] max-w-none h-auto select-none"
          />
          <Image
            {...imgProps}
            src={PortalNether}
            alt="portal"
            className="absolute left-1/2 -translate-x-1/2 bottom-[5%] lg:bottom-[10%] w-[70%] lg:w-[26.5%] aspect-square select-none"
          />
        </div>
        <Image
          {...imgProps}
          src={AsapPink}
          alt="Asap"
          className="asap-item absolute left-[45%] not-lg:-rotate-45 lg:right-[17%] bottom-[21%] w-[70%] lg:w-[35%] aspect-square select-none"
        />
      </div>
      <HeroTextSVG className="hero-text-item parallax-text absolute left-1/2 top-[15%] -translate-x-1/2 w-[70%] lg:w-[25%] h-auto select-none" />
    </section>
  );
};

export default Hero;
