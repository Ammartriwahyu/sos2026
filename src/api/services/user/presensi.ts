import { apiClient } from "@/api/core/AxiosInstance";

export interface RekapPresensi {
  id: number;
  rangkaian: string;
  sesi: string;
  waktu: string;
  tanggal: string;
}

export type PresensiRekapData = RekapPresensi[];

export interface PresensiSubmitResult {
  presensi_id: string;
  nim: string;
  latitude: number;
  longitude: number;
  location_source: string;
  captured_at: string;
  submitted_at: string;
}

export const PRESENSI_PHOTO_MAX_BYTES = 900 * 1024;

const PRESENSI_PHOTO_FILENAME = "presensi.jpg";

export interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class PresensiService {
  private static instance: PresensiService;
  private cache = new Map<
    string,
    { data: BackendResponse<PresensiRekapData>; expiry: number }
  >();
  private readonly cacheDuration = 10 * 60 * 1000;

  public static getInstance(): PresensiService {
    if (!PresensiService.instance) {
      PresensiService.instance = new PresensiService();
    }
    return PresensiService.instance;
  }

  async getRekapPresensi(): Promise<BackendResponse<PresensiRekapData>> {
    // BYPASS MOCK UNTUK LOCAL DEMO / DEVELOPMENT
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      return {
        status_code: 200,
        message: "Berhasil mengambil rekap presensi (mock)",
        data: [
          {
            id: 1,
            rangkaian: "Opening Ceremony",
            sesi: "Sesi 1",
            waktu: "08:00 - 10:00",
            tanggal: "2026-08-01",
          },
          {
            id: 2,
            rangkaian: "Workshop Kepemimpinan",
            sesi: "Sesi 2",
            waktu: "10:00 - 12:00",
            tanggal: "2026-08-01",
          },
          {
            id: 3,
            rangkaian: "Sesi Kebersamaan",
            sesi: "Sesi 1",
            waktu: "13:00 - 15:00",
            tanggal: "2026-08-02",
          },
          {
            id: 4,
            rangkaian: "Closing Ceremony",
            sesi: "Sesi 1",
            waktu: "15:00 - 17:00",
            tanggal: "2026-08-03",
          },
        ],
      };
    }

    const cacheKey = "rekap_presensi";
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data;
    }

    const response = await apiClient.get("/api/presensi/rekapmahasiswa");
    const responseData =
      response as unknown as BackendResponse<PresensiRekapData>;

    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }

  async submitPresensi(
    kode: string,
    photo: Blob,
  ): Promise<BackendResponse<PresensiSubmitResult>> {
    const formData = new FormData();
    formData.append("kode", kode);
    formData.append("photo", photo, PRESENSI_PHOTO_FILENAME);

    const response = await apiClient.post("/api/presensi/submit", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const responseData =
      response as unknown as BackendResponse<PresensiSubmitResult>;

    if (responseData.status_code === 200) {
      this.cache.delete("rekap_presensi");
    }

    return responseData;
  }
}

export const presensiService = PresensiService.getInstance();
