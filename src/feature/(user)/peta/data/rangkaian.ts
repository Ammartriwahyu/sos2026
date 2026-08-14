import { StaticImageData } from "next/image";
import Rangkaian1A from "@/assets/assetsos26/peta/pictures/DSC_0260.webp";
import Rangkaian1B from "@/assets/assetsos26/peta/pictures/DSC_0277.webp";
import Rangkaian2A from "@/assets/assetsos26/peta/pictures/DSC_0295.webp";
import Rangkaian2B from "@/assets/assetsos26/peta/pictures/IMG_0443.webp";
import Flashback1 from "@/assets/assetsos26/peta/pictures/IMG_0652.webp";
import Flashback2 from "@/assets/assetsos26/peta/pictures/_MG_0184.webp";
import Flashback3 from "@/assets/assetsos26/peta/pictures/_MG_0358.webp";
import Flashback4 from "@/assets/assetsos26/peta/pictures/_MG_0403.webp";
import Flashback5 from "@/assets/assetsos26/peta/pictures/_MG_0459.webp";
import Flashback6 from "@/assets/assetsos26/peta/pictures/_MG_0692.webp";

export interface RangkaianItem {
  id: string;
  title: string;
  description: string;
  photos: [StaticImageData, StaticImageData];
  reverse: boolean;
}

export const rangkaianItems: RangkaianItem[] = [
  {
    id: "initiating-the-odyssey",
    title: "Initiating the Odyssey",
    description:
      "Berisi pengenalan Departemen Sistem Informasi, prospek karier di bidang IT, serta cara menyusun surat lamaran kerja yang dikemas secara interaktif melalui aktivitas dan games yang seru.",
    photos: [Rangkaian1A, Rangkaian1B],
    reverse: false,
  },
  {
    id: "initiating-the-odyssey-2",
    title: "Initiating the Odyssey",
    description:
      "Membahas pengembangan diri dan personal branding, dengan berdiskusi mahasiswa baru saling bertukar pendapat sekaligus menentukan calon pemimpin angkatan dari tiap prodi.",
    photos: [Rangkaian2A, Rangkaian2B],
    reverse: true,
  },
];

export const flashbackPhotos: StaticImageData[] = [
  Flashback1,
  Flashback2,
  Flashback3,
  Flashback4,
  Flashback5,
  Flashback6,
];
