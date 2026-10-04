import type { StaticImageData } from "next/image";

export type Division = "uiux" | "frontend" | "backend";

export interface TeamMember {
  id: string;
  name: string;
  fullName: string;
  division: Division;
  photo: StaticImageData;
}

export interface DivisionMeta {
  id: Division;
  label: string;
  tagline: string;
  description: string;
  accentVar: string;
  accentDeepVar: string;
  accentSoftVar: string;
}
