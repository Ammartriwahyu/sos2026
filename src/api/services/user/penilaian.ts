import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";
import { DetailNilaiRangkaian } from "@/feature/(user)/penilaian/types";

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
    const response = (await apiClient.get(
      `/api/penilaian/rangkaian/${id_rangkaian}`,
    )) as unknown as DetailNilaiRangkaian;

    return {
      success: true,
      message: "Data penilaian berhasil diambil.",
      data: response,
    };
  }
}

export const penilaianService = PenilaianService.getInstance();
