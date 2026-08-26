import { apiClient } from "@/api/core/AxiosInstance";
import {
  BackendResponse,
  MahasiswaProfile,
  MahasiswaLevel,
} from "@/feature/(user)/penugasan/types";

class MahasiswaService {
  private static instance: MahasiswaService;

  public static getInstance(): MahasiswaService {
    if (!MahasiswaService.instance) {
      MahasiswaService.instance = new MahasiswaService();
    }
    return MahasiswaService.instance;
  }

  async getMyProfile(): Promise<BackendResponse<MahasiswaProfile>> {
    const response = await apiClient.get("/api/mahasiswa/");
    return response as unknown as BackendResponse<MahasiswaProfile>;
  }

  async getMyLevel(): Promise<BackendResponse<MahasiswaLevel>> {
    const response = await apiClient.get("/api/mahasiswa/level");
    return response as unknown as BackendResponse<MahasiswaLevel>;
  }
}

export const mahasiswaService = MahasiswaService.getInstance();
