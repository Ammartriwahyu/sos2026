import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";

export interface Presensi {
  kode_id: string;
  kode: string;
  rangkaian_nama: string;
  tanggal: string;
  status: "aktif" | "non-aktif";
}

export interface PresensiSummary {
  kode: string;
  sesi: string;
  rangkaian_id: string;
  presensi_id: string | null;
  status: "aktif" | "non-aktif";
}

export interface PresensiMahasiswaSummary {
  nama: string | null;
  nim: string;
  status: "hadir" | "izin" | "tidak-hadir";
}

export interface presensiInfo {
  presensi_id: string;
  rangkaian_id: string;
  rangkaian_nama: string;
  kode: string;
  sesi: string;
  start_at: string;
  end_at: string;
  status: "aktif" | "non-aktif";
}

export interface PresensiMahasiswaDetail {
  nim: string;
  nama: string;
  presensi_at: string;
  status: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total_record: number;
  total_pages: number;
  from: number;
  to: number;
  next: boolean;
  previous: boolean;
}

export interface PresensiMahasiswaListFilters {
  nama?: string;
  page?: number;
  pageSize?: number;
  distrik?: string | null;
  kelompok?: string | null;
}

export interface MahasiswaListResponse {
  mahasiswa_list: PresensiMahasiswaDetail[];
  pagination: Pagination;
}

export interface PresensiDetailData {
  presensi_info: presensiInfo;
}

interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

interface CacheItem<T> {
  data: ApiResponse<T>;
  expiry: number;
}

class PresensiService {
  private static instance: PresensiService;
  private cache = new Map<
    string | number,
    CacheItem<
      Presensi | Presensi[] | PresensiDetailData | MahasiswaListResponse
    >
  >();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): PresensiService {
    if (!PresensiService.instance) {
      PresensiService.instance = new PresensiService();
    }
    return PresensiService.instance;
  }

  async getAllPresensi(): Promise<ApiResponse<Presensi[]>> {
    const cacheKey = "all_presensi";
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<Presensi[]>;
    }

    const response = await apiClient.get("/api/presensi/");
    const responseData = response as unknown as BackendResponse<
      Presensi[] | null
    >;
    const apiResponse: ApiResponse<Presensi[]> = {
      success: responseData.status_code === 200,
      message: responseData.message,
      data: responseData.data ?? [],
    };
    this.cache.set(cacheKey, {
      data: apiResponse,
      expiry: Date.now() + this.cacheDuration,
    });

    return apiResponse;
  }

  async getPresensiDetail(
    kodeId: string,
  ): Promise<ApiResponse<PresensiDetailData>> {
    const cacheKey = `presensi_info_${kodeId}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<PresensiDetailData>;
    }

    try {
      const response = await apiClient.get(`/api/presensi/${kodeId}`);
      const responseData =
        response as unknown as BackendResponse<PresensiDetailData>;
      const apiResponse: ApiResponse<PresensiDetailData> = {
        success: responseData.status_code === 200,
        message: responseData.message,
        data: responseData.data,
      };
      this.cache.set(cacheKey, {
        data: apiResponse,
        expiry: Date.now() + this.cacheDuration,
      });

      return apiResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil presensi by ID ERROR: ${error.message}`,
        );
      }
      throw new Error(
        "Terjadi kesalahan yang tidak diketahui saat mengambil data by ID.",
      );
    }
  }

  async getPresensiMahasiswaList(
    kodeId: string,
    filters?: PresensiMahasiswaListFilters,
  ): Promise<ApiResponse<MahasiswaListResponse>> {
    const params = new URLSearchParams();
    if (filters?.nama) {
      params.append("nama", filters.nama);
    }
    if (filters?.page) {
      params.append("page", String(filters.page));
    }
    if (filters?.pageSize) {
      params.append("pageSize", String(filters.pageSize));
    }
    if (filters?.distrik) {
      params.append("distrik", filters.distrik);
    }
    if (filters?.kelompok) {
      params.append("kelompok", filters.kelompok);
    }

    const queryString = params.toString();
    const apiUrl = `/api/presensi/${kodeId}${
      queryString ? `?${queryString}` : ""
    }`;

    const cacheKey = `mahasiswa_list_${kodeId}_${queryString}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<MahasiswaListResponse>;
    }

    try {
      const response = await apiClient.get(apiUrl);
      const responseData = response as unknown as BackendResponse<{
        presensi_info: presensiInfo;
        mahasiswa_list: PresensiMahasiswaDetail[] | null;
        pagination: Pagination | null;
      } | null>;

      const apiResponseData: MahasiswaListResponse = {
        mahasiswa_list: responseData.data?.mahasiswa_list ?? [],
        pagination: responseData.data?.pagination ?? {
          page: filters?.page ?? 1,
          limit: filters?.pageSize ?? 10,
          total_record: 0,
          total_pages: 0,
          from: 0,
          to: 0,
          next: false,
          previous: false,
        },
      };

      const apiResponse: ApiResponse<MahasiswaListResponse> = {
        success: responseData.status_code === 200,
        message: responseData.message,
        data: apiResponseData,
      };

      this.cache.set(cacheKey, {
        data: apiResponse,
        expiry: Date.now() + this.cacheDuration,
      });

      return apiResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil presensi by ID ERROR: ${error.message}`,
        );
      }
      throw new Error(
        "Terjadi kesalahan yang tidak diketahui saat mengambil data by ID.",
      );
    }
  }

  async createPresensi(data: PresensiSummary): Promise<BackendResponse<null>> {
    this.cache.delete("all_presensi");

    const response = await apiClient.post("/api/presensi/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response as unknown as BackendResponse<null>;
  }

  async updatePresensi(
    id: string,
    data: PresensiSummary,
  ): Promise<BackendResponse<null>> {
    this.cache.delete("all_presensi");
    this.cache.delete(`presensi_info_${id}`);

    const response = await apiClient.patch(`/api/presensi/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response as unknown as BackendResponse<null>;
  }

  async updateMahasiswaPresensi(
    presensi_id: string,
    data: PresensiMahasiswaSummary,
  ): Promise<BackendResponse<null>> {
    this.cache.delete(`presensi_info_${presensi_id}`);
    this.cache.forEach((_value, key) => {
      if (
        typeof key === "string" &&
        key.startsWith(`mahasiswa_list_${presensi_id}_`)
      ) {
        this.cache.delete(key);
      }
    });

    const response = await apiClient.patch(
      `/api/presensi/${presensi_id}/mahasiswa`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response as unknown as BackendResponse<null>;
  }
}

export const presensiService = PresensiService.getInstance();
