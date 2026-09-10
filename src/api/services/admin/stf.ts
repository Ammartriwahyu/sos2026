import { apiClient } from "@/api/core/AxiosInstance";
import { StfDetail, StfSummary } from "@/feature/(admin)/stf/type";

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
}

export const stfService = StfService.getInstance();
