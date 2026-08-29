import { StaticImageData } from "next/image";
import Rangkaian1A from "@/assets/assetsos26/peta/pictures/DSC_0260.webp";
import Rangkaian1B from "@/assets/assetsos26/peta/pictures/DSC_0277.webp";
import Rangkaian2A from "@/assets/assetsos26/peta/pictures/DSC_0295.webp";
import Rangkaian2B from "@/assets/assetsos26/peta/pictures/IMG_0443.webp";
import Rangkaian3A from "@/assets/assetsos26/peta/pictures/IMG_0652.webp";
import Rangkaian3B from "@/assets/assetsos26/peta/pictures/_MG_0459.webp";
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
    id: "mapping-the-horizon",
    title: "Mapping the Horizon",
    description:
      "Merupakan rangkaian awal yang menjadi wadah bagi mahasiswa Sistem Informasi angkatan 2026 untuk mengenal dan memahami lingkungan akademik serta kehidupan di dalamnya. Rangkaian ini memberikan gambaran mengenai berbagai aspek yang akan menjadi bagian dari perjalanan mahasiswa, sehingga setiap individu dapat memiliki bekal pemahaman yang cukup untuk mulai beradaptasi dan menentukan langkah dalam menghadapi kehidupan perkuliahan.",
    photos: [Rangkaian1A, Rangkaian1B],
    reverse: false,
  },
  {
    id: "discovering-the-core",
    title: "Discovering the Core",
    description:
      "Merupakan rangkaian yang berfokus pada proses mengenali dan menggali potensi, karakter, serta nilai yang dimiliki oleh setiap individu. Rangkaian ini menjadi ruang untuk memahami diri secara lebih mendalam sekaligus membuka pandangan mengenai berbagai kemungkinan yang dapat dikembangkan. Melalui proses tersebut, mahasiswa diharapkan mampu menemukan kekuatan dalam dirinya sebagai bekal untuk menentukan arah dan membangun langkah di masa mendatang.",
    photos: [Rangkaian2A, Rangkaian2B],
    reverse: true,
  },
  {
    id: "beaming-the-crest",
    title: "Beaming the Crest",
    description:
      "Merupakan rangkaian yang menjadi wadah dalam proses pemilihan calon ketua angkatan dan calon ketua departemen bagi seluruh mahasiswa Sistem Informasi angkatan 2026. Rangkaian ini menjadi bagian dari proses pembentukan kepemimpinan dan identitas angkatan melalui hadirnya individu-individu yang dipercaya untuk membawa aspirasi bersama. Pada akhirnya, rangkaian ini diharapkan dapat menjadi awal terbentuknya sosok pemimpin dan representasi yang mampu membawa angkatan 2026 melangkah dengan satu tujuan.",
    photos: [Rangkaian3A, Rangkaian3B],
    reverse: false,
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
