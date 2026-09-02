// src/feature/(admin)/penilaian/types.ts

export interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  pagination: {
    page: number;
    limit: number;
    total_record: number;
    total_pages: number;
  };
  records: T[];
}

export interface Rangkaian {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}

export interface Kelompok {
  id_kelompok: string;
  nama_kelompok: string;
}

export interface Pjl {
  nim: string;
  nama: string;
  line: string;
}

export interface Distrik {
  id_distrik: string;
  nama_distrik: string;
  order?: number;
  list_pjl: Pjl[];
  list_kelompok: Kelompok[];
}

export interface RekapPenilaianItem {
  nim: string;
  nama: string;
  pelanggaran: number;
  nilai_akhir: number;
  status: "lulus" | "tidak_lulus" | string;
}

export interface Maba {
  nama: string;
  nim: string;
  prodi: string;
  line: string;
  telp: string;
  kelompok: string;
}

export interface PenilaianTugas {
  nama_penilaian: string;
  nilai: number;
}

export interface DetailPenilaianMaba {
  nim: string;
  nama_mahasiswa: string;
  penilaian: PenilaianTugas[];
  keaktifan: number;
  pelanggaran: (PelanggaranItem & { id_pelanggaran: string })[] | null;
}

export interface PelanggaranItem {
  nama: string;
  kategori: "ringan" | "sedang" | "berat" | "";
}

export interface PayloadPelanggaran {
  nim: string;
  rangkaian_id: string;
  pelanggaran: PelanggaranItem[];
}

export interface PayloadKeaktifan {
  keaktifan: number;
}

export interface PenilaianUpdatePayload {
  keaktifan: number;
  pelanggaran: PelanggaranItem[];
}
