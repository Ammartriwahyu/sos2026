"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function ScrollProvider({ children }: { children: ReactNode }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
