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
    /* === MOCK_BYPASS_START: Mock data penugasan untuk local demo === */
    if (typeof window !== "undefined" && document.cookie.includes("auth_session=mock_demo_token")) {
      return {
        success: true,
        message: "Berhasil mengambil penugasan mock",
        data: [
          {
            id_penugasan: "tugas-1",
            id_rangkaian: "rangkaian-1",
            judul: "Tugas Esai Kepemimpinan",
            deskripsi: "Tulis sebuah esai reflektif mengenai pentingnya nilai kepemimpinan di era digital.",
            tenggat: "2026-08-20T23:59:59.000Z",
            link_pengumpulan: "https://drive.google.com/drive/folders/1",
            status: "Belum Selesai",
            rangkaian: {
              ID: "rangkaian-1",
              Name: "Pra-Rangkaian",
              Description: "Pra-Rangkaian SOS 2026",
              Start_Date: "2026-08-01T00:00:00.000Z",
              End_Date: "2026-08-31T00:00:00.000Z"
            }
          },
          {
            id_penugasan: "tugas-2",
            id_rangkaian: "rangkaian-1",
            judul: "Tugas Mind Map Kreatif",
            deskripsi: "Buatlah mind map kreatif tentang materi SOS 2026.",
            tenggat: "2026-08-25T23:59:59.000Z",
            link_pengumpulan: "https://drive.google.com/drive/folders/2",
            status: "Selesai",
            rangkaian: {
              ID: "rangkaian-1",
              Name: "Pra-Rangkaian",
              Description: "Pra-Rangkaian SOS 2026",
              Start_Date: "2026-08-01T00:00:00.000Z",
              End_Date: "2026-08-31T00:00:00.000Z"
            }
          }
        ]
      };
    }
    /* === MOCK_BYPASS_END === */

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
    /* === MOCK_BYPASS_START: Mock detail tugas === */
    if (typeof window !== "undefined" && document.cookie.includes("auth_session=mock_demo_token")) {
      const isFirst = id_penugasan === "tugas-1";
      return {
        success: true,
        message: "Berhasil mengambil detail penugasan mock",
        data: {
          id_penugasan: id_penugasan,
          id_rangkaian: "rangkaian-1",
          judul: isFirst ? "Tugas Esai Kepemimpinan" : "Tugas Mind Map Kreatif",
          deskripsi: isFirst 
            ? "Tulis sebuah esai reflektif mengenai pentingnya nilai kepemimpinan di era digital."
            : "Buatlah mind map kreatif tentang materi SOS 2026.",
          tenggat: isFirst ? "2026-08-20T23:59:59.000Z" : "2026-08-25T23:59:59.000Z",
          link_pengumpulan: isFirst ? "https://drive.google.com/drive/folders/1" : "https://drive.google.com/drive/folders/2",
          status: isFirst ? "Belum Selesai" : "Selesai",
          rangkaian: {
            ID: "rangkaian-1",
            Name: "Pra-Rangkaian",
            Description: "Pra-Rangkaian SOS 2026",
            Start_Date: "2026-08-01T00:00:00.000Z",
            End_Date: "2026-08-31T00:00:00.000Z"
          }
        }
      };
    }
    /* === MOCK_BYPASS_END === */

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
    /* === MOCK_BYPASS_START: Mock kuis list === */
    if (typeof window !== "undefined" && document.cookie.includes("auth_session=mock_demo_token")) {
      return {
        success: true,
        message: "Berhasil mengambil kuis mock",
        data: [
          {
            id_kuis: "kuis-1",
            nama_kuis: "Kuis Pengenalan SOS 2026",
            tenggat_kuis: "2026-08-25T23:59:59.000Z",
            status_kuis: "Belum Mulai"
          },
          {
            id_kuis: "kuis-2",
            nama_kuis: "Kuis Kode Etik & Kedisiplinan",
            tenggat_kuis: "2026-08-28T23:59:59.000Z",
            status_kuis: "Selesai"
          }
        ]
      };
    }
    /* === MOCK_BYPASS_END === */

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
    /* === MOCK_BYPASS_START: Mock detail kuis === */
    if (typeof window !== "undefined" && document.cookie.includes("auth_session=mock_demo_token")) {
      const isFirst = id_kuis === "kuis-1";
      return {
        success: true,
        message: "Berhasil mengambil detail kuis mock",
        data: {
          id_kuis: id_kuis,
          nama_kuis: isFirst ? "Kuis Pengenalan SOS 2026" : "Kuis Kode Etik & Kedisiplinan",
          deskripsi_kuis: isFirst 
            ? "Uji pemahaman dasar Anda tentang sejarah dan nilai-nilai SOS."
            : "Uji pemahaman Anda tentang peraturan, tata tertib, dan kode etik mahasiswa baru.",
          kesempatan: isFirst ? 3 : 1,
          tenggat_kuis: isFirst ? "2026-08-25T23:59:59.000Z" : "2026-08-28T23:59:59.000Z",
          durasi_kuis: "30 Menit",
          status_kuis: isFirst ? "Belum Mulai" : "Selesai",
          data_rangkaian: {
            ID: "rangkaian-1",
            Name: "Pra-Rangkaian",
            Description: "Pra-Rangkaian SOS 2026",
            Start_Date: "2026-08-01T00:00:00.000Z",
            End_Date: "2026-08-31T00:00:00.000Z"
          }
        }
      };
    }
    /* === MOCK_BYPASS_END === */

    const response = await apiClient.get(`/api/kuis/${id_kuis}`);
    return response as unknown as BackendResponse<KuisDetail>;
  }
}

export const penugasanService = PenugasanService.getInstance();
