"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import AmbientLayer from "../components/AmbientLayer";
import ClosingSection from "../components/ClosingSection";
import DivisionRail from "../components/DivisionRail";
import DivisionSection from "../components/DivisionSection";
import HomeBadge from "../components/HomeBadge";
import IntroOverlay from "../components/IntroOverlay";
import TeamHero from "../components/TeamHero";
import TeamStats from "../components/TeamStats";
import { divisions, getMembersByDivision } from "../data/teamMembers";
import { useIntroSequence } from "../hooks/useIntroSequence";
import type { Division } from "../types";

const HOME_BADGE_SCROLL_LIMIT = 80;

const TeamProfileContainer = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [activeDivision, setActiveDivision] = useState<Division | null>(null);
  const [isNearTop, setIsNearTop] = useState(true);
  const intro = useIntroSequence();

  const lenis = useLenis((instance) => {
    ScrollTrigger.update();
    setIsNearTop(instance.scroll < HOME_BADGE_SCROLL_LIMIT);
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const sections = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-division]"),
    );
    const railProgress = root.querySelector<HTMLElement>(".tp-rail-progress");

    let isMounted = true;

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            setActiveDivision((current) => {
              const division = section.dataset.division as Division;
              if (self.isActive) return division;
              return current === division ? null : current;
            });
          },
        });
      });

      gsap.fromTo(
        railProgress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, root);

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    document.fonts.ready.then(() => {
      if (isMounted) ScrollTrigger.refresh();
    });

    return () => {
      isMounted = false;
      ctx.revert();
    };
  }, []);

  const handleSelectDivision = useCallback(
    (division: Division) => {
      const target = document.getElementById(`divisi-${division}`);
      if (!target) return;

      if (lenis) {
        lenis.scrollTo(target);
        return;
      }
      target.scrollIntoView();
    },
    [lenis],
  );

  return (
    <main
      ref={rootRef}
      className="tp-root space-bg relative font-poppins text-putih"
    >
      <AmbientLayer />

      {intro.isVisible && (
        <IntroOverlay overlayRef={intro.overlayRef} onSkip={intro.skip} />
      )}

      <HomeBadge visible={!intro.isVisible && isNearTop} />
      <DivisionRail
        divisions={divisions}
        activeDivision={activeDivision}
        visible={!intro.isVisible}
        onSelect={handleSelectDivision}
      />

      <div className="relative z-10">
        <TeamHero />
        <TeamStats />

        {divisions.map((division, index) => (
          <DivisionSection
            key={division.id}
            meta={division}
            members={getMembersByDivision(division.id)}
            order={index + 1}
            total={divisions.length}
          />
        ))}

        <ClosingSection />
      </div>
    </main>
  );
};

export default TeamProfileContainer;
