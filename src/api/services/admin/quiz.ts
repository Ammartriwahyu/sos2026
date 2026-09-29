import { apiClient } from "@/api/core/AxiosInstance";

interface BackendResponse<T> {
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
    from: number;
    to: number;
    next: boolean;
    previous: boolean;
  };
  records: T[];
}
export interface QuizSubmission {
  nama: string;
  nim: string;
  status: string;
  score: number;
  waktu_jawab: string;
}
interface Rangkaian {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}
export interface pertanyaan {
  id_pertanyaan: string;
  judul_pertanyaan: string;
  pilihan_a: string;
  pilihan_b: string;
  pilihan_c: string;
  pilihan_d: string;
  pilihan_e: string;
  jawaban_benar: string;
  durasi_pertanyaan: number;
}
export interface UpdateQuizPayload {
  kuis_nama: string;
  kuis_deskripsi: string;
  tenggat: string;
  kesempatan: number;
  id_rangkaian: string;
  durasi_kuis: string;
  is_visible: string;
  pertanyaan_list: pertanyaan[];
}
export interface DetailQuiz extends Quiz {
  list_pertanyaan: pertanyaan[];
  is_visible: string;
}
export interface Quiz {
  id_kuis: string;
  nama_kuis: string;
  deskripsi_kuis: string;
  kesempatan: number;
  data_rangkaian: Rangkaian;
  tenggat_kuis: string;
  durasi_kuis: string;
  is_visible: string;
  total_soal?: number;
}
export interface CreateQuizPayload {
  kuis_nama: string;
  tenggat: string;
  kuis_deskripsi: string;
  kesempatan: number;
  id_rangkaian: string;
  durasi_kuis: string;
  is_visible: string;
}
export interface ManualScorePayload {
  nim: string;
  jawaban_benar: number;
}

class KuisService {
  private static instance: KuisService;
  private cache = new Map<string, { data: unknown; expiry: number }>();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): KuisService {
    if (!KuisService.instance) {
      KuisService.instance = new KuisService();
    }
    return KuisService.instance;
  }

  async deleteKuis(kuisId: string): Promise<BackendResponse<null>> {
    this.cache.delete("all_kuis");
    this.cache.delete(`kuis_status_${kuisId}`);

    const response = await apiClient.delete(`/api/kuis/sos/admin/${kuisId}`);
    return response as unknown as BackendResponse<null>;
  }

  async updateKuis(
    kuisId: string,
    data: UpdateQuizPayload,
  ): Promise<BackendResponse<null>> {
    this.cache.delete("all_kuis");
    this.cache.delete(`kuis_status_${kuisId}`);

    const response = await apiClient.patch(
      `/api/kuis/sos/admin/${kuisId}`,
      data,
    );

    return response as unknown as BackendResponse<null>;
  }

  async getAllKuis(): Promise<BackendResponse<Quiz[]>> {
    const cacheKey = "all_kuis";
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<Quiz[]>;
    }

    const response = await apiClient.get("/api/kuis/sos/admin/");
    const responseData = response as unknown as BackendResponse<Quiz[]>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }

  async createKuis(
    data: CreateQuizPayload,
  ): Promise<BackendResponse<CreateQuizPayload>> {
    this.cache.delete("all_kuis");

    const response = await apiClient.post(`/api/kuis/sos/admin/`, data);
    return response as unknown as BackendResponse<CreateQuizPayload>;
  }

  async getDetailKuisById(id: string): Promise<BackendResponse<DetailQuiz>> {
    const cacheKey = `kuis_status_${id}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<DetailQuiz>;
    }

    const response = await apiClient.get(`/api/kuis/sos/admin/${id}`);
    const responseData = response as unknown as BackendResponse<DetailQuiz>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }

  async getQuizSubmissions(
    kuisId: string,
    id_kelompok?: string | null,
    id_distrik?: string | null,
  ): Promise<BackendResponse<QuizSubmission[]>> {
    const params = new URLSearchParams();
    if (id_kelompok) {
      params.append("id_kelompok", id_kelompok);
    }
    if (id_distrik) {
      params.append("id_distrik", id_distrik);
    }

    const queryString = params.toString();
    let apiUrl = `/api/kuis/sos/admin/${kuisId}/maba`;
    if (queryString) {
      apiUrl += `?${queryString}`;
    }

    const response = await apiClient.get(apiUrl);
    return response as unknown as BackendResponse<QuizSubmission[]>;
  }

  async updateManualScore(
    kuisId: string,
    data: ManualScorePayload,
  ): Promise<BackendResponse<null>> {
    const response = await apiClient.post(
      `/api/kuis/sos/admin/${kuisId}/nilai`,
      data,
    );
    return response as unknown as BackendResponse<null>;
  }
}

export const kuisService = KuisService.getInstance();
