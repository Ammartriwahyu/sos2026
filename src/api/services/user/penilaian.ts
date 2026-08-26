import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";
import { DetailNilaiRangkaian } from "@/feature/(user)/penilaian/types";

const mockDetailNilaiMap: Record<string, DetailNilaiRangkaian> = {
  "1": {
    penilaian: [
      { nama_penilaian: "Tugas Pengenalan SOS & Resume", nilai: 88 },
      { nama_penilaian: "Kuis Logika & Algoritma", nilai: 92 },
      { nama_penilaian: "Tugas Mini Project Tim", nilai: 85 },
      { nama_penilaian: "Kuis Wawasan Almamater", nilai: 90 },
    ],
    pelanggaran: [
      {
        nama: "Keterlambatan masuk sesi rangkaian",
        kategori: "ringan",
        nilai: 5,
      },
    ],
    keaktifan: 95,
    skor_akhir: 89,
    status: "lulus",
  },
  "2": {
    penilaian: [
      { nama_penilaian: "Tugas Analisis Studi Kasus", nilai: 80 },
      { nama_penilaian: "Kuis Kode Etik Mahasiswa", nilai: 85 },
      { nama_penilaian: "Tugas Esai Kebangsaan", nilai: 82 },
    ],
    pelanggaran: [],
    keaktifan: 88,
    skor_akhir: 84,
    status: "lulus",
  },
  "3": {
    penilaian: [
      { nama_penilaian: "Tugas Akhir Rangkaian SOS", nilai: 94 },
      { nama_penilaian: "Kuis Evaluasi Akhir", nilai: 96 },
    ],
    pelanggaran: [],
    keaktifan: 98,
    skor_akhir: 96,
    status: "lulus",
  },
};

const defaultMockDetailNilai: DetailNilaiRangkaian = {
  penilaian: [
    { nama_penilaian: "Tugas Pengenalan SOS", nilai: 88 },
    { nama_penilaian: "Kuis Logika Dasar", nilai: 90 },
    { nama_penilaian: "Tugas Analisis Kasus", nilai: 85 },
  ],
  pelanggaran: [
    {
      nama: "Keterlambatan masuk sesi rangkaian",
      kategori: "ringan",
      nilai: 5,
    },
  ],
  keaktifan: 92,
  skor_akhir: 88,
  status: "lulus",
};

class PenilaianService {
  private static instance: PenilaianService;

  public static getInstance(): PenilaianService {
    if (!PenilaianService.instance) {
      PenilaianService.instance = new PenilaianService();
    }
    return PenilaianService.instance;
  }

  async getDetailNilaiByRangkaian(
    id_rangkaian: string,
  ): Promise<ApiResponse<DetailNilaiRangkaian>> {
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      const matched =
        mockDetailNilaiMap[id_rangkaian] || defaultMockDetailNilai;
      return {
        success: true,
        message: "Data penilaian mock berhasil diambil.",
        data: matched,
      };
    }

    try {
      const response = (await apiClient.get(
        `/api/penilaian/rangkaian/${id_rangkaian}`,
      )) as unknown as DetailNilaiRangkaian;
      return {
        success: true,
        message: "Data penilaian berhasil diambil.",
        data: response,
      };
    } catch {
      // Fallback ke mock data jika endpoint API backend belum siap/gagal
      const fallback =
        mockDetailNilaiMap[id_rangkaian] || defaultMockDetailNilai;
      return {
        success: true,
        message: "Data penilaian (fallback mock) berhasil diambil.",
        data: fallback,
      };
    }
  }
}

export const penilaianService = PenilaianService.getInstance();
