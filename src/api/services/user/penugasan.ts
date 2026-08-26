import { apiClient } from "@/api/core/AxiosInstance";
import {
  BackendResponse,
  Rangkaian,
  Kuis,
  Tugas,
  KuisDetail,
  SubmissionPayload,
} from "@/feature/(user)/penugasan/types";
import { Kegiatan } from "@/feature/(user)/penilaian/types";

class PenugasanService {
  private static instance: PenugasanService;

  public static getInstance(): PenugasanService {
    if (!PenugasanService.instance) {
      PenugasanService.instance = new PenugasanService();
    }
    return PenugasanService.instance;
  }

  async getAllPenugasan(): Promise<BackendResponse<Tugas[]>> {
    const response = await apiClient.get("/api/penugasan/");
    return response as unknown as BackendResponse<Tugas[]>;
  }

  async getAllRangkaian(): Promise<BackendResponse<Rangkaian[]>> {
    const response = await apiClient.get("/api/rangkaian/");
    return response as unknown as BackendResponse<Rangkaian[]>;
  }

  async getTugasByRangkaian(
    id_rangkaian: string,
  ): Promise<BackendResponse<Tugas[]>> {
    const response = await apiClient.get(
      `/api/penugasan/user/rangkaian/${id_rangkaian}`,
    );
    return response as unknown as BackendResponse<Tugas[]>;
  }

  async getTugasDetailWithStatus(
    id_penugasan: string,
  ): Promise<BackendResponse<Tugas>> {
    const response = await apiClient.get<Tugas[]>(
      `/api/penugasan/user/${id_penugasan}`,
    );
    const singleTugas = response.data[0];
    const newResponse: BackendResponse<Tugas> = {
      ...response,
      data: singleTugas,
    };
    return newResponse;
  }

  async getAllKuis(): Promise<BackendResponse<Kuis[]>> {
    const response = await apiClient.get("/api/kuis/");
    return response as unknown as BackendResponse<Kuis[]>;
  }

  async submitTugas(
    id_penugasan: string,
    payload: SubmissionPayload,
  ): Promise<BackendResponse<null>> {
    const response = await apiClient.patch<null>(
      `/api/submission/submits/${id_penugasan}`,
      payload,
    );
    return response as unknown as BackendResponse<null>;
  }

  async getAllKegiatan(): Promise<BackendResponse<Kegiatan[]>> {
    const response = await apiClient.get("/api/rangkaian/kegiatan");
    return response as unknown as BackendResponse<Kegiatan[]>;
  }

  async getKuisDetailWithStatus(
    id_kuis: string,
  ): Promise<BackendResponse<KuisDetail>> {
    const response = await apiClient.get(`/api/kuis/${id_kuis}`);
    return response as unknown as BackendResponse<KuisDetail>;
  }
}

export const penugasanService = PenugasanService.getInstance();
