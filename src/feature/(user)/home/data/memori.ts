import type { StaticImageData } from "next/image";

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
    content: "https://img.youtube.com/vi/Z8zAZRCwF_E/maxresdefault.jpg",
    title: "After Movie",
    link: "https://youtu.be/Z8zAZRCwF_E?si=Uiriy7za2kHuDFwI",
  },
  {
    id: 2,
    content: "Launching Soon 2",
    title: "Soon",
    link: "#",
  },
  {
    id: 3,
    content: "launching soon 3",
    title: "Soon",
    link: "#",
  },
  {
    id: 4,
    content: "launching soon 4",
    title: "Soon",
    link: "#",
  },
];
