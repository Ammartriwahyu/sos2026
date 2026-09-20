export interface StfSummary {
  id_caketang: string;
  nama: string;
  prodi: string;
  jumlah_vote: string;
}

export interface StfDetail {
  id_caketang: string;
  nama: string;
  prodi: string;
  visi: string;
  misi: string;
  foto: string;
}

export interface PerolehanSuara {
  id_caketang: string;
  nama: string;
  prodi: string;
  foto: string;
  jumlah_suara: number;
  peringkat: number;
  seri: boolean;
}

export interface SesiDetail {
  id_sesi: string;
  jenis: "caketang" | "kadep";
  judul: string;
  prodi: string;
  nama_prodi: string;
  urutan: number;
  pengulangan: boolean;
  dibuka_at: string | null;
  status: "tertutup" | "dibuka" | "ditutup";
  menentukan: string;
  ditutup_at: string | null;
  jumlah_suara: number;
  jumlah_berhak: number;
  perolehan: PerolehanSuara[];
}

export interface ProdiStatus {
  prodi: string;
  nama_prodi: string;
  selesai: boolean;
  finalis: StfDetail | null;
  cadangan: StfDetail | null;
  sesi_aktif: SesiDetail | null;
}

export interface SesiPapan {
  tahap: "tertutup" | "perkenalan" | "voting" | "menunggu" | "hasil";
  prodi: ProdiStatus[];
  sesi_kadep: SesiDetail | null;
  siap_buka_kadep: boolean;
  siap_finalisasi: boolean;
  hasil_akhir: {
    sudah_final: boolean;
    kadep: StfDetail | null;
    ketang: StfDetail[];
  };
}
