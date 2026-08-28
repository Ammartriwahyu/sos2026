import { apiClient } from "@/api/core/AxiosInstance";
import { AnggotaMaba, Distrik } from "@/feature/(admin)/distrik/type";

interface PaginatedData {
  records: AnggotaMaba[];
  pagination: object;
}

interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class DistrikService {
  private static instance: DistrikService;
  private cache = new Map<string, { data: unknown; expiry: number }>();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): DistrikService {
    if (!DistrikService.instance) {
      DistrikService.instance = new DistrikService();
    }
    return DistrikService.instance;
  }

  async getAllDistricts(): Promise<BackendResponse<Distrik[]>> {
    const cacheKey = "all_districts";
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<Distrik[]>;
    }
    const response = await apiClient.get("/api/distrik/");
    const responseData = response as unknown as BackendResponse<Distrik[]>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });
    return responseData;
  }

  async getDistrictById(id: string): Promise<BackendResponse<Distrik>> {
    const cacheKey = `distrik_${id}`;
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<Distrik>;
    }
    const response = await apiClient.get(`/api/distrik/${id}`);
    const responseData = response as unknown as BackendResponse<Distrik>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });
    return responseData;
  }

  async getAnggotaByDistrictId(
    id: string,
    params: { page: number; limit: number; id_kelompok?: string },
  ): Promise<BackendResponse<PaginatedData>> {
    const cacheKey = `anggota_distrik_${id}_kelompok_${params.id_kelompok || "all"}_page_${params.page}`;
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<PaginatedData>;
    }
    const response = await apiClient.get(`/api/distrik/${id}/maba`, {
      params,
    });
    const responseData = response as unknown as BackendResponse<PaginatedData>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });
    return responseData;
  }
}

export const distrikService = DistrikService.getInstance();
