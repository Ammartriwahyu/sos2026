import { StaticImageData } from "next/image";
import PictureTemplate from "@/assets/assetsos26/shared/picture-template.webp";

export interface RangkaianItem {
  id: string;
  title: string;
  description: string;
  /** Dua foto yang ditumpuk seperti kartu. */
  photos: [StaticImageData, StaticImageData];
  /** true = teks di kanan, foto di kiri (baris kedua). */
  reverse: boolean;
}

// NOTE: foto sementara memakai picture-template.webp; ganti saat foto final tersedia.
export const rangkaianItems: RangkaianItem[] = [
  {
    id: "initiating-the-odyssey",
    title: "Initiating the Odyssey",
    description:
      "Berisi pengenalan Departemen Sistem Informasi, prospek karier di bidang IT, serta cara menyusun surat lamaran kerja yang dikemas secara interaktif melalui aktivitas dan games yang seru.",
    photos: [PictureTemplate, PictureTemplate],
    reverse: false,
  },
  {
    id: "initiating-the-odyssey-2",
    title: "Initiating the Odyssey",
    description:
      "Membahas pengembangan diri dan personal branding, dengan berdiskusi mahasiswa baru saling bertukar pendapat sekaligus menentukan calon pemimpin angkatan dari tiap prodi.",
    photos: [PictureTemplate, PictureTemplate],
    reverse: true,
  },
];

// Foto untuk carousel "Kilas Dibalik SOS". Ganti saat foto final tersedia.
export const flashbackPhotos: StaticImageData[] = Array.from(
  { length: 6 },
  () => PictureTemplate,
);
