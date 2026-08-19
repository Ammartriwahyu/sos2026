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
    content: "coming soon",
    title: "Teaser",
    link: "#",
  },
  {
    id: 2,
    content: "coming soon",
    title: "Rangkaian 1",
    link: "#",
  },
  {
    id: 3,
    content: "coming soon",
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
