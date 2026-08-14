import { StaticImageData } from "next/image";

import LogoSI from "@/assets/assetsos26/shared/logo-si.png";
import LogoTI from "@/assets/assetsos26/shared/logo-ti.png";
import LogoPTI from "@/assets/assetsos26/shared/logo-pti.png";

export interface Prodi {
  id: string;
  nama: string;
  logo: StaticImageData;
  deskripsi: string;
  prospek: string[];
  shortName: string;
}

export const prodiData: Prodi[] = [
  {
    id: "sistem_informasi",
    nama: "Sistem Informasi",
    logo: LogoSI,
    shortName: "SI",
    deskripsi:
      "Berfokus pada peningkatan kemampuan manajerial teknologi informasi dan komunikasi serta sumber daya manusia dimana diharapkan akan menciptakan sebuah sistem yang mampu mengakomodir akan kebutuhan informasi yang berkembang pesat.",
    prospek: [
      "Database dan e-Business",
      "System Design",
      "Web Developers",
      "Entrepreneur IT Business",
      "System Analyst",
      "Database Administrator",
      "Programmer Analyst",
      "Project Manager",
    ],
  },
  {
    id: "teknologi_informasi",
    nama: "Teknologi Informasi",
    shortName: "TI",
    logo: LogoTI,
    deskripsi:
      "Berfokus pada pengembangan keterampilan teknis dan manajerial di bidang teknologi informasi untuk menciptakan solusi digital yang inovatif dan sesuai kebutuhan industri modern. Mengasah kemampuan dalam membangun perangkat lunak hingga mampu menghadirkan sistem yang efektif dan berdaya saing.",
    prospek: [
      "Software Developer",
      "Network Engineer",
      "System Analyst",
      "Database Administrator",
      "Cyber Security Analyst",
      "Cloud Computing Specialist",
      "Web Developer",
      "IT Consultant",
    ],
  },
  {
    id: "pendidikan_teknologi_informasi",
    nama: "Pendidikan Teknologi Informasi",
    shortName: "PTI",
    logo: LogoPTI,
    deskripsi:
      "Berfokus pada pengembangan keahlian dalam memanfaatkan teknologi informasi untuk mendukung proses pembelajaran yang kreatif dan inovatif. Mendorong pemanfaatan media digital, platform pembelajaran daring, serta metode pengajaran inovatif guna memperkuat transformasi pendidikan berbasis teknologi.",
    prospek: [
      "Guru TIK",
      "Instruktur Pelatihan IT",
      "Pengembangan Media Pembelajaran Digital",
      "Dosen Pendidikan TI",
      "LMS Administrator",
      "Konsultan Teknologi Pendidikan",
      "IT Support Pendidikan",
      "Pengembang e-Learning",
    ],
  },
];
