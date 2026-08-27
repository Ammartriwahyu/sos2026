import { apiClient } from "@/api/core/AxiosInstance";
import {
  BackendResponse,
  PaginatedData,
  Rangkaian,
  Distrik,
  Maba,
  RekapPenilaianItem,
  DetailPenilaianMaba,
  PenilaianTugas,
  PayloadPelanggaran,
  PayloadKeaktifan,
  PenilaianUpdatePayload,
} from "@/feature/(admin)/penilaian-pelanggaran/types";

class PenilaianService {
  private static instance: PenilaianService;

  public static getInstance(): PenilaianService {
    if (!PenilaianService.instance) {
      PenilaianService.instance = new PenilaianService();
    }
    return PenilaianService.instance;
  }

  async getRangkaian(): Promise<BackendResponse<Rangkaian[]>> {
    const response = (await apiClient.get(
      "/api/rangkaian/",
    )) as unknown as BackendResponse<Rangkaian[] | null>;
    return { ...response, data: response.data ?? [] };
  }

  async getRekapPenilaian(
    id_rangkaian: string,
  ): Promise<BackendResponse<RekapPenilaianItem[]>> {
    const response = (await apiClient.get(
      `/api/penilaian/rekap/${id_rangkaian}`,
    )) as unknown as BackendResponse<RekapPenilaianItem[] | null>;
    return { ...response, data: response.data ?? [] };
  }

  async getDetailPenilaianMaba(
    nim: string,
    id_rangkaian: string,
  ): Promise<DetailPenilaianMaba> {
    const response = (await apiClient.get(
      `/api/penilaian/${nim}/rangkaian/${id_rangkaian}`,
    )) as unknown as DetailPenilaianMaba & {
      penilaian: PenilaianTugas[] | null;
    };
    return { ...response, penilaian: response.penilaian ?? [] };
  }

  async postPelanggaran(
    data: PayloadPelanggaran,
  ): Promise<BackendResponse<null>> {
    const response = await apiClient.post("/api/penilaian/pelanggaran", data);
    return response as unknown as BackendResponse<null>;
  }

  async postKeaktifan(
    nim: string,
    id_rangkaian: string,
    data: PayloadKeaktifan,
  ): Promise<BackendResponse<null>> {
    const response = await apiClient.post(
      `/api/penilaian/${id_rangkaian}/keaktifan?nim=${nim}`,
      data,
    );
    return response as unknown as BackendResponse<null>;
  }

  async getDistrik(): Promise<BackendResponse<Distrik[]>> {
    const response = (await apiClient.get(
      "/api/distrik/",
    )) as unknown as BackendResponse<Distrik[] | null>;
    return { ...response, data: response.data ?? [] };
  }

  async getMabaByFilter(
    distrikId: string,
    kelompokId?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<BackendResponse<PaginatedData<Maba>>> {
    if (!distrikId) {
      return Promise.resolve({
        status_code: 200,
        message: "OK",
        data: {
          pagination: { page: 1, limit: 10, total_record: 0, total_pages: 0 },
          records: [],
        },
      });
    }

    const params = new URLSearchParams();
    if (kelompokId) {
      params.append("id_kelompok", kelompokId);
    }
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const url = `/api/distrik/${distrikId}/maba?${params.toString()}`;

    const response = (await apiClient.get(
      url,
    )) as unknown as BackendResponse<PaginatedData<Maba> | null>;
    return {
      ...response,
      data: {
        pagination: response.data?.pagination ?? {
          page,
          limit,
          total_record: 0,
          total_pages: 0,
        },
        records: response.data?.records ?? [],
      },
    };
  }

  async updatePenilaian(
    nim: string,
    id_rangkaian: string,
    data: PenilaianUpdatePayload,
  ): Promise<BackendResponse<null>> {
    const url = `/api/penilaian/${nim}/rangkaian/${id_rangkaian}`;
    const response = await apiClient.put(url, data);
    return response as unknown as BackendResponse<null>;
  }
}

export const penilaianService = PenilaianService.getInstance();
