import type { StaticImageData } from "next/image";
import MemoriTeaser from "@/assets/assetsos26/peta/pictures/_MG_0184.webp";
import MemoriRangkaian1 from "@/assets/assetsos26/peta/pictures/_MG_0403.webp";
import MemoriRangkaian2 from "@/assets/assetsos26/peta/pictures/_MG_0692.webp";

export type Content = StaticImageData | string;

export interface Memori {
  id: number;
  content: Content;
  title: string;
  link: string;
}

export const memoriData: Memori[] = [
  {
    id: 1,
    content: MemoriTeaser,
    title: "Teaser",
    link: "#",
  },
  {
    id: 2,
    content: MemoriRangkaian1,
    title: "Rangkaian 1",
    link: "#",
  },
  {
    id: 3,
    content: MemoriRangkaian2,
    title: "Rangkaian 2",
    link: "#",
  },
  {
    id: 4,
    content: "https://img.youtube.com/vi/Z8zAZRCwF_E/maxresdefault.jpg",
    title: "After Movie",
    link: "https://youtu.be/Z8zAZRCwF_E?si=Uiriy7za2kHuDFwI",
  },
];
