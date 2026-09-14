// api/services/user/stf.ts

import { apiClient } from "@/api/core/AxiosInstance";

export interface Caketang {
  id_caketang: string;
  nama: string;
  prodi: string;
  visi: string;
  misi: string;
  foto: string;
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
  prodi: string;
  nama_prodi: string;
  sesi: Sesi | null;
  sudah_memilih: boolean;
  pilihan_saya: Caketang | null;
  kandidat: Caketang[];
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

  async getStfData(): Promise<BackendResponse<StfData>> {
    const response = await apiClient.get("/api/stf/pemilihan");
    return response as unknown as BackendResponse<StfData>;
  }

  async voteForCaketang(id: string): Promise<BackendResponse<null>> {
    const response = await apiClient.post(`/api/stf/pemilihan`, {
      id_caketang: id,
    });
    return response as unknown as BackendResponse<null>;
  }

  async getHasilAkhir(): Promise<BackendResponse<unknown>> {
    const response = await apiClient.get("/api/stf/hasil");
    return response as unknown as BackendResponse<unknown>;
  }
}

export const stfService = StfService.getInstance();
