// src/feature/(user)/penugasan/types/index.ts

export interface BackendResponse<T> {
  success: boolean; // Disesuaikan dengan ApiResponse
  message: string;
  data: T;
}

interface Pagination {
  page: number;
  limit: number;
  total_record: number;
  total_pages: number;
}

export interface Submission {
  id: string;
  nim: string;
  assignment_id: string;
  student_name: string;
  distrik: string;
  kelompok: string;
  status: "belum tersubmit" | "tersubmit" | "terlambat" | "dinilai";
  drive_link: string;
  submission_date: string;
  score: number;
}

export interface PaginatedSubmission {
  pagination: Pagination;
  submissions: Submission[];
}

interface Pjl {
  nim: string;
  nama: string;
  line: string;
}
interface Distrik {
  id_distrik: string;
  nama_distrik: string;
  list_pjl: Pjl[];
}
interface Kelompok {
  id_kelompok: string;
  nama_kelompok: string;
  distrik: Distrik;
}
export interface MahasiswaProfile {
  nim: string;
  nama: string;
  email: string;
  fakultas: string;
  prodi: string;
  exp: number;
  telp: string;
  line: string;
  agama: string;
  kelamin: string;
  golongan_darah: string;
  riwayat_penyakit: string;
  alergi_obat: string;
  alergi_makanan: string;
  kelompok: Kelompok;
}

export interface MahasiswaLevel {
  level: number;
  max_level: number;
}

export interface Rangkaian {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}

export interface Kuis {
  id_kuis: string;
  nama_kuis: string;
  tenggat_kuis: string;
  status_kuis?: "Terlambat" | "Terlewat" | "Selesai" | "Belum Mulai" | string;
  deskripsi_kuis?: string;
  durasi_kuis?: string;
  jumlah_soal?: number;
  skor?: number;
  score?: number;
  total_soal?: number;
  total_pertanyaan?: number;
}

export interface KuisDetail {
  id_kuis: string;
  nama_kuis: string;
  deskripsi_kuis: string;
  kesempatan: number;
  tenggat_kuis: string;
  data_rangkaian: Rangkaian;
  durasi_kuis: string;
  status_kuis: "Terlambat" | "Terlewat" | "Selesai" | "Belum Mulai";
  jumlah_soal?: number;
  skor?: number;
  score?: number;
  total_soal?: number;
  total_pertanyaan?: number;
}

export interface Tugas {
  id_penugasan: string;
  id_rangkaian?: string;
  judul: string;
  deskripsi: string;
  tenggat: string;
  link_pengumpulan: string;
  file?: string;
  is_visible?: string;
  icon?: string;
  created_at?: string;
  rangkaian?: Rangkaian;
  status?: "Selesai" | "Belum Selesai" | string;
}

export interface SubmissionPayload {
  drive_link: string;
}
