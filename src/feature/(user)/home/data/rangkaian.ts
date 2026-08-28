import type { StaticImageData } from "next/image";
import Rangkaian1 from "@/assets/assetsos26/peta/pictures/DSC_0277.webp";
import Rangkaian2 from "@/assets/assetsos26/peta/pictures/DSC_0295.webp";
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
      "Membahas pengembangan diri dan personal branding, dengan berdiskusi mahasiswa baru saling bertukar pendapat sekaligus menentukan calon pemimpin angkatan dari tiap prodi.",
    img: Rangkaian2,
  },
];
