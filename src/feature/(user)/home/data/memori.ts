import type { StaticImageData } from "next/image";
import MemoriTeaser from "@/assets/assetsos26/peta/pictures/_MG_0184.webp";
import MemoriRangkaian1 from "@/assets/assetsos26/peta/pictures/rangkaian1.webp";
import MemoriRangkaian2 from "@/assets/assetsos26/peta/pictures/rangkaian2.webp";
// import MemoriRangkaian3 from "@/assets/assetsos26/peta/pictures/rangkaian3.webp";

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
    content: MemoriRangkaian1,
    title: "Rangkaian 1",
    link: "https://www.instagram.com/reel/Ddvef6rTAp2/",
  },
  {
    id: 2,
    content: MemoriRangkaian2,
    title: "Rangkaian 2",
    link: "https://www.instagram.com/reel/DetDHujhnpI/",
  },
  {
    id: 3,
    content: "COMING SOON",
    title: "Rangkaian 3",
    link: "#",
  },
  {
    id: 4,
    content: "COMING SOON",
    title: "After Movie",
    link: "#",
  },
];
