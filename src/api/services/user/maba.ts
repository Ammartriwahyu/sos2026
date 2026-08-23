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
    /* === MOCK_BYPASS_START: Mock profile mahasiswa untuk local demo === */
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      return {
        success: true,
        message: "Berhasil mengambil data profile mock",
        data: {
          nim: "265150201111001",
          nama: "Adik Maba Demo",
          email: "maba.demo@student.ub.ac.id",
          fakultas: "Fakultas Ilmu Komputer",
          prodi: "Teknologi Informasi",
          exp: 1500,
          telp: "081234567890",
          line: "mabademo",
          agama: "Islam",
          kelamin: "Laki-laki",
          golongan_darah: "O",
          riwayat_penyakit: "-",
          alergi_obat: "-",
          alergi_makanan: "-",
          kelompok: {
            id_kelompok: "1",
            nama_kelompok: "Symphony 01",
            distrik: {
              id_distrik: "1",
              nama_distrik: "District A",
              list_pjl: [
                { nim: "111", nama: "Kakak PJL 1", line: "@kakakpjl1" },
                { nim: "222", nama: "Kakak PJL 2", line: "@kakakpjl2" },
              ],
            },
          },
        },
      };
    }
    /* === MOCK_BYPASS_END === */

    const response = await apiClient.get("/api/mahasiswa/");
    return response as unknown as BackendResponse<MahasiswaProfile>;
  }

  async getMyLevel(): Promise<BackendResponse<MahasiswaLevel>> {
    /* === MOCK_BYPASS_START: Mock level mahasiswa untuk local demo === */
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      return {
        success: true,
        message: "Berhasil mengambil data level mock",
        data: {
          level: 2,
          max_level: 5,
        },
      };
    }
    /* === MOCK_BYPASS_END === */

    const response = await apiClient.get("/api/mahasiswa/level");
    return response as unknown as BackendResponse<MahasiswaLevel>;
  }
}

export const mahasiswaService = MahasiswaService.getInstance();
