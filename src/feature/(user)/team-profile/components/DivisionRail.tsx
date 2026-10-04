import React from "react";
import { cn } from "@/shared/utils/cn";
import { getDivisionAccentStyle } from "../data/teamMembers";
import type { Division, DivisionMeta } from "../types";

interface DivisionRailProps {
  divisions: DivisionMeta[];
  activeDivision: Division | null;
  visible: boolean;
  onSelect: (division: Division) => void;
}

const DivisionRail = ({
  divisions,
  activeDivision,
  visible,
  onSelect,
}: DivisionRailProps) => {
  const activeMeta = divisions.find(
    (division) => division.id === activeDivision,
  );

  return (
    <nav
      aria-label="Navigasi divisi"
      style={activeMeta ? getDivisionAccentStyle(activeMeta) : undefined}
      className={cn(
        "tp-rail fixed left-2 top-1/2 z-40 hidden -translate-y-1/2 lg:flex xl:left-5",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <span className="tp-rail-line" aria-hidden>
        <span className="tp-rail-progress" />
      </span>
      <ol className="flex flex-col">
        {divisions.map((division) => {
          const isActive = division.id === activeDivision;

          return (
            <li key={division.id} style={getDivisionAccentStyle(division)}>
              <button
                type="button"
                onClick={() => onSelect(division.id)}
                tabIndex={visible ? 0 : -1}
                aria-label={division.label}
                aria-current={isActive ? "true" : undefined}
                className="tp-rail-item flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-putih"
              >
                <span className="flex w-11 justify-center" aria-hidden>
                  <span className="tp-rail-dot" />
                </span>
                <span
                  className="tp-rail-label hidden font-poppins text-xs font-medium xl:inline"
                  aria-hidden
                >
                  {division.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DivisionRail;
