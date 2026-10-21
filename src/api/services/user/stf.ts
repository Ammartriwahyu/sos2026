// api/services/user/stf.ts

import { apiClient } from "@/api/core/AxiosInstance";

export interface Caketang {
  id_caketang: string;
  nama: string;
  prodi: string;
  visi?: string;
  misi?: string;
  foto: string;
  jabatan?: "kadep" | "ketang";
  nama_prodi?: string;
  jumlah_suara?: number;
  persentase?: number;
}

export interface Sesi {
  id_sesi: string;
  jenis: "caketang" | "kadep";
  judul: string;
  prodi: string;
  nama_prodi: string;
  urutan: number;
  pengulangan: boolean;
  dibuka_at: string | null;
}

export interface StfData {
  tahap: "tertutup" | "perkenalan" | "voting" | "menunggu" | "hasil";
  berhak_memilih: boolean;
  alasan_tidak_berhak?: string;
  prodi?: string;
  nama_prodi?: string;
  sesi: Sesi | null;
  sudah_memilih: boolean;
  pilihan_saya: Caketang | null;
  kandidat: Caketang[];
  is_kadep_open?: boolean;
}

export interface PerolehanSuaraPapan {
  id_caketang: string;
  nama: string;
  prodi?: string;
  foto?: string;
  jumlah_suara: number;
  peringkat: number;
  seri: boolean;
  persentase: number;
}

export interface SesiPapanItem {
  id_sesi?: string;
  jenis: "caketang" | "kadep";
  judul: string;
  prodi?: string;
  nama_prodi?: string;
  urutan: number;
  pengulangan: boolean;
  status?: string;
  dibuka_at?: string | null;
  ditutup_at?: string | null;
  jumlah_suara: number;
  jumlah_berhak?: number;
  perolehan: PerolehanSuaraPapan[];
}

export interface ProdiPutaranPertama {
  prodi: string;
  nama_prodi: string;
  selesai: boolean;
  finalis: Caketang | null;
  cadangan: Caketang | null;
  sesi: SesiPapanItem[];
}

export interface PutaranKadepPapan {
  selesai: boolean;
  pemenang: Caketang | null;
  sesi: SesiPapanItem[];
}

export interface HasilAkhirPapan {
  sudah_final: boolean;
  kadep: Caketang | null;
  ketang: Caketang[];
}

export interface PapanHasilData {
  tahap: "tertutup" | "perkenalan" | "voting" | "menunggu" | "hasil";
  ada_hasil: boolean;
  prodi_saya?: string | null;
  putaran_pertama: ProdiPutaranPertama[];
  putaran_kadep: PutaranKadepPapan | null;
  hasil_akhir: HasilAkhirPapan;
}

export interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class StfService {
  private static instance: StfService;

  public static getInstance(): StfService {
    if (!StfService.instance) {
      StfService.instance = new StfService();
    }
    return StfService.instance;
  }

  async getStfData(signal?: AbortSignal): Promise<BackendResponse<StfData>> {
    const response = await apiClient.get("/api/stf/pemilihan", { signal });
    return response as unknown as BackendResponse<StfData>;
  }

  async voteForCaketang(id: string): Promise<BackendResponse<null>> {
    const response = await apiClient.post(`/api/stf/pemilihan`, {
      id_caketang: id,
    });
    return response as unknown as BackendResponse<null>;
  }

  async getHasilAkhir(signal?: AbortSignal): Promise<BackendResponse<unknown>> {
    const response = await apiClient.get("/api/stf/hasil", { signal });
    return response as unknown as BackendResponse<unknown>;
  }

  async getPapanHasil(
    signal?: AbortSignal,
  ): Promise<BackendResponse<PapanHasilData>> {
    const response = await apiClient.get("/api/stf/papan-hasil", { signal });
    return response as unknown as BackendResponse<PapanHasilData>;
  }
}

export const stfService = StfService.getInstance();
