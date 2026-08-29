import type { StaticImageData } from "next/image";
import Rangkaian1 from "@/assets/assetsos26/peta/pictures/DSC_0277.webp";
import Rangkaian2 from "@/assets/assetsos26/peta/pictures/DSC_0295.webp";
import Rangkaian3 from "@/assets/assetsos26/peta/pictures/IMG_0652.webp";

export interface Rangkaian {
  id: number;
  title: string;
  description: string;
  img: StaticImageData;
}

export const rangkaianData: Rangkaian[] = [
  {
    id: 1,
    title: "Mapping the Horizon",
    description:
      "Merupakan rangkaian awal yang menjadi wadah bagi mahasiswa Sistem Informasi angkatan 2026 untuk mengenal dan memahami lingkungan akademik serta kehidupan di dalamnya. Rangkaian ini...... (selengkapnya)",
    img: Rangkaian1,
  },
  {
    id: 2,
    title: "Discovering the Core",
    description:
      "Merupakan rangkaian yang berfokus pada proses mengenali dan menggali potensi, karakter, serta nilai yang dimiliki oleh setiap individu. Rangkaian ini menjadi ruang untuk memahami...... (selengkapnya)",
    img: Rangkaian2,
  },
  {
    id: 3,
    title: "Beaming the Crest",
    description:
      "Merupakan rangkaian yang menjadi wadah dalam proses pemilihan calon ketua angkatan dan calon ketua departemen bagi seluruh mahasiswa Sistem Informasi angkatan 2026. Rangkaian ini...... (selengkapnya)",
    img: Rangkaian3,
  },
];
