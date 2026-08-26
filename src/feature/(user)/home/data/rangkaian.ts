import type { StaticImageData } from "next/image";
import Rangkaian1 from "@/assets/home/rangkaian-1.png";
import Rangkaian2 from "@/assets/home/rangkaian-2.png";
export interface Rangkaian {
  id: number;
  title: string;
  description: string;
  img: StaticImageData;
}
export const rangkaianData = [
  {
    id: 1,
    title: "Initiating The Odyssey",
    description:
      "Pengenalan Departemen Sistem Informasi, prospek karier di bidang IT, serta cara menyusun surat lamaran kerja yang dikemas secara interaktif.",
    img: Rangkaian1,
  },
  {
    id: 2,
    title: "Navigating the Currents",
    description:
      "Pengenalan Departemen Sistem Informasi, prospek karier di bidang IT, serta cara menyusun surat lamaran kerja yang dikemas secara interaktif.",
    img: Rangkaian2,
  },
];
