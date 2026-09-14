import { apiClient } from "@/api/core/AxiosInstance";
import {
  StfDetail,
  StfSummary,
  SesiPapan,
  SesiDetail,
} from "@/feature/(admin)/stf/type";

interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class StfService {
  private static instance: StfService;
  private cache = new Map<string, { data: unknown; expiry: number }>();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): StfService {
    if (!StfService.instance) {
      StfService.instance = new StfService();
    }
    return StfService.instance;
  }

  async getAllCaketang(): Promise<BackendResponse<StfSummary[]>> {
    const cacheKey = "all_caketang";
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<StfSummary[]>;
    }
    const response = await apiClient.get("/api/stf/");
    const responseData = response as unknown as BackendResponse<StfSummary[]>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });
    return responseData;
  }

  async getCaketangById(id: string): Promise<BackendResponse<StfDetail>> {
    const response = await apiClient.get(`/api/stf/${id}`);
    return response as unknown as BackendResponse<StfDetail>;
  }

  async createCaketang(data: FormData): Promise<BackendResponse<null>> {
    this.cache.delete("all_caketang");
    const response = await apiClient.post("/api/stf", data);
    return response as unknown as BackendResponse<null>;
  }

  async updateCaketang(
    id: string,
    data: FormData,
  ): Promise<BackendResponse<null>> {
    this.cache.delete("all_caketang");
    const response = await apiClient.patch(`/api/stf/${id}`, data);
    return response as unknown as BackendResponse<null>;
  }

  async deleteCaketang(id: string): Promise<BackendResponse<null>> {
    this.cache.delete("all_caketang");
    const response = await apiClient.delete(`/api/stf/${id}`);
    return response as unknown as BackendResponse<null>;
  }

  // --- Kendali STF Endpoints ---

  async getSesiPapan(): Promise<BackendResponse<SesiPapan>> {
    const response = await apiClient.get("/api/stf/sesi/papan");
    return response as unknown as BackendResponse<SesiPapan>;
  }

  async setTahap(tahap: string): Promise<BackendResponse<{ tahap: string }>> {
    const response = await apiClient.post("/api/stf/tahap", { tahap });
    return response as unknown as BackendResponse<{ tahap: string }>;
  }

  async siapkanPutaranPertama(): Promise<BackendResponse<SesiDetail[]>> {
    const response = await apiClient.post("/api/stf/sesi/putaran-pertama");
    return response as unknown as BackendResponse<SesiDetail[]>;
  }

  async bukaSesi(idSesi: string): Promise<BackendResponse<null>> {
    const response = await apiClient.post(`/api/stf/sesi/${idSesi}/buka`);
    return response as unknown as BackendResponse<null>;
  }

  async tutupSesi(idSesi: string): Promise<BackendResponse<unknown>> {
    const response = await apiClient.post(`/api/stf/sesi/${idSesi}/tutup`);
    return response as unknown as BackendResponse<unknown>;
  }

  async siapkanSesiKadep(): Promise<BackendResponse<unknown>> {
    const response = await apiClient.post("/api/stf/sesi/kadep");
    return response as unknown as BackendResponse<unknown>;
  }

  async finalisasi(): Promise<BackendResponse<unknown>> {
    const response = await apiClient.post("/api/stf/sesi/finalisasi");
    return response as unknown as BackendResponse<unknown>;
  }
}

export const stfService = StfService.getInstance();
