import { apiClient } from "@/api/core/AxiosInstance";
export interface QuizResult {
  score: number;
  jawaban_benar: number;
  total_pertanyaan: number;
}
interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

interface Rangkaian {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}

export interface Quiz {
  id_kuis: string;
  nama_kuis: string;
  deskripsi_kuis: string;
  kesempatan: number;
  data_rangkaian: Rangkaian;
  tenggat_kuis: string;
  durasi_kuis: string;
  status_kuis: string;
  score?: number;
  jawaban_benar?: number;
  total_pertanyaan?: number;
  total_soal?: number;
}

export interface Pilihan {
  label: string;
  value: string;
}

export interface Pertanyaan {
  id_pertanyaan: string;
  pertanyaan: string;
  pilihan: Pilihan[];
  durasi: number;
}

export interface QuizSoal {
  id_kuis: string;
  nama_kuis: string;
  tenggat_kuis: string;
  durasi_kuis: string;
  list_pertanyaan: Pertanyaan[];
}
export interface JawabanPayload {
  id_pertanyaan: string;
  jawaban: string;
}

export interface SubmitKuisPayload {
  pertanyaan_list: JawabanPayload[];
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

  async getDetailKuisById(id: string): Promise<BackendResponse<Quiz>> {
    const cacheKey = `kuis_detail_${id}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<Quiz>;
    }

    const response = await apiClient.get(`/api/kuis/${id}`);
    const responseData = response as unknown as BackendResponse<Quiz>;

    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }

  async getSoalKuisById(id: string): Promise<BackendResponse<QuizSoal>> {
    const cacheKey = `kuis_soal_${id}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<QuizSoal>;
    }

    const response = await apiClient.get(`/api/kuis/${id}/soal`);
    const responseData = response as unknown as BackendResponse<QuizSoal>;

    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }

  async submitJawabanKuis(
    id_kuis: string,
    payload: SubmitKuisPayload,
  ): Promise<BackendResponse<QuizResult>> {
    const response = await apiClient.post(
      `/api/kuis/${id_kuis}/jawab`,
      payload,
    );
    return response as unknown as BackendResponse<QuizResult>;
  }
}

export const kuisService = KuisService.getInstance();
