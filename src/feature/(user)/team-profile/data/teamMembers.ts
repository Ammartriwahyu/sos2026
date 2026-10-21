import type { CSSProperties } from "react";
import PhotoViona from "@/assets/team/viona.jpg";
import PhotoSabrina from "@/assets/team/sabrina.jpg";
import PhotoJennifer from "@/assets/team/jenni.jpg";
import PhotoKeyla from "@/assets/team/keyla.jpg";
import PhotoAmmar from "@/assets/team/ammar.jpg";
import PhotoRafa from "@/assets/assetsos26/shared/picture-template.webp";
import PhotoZaki from "@/assets/assetsos26/shared/picture-template.webp";
import PhotoThoriq from "@/assets/team/thoriq.jpg";
import PhotoDaffa from "@/assets/team/daffa.jpg";
import PhotoRafi from "@/assets/team/rafi.jpg";
import PhotoGaffa from "@/assets/assetsos26/shared/picture-template.webp";
import PhotoTeam from "@/assets/team/together.jpg";
import type { Division, DivisionMeta, TeamMember } from "../types";

export const divisions: DivisionMeta[] = [
  {
    id: "uiux",
    label: "UI/UX Designer",
    tagline: "Designing The Galaxy",
    description:
      "Merancang wajah SOS 2026 dari sketsa pertama sampai piksel terakhir, supaya setiap halaman terasa ramah, rapi, dan enak dijelajahi.",
    accentVar: "var(--color-tp-uiux)",
    accentDeepVar: "var(--color-tp-uiux-deep)",
    accentSoftVar: "var(--color-tp-uiux-soft)",
  },
  {
    id: "frontend",
    label: "Front End Developer",
    tagline: "Building The Interface",
    description:
      "Menerjemahkan desain jadi halaman yang hidup: animasi, interaksi, dan tampilan yang tetap mulus di layar mana pun.",
    accentVar: "var(--color-tp-fe)",
    accentDeepVar: "var(--color-tp-fe-deep)",
    accentSoftVar: "var(--color-tp-fe-soft)",
  },
  {
    id: "backend",
    label: "Back End Developer",
    tagline: "Powering The Engine",
    description:
      "Menjaga mesin di balik layar tetap menyala: data, API, dan autentikasi yang bikin semua fitur berjalan tanpa drama.",
    accentVar: "var(--color-tp-be)",
    accentDeepVar: "var(--color-tp-be-deep)",
    accentSoftVar: "var(--color-tp-be-soft)",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "viona",
    name: "Viona",
    fullName: "Leviona Nayla Arzila",
    division: "uiux",
    photo: PhotoViona,
  },
  {
    id: "sabrina",
    name: "Sabrina",
    fullName: "Sabrina Zalfa Nuraini",
    division: "uiux",
    photo: PhotoSabrina,
  },
  {
    id: "jennifer",
    name: "Jennifer",
    fullName: "Jennifer Cintya Bella",
    division: "uiux",
    photo: PhotoJennifer,
  },
  {
    id: "keyla",
    name: "Keyla",
    fullName: "Keyla Hayu Anjani",
    division: "uiux",
    photo: PhotoKeyla,
  },
  {
    id: "ammar",
    name: "Ammar",
    fullName: "Muhammad Ammar Fakhruddin Triwahyu",
    division: "frontend",
    photo: PhotoAmmar,
  },
  {
    id: "rafa",
    name: "Rafa",
    fullName: "Sandhyka Rafasya Trisnatan",
    division: "frontend",
    photo: PhotoRafa,
  },
  {
    id: "zaki",
    name: "Zaki",
    fullName: "Muhamad Yusuf Zaki",
    division: "frontend",
    photo: PhotoZaki,
  },
  {
    id: "thoriq",
    name: "Thoriq",
    fullName: "Thoriq Farrel Muhammad",
    division: "backend",
    photo: PhotoThoriq,
  },
  {
    id: "daffa",
    name: "Daffa",
    fullName: "Daffa Athallah Nooruzzaman",
    division: "backend",
    photo: PhotoDaffa,
  },
  {
    id: "rafi",
    name: "Rafi",
    fullName: "Muhammad Rafi Rahman Habibi",
    division: "backend",
    photo: PhotoRafi,
  },
  {
    id: "gaffa",
    name: "Gaffa",
    fullName: "Gaffa Fadhlanul Rozaq",
    division: "backend",
    photo: PhotoGaffa,
  },
];

export const teamPhoto = PhotoTeam;

export const getMembersByDivision = (division: Division) =>
  teamMembers.filter((member) => member.division === division);

export const getDivisionAccentStyle = (meta: DivisionMeta) =>
  ({
    "--tp-accent": meta.accentVar,
    "--tp-accent-deep": meta.accentDeepVar,
    "--tp-accent-soft": meta.accentSoftVar,
  }) as CSSProperties;
