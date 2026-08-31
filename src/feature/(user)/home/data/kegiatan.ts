import type { StaticImageData } from "next/image";
import Symphonic from "@/assets/home/symphonic.webp";
import Voyage from "@/assets/home/voyage.webp";
export interface Kegiatan {
  id: number;
  title: string;
  description: string;
  img: StaticImageData;
}
export const kegiatanData = [
  {
    id: 1,
    title: "Aether of Synergy",
    description:
      "Ajang pembekalan awal bagi mahasiswa baru Departemen Sistem Informasi tahun 2026 yang dikemas sebagai perjalanan penuh harmoni, kolaborasi, dan makna. Mahasiswa baru diajak melangkah bersama dalam menumbuhkan jiwa kepemimpinan, membangun koneksi, dan mempersiapkan diri menghadapi dinamika kehidupan perkuliahan.",
    img: Symphonic,
  },
  {
    id: 2,
    title: "Anchoring the Axis",
    description:
      "Pemilihan calon ketua angkatan seluruh program studi di Departemen Sistem Informasi tahun 2026. Setiap calon ketua diposisikan sebagai seorang petualang yang menjalani perjalanan penuh tantangan dan pembelajaran, dengan misi untuk menyatukan ide, membangun kolaborasi, dan membawa perubahan positif bagi angkatannya",
    img: Voyage,
  },
];
