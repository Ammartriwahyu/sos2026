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

const mockTugasList: Tugas[] = [
  {
    // Status: Belum Selesai + deadline sudah lewat → card: "Terlewat" (merah), detail badge: "Terlewat"
    id_penugasan: "tugas-twibbon",
    id_rangkaian: "rangkaian-1",
    judul: "Twibbon",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    tenggat: "2025-08-30T16:59:00.000Z", // 30 Agustus 2025 • 23.59 WIB — sudah lewat
    link_pengumpulan: "https://drive.google.com/drive/folders/1",
    status: "Belum Selesai",
    rangkaian: {
      ID: "rangkaian-1",
      Name: "Pra-Rangkaian",
      Description: "Pra-Rangkaian SOS 2026",
      Start_Date: "2026-08-01T00:00:00.000Z",
      End_Date: "2026-08-31T00:00:00.000Z",
    },
  },
  {
    // Status: Selesai + deadline sudah lewat → card: "Selesai" (hijau), detail badge: "Selesai"
    id_penugasan: "tugas-survival-guide",
    id_rangkaian: "rangkaian-1",
    judul: "Survival Guide Maba",
    deskripsi:
      "Survival Guide untuk Mahasiswa Baru dalam menjalani perkuliahan.",
    tenggat: "2025-08-30T16:59:00.000Z", // 30 Agustus 2025 • 23.59 WIB — sudah lewat
    link_pengumpulan: "https://drive.google.com/drive/folders/2",
    status: "Selesai",
    rangkaian: {
      ID: "rangkaian-1",
      Name: "Pra-Rangkaian",
      Description: "Pra-Rangkaian SOS 2026",
      Start_Date: "2026-08-01T00:00:00.000Z",
      End_Date: "2026-08-31T00:00:00.000Z",
    },
  },
  {
    // Status: Selesai + deadline custom string → card: "Selesai" (hijau), detail badge: "Selesai"
    id_penugasan: "tugas-founder",
    id_rangkaian: "rangkaian-2",
    judul: "Found You, Founder!",
    deskripsi:
      "Cari tahu profil founder dan buat rangkuman singkat tentang mereka.",
    tenggat: "H-2 Rangkaian 2 • 23.59 WIB",
    link_pengumpulan: "https://drive.google.com/drive/folders/3",
    status: "Selesai",
    rangkaian: {
      ID: "rangkaian-2",
      Name: "Rangkaian 2",
      Description: "Rangkaian SOS 2026 Kedua",
      Start_Date: "2026-08-01T00:00:00.000Z",
      End_Date: "2026-09-30T00:00:00.000Z",
    },
  },
  {
    // Status: Selesai + deadline custom string → card: "Selesai" (hijau), detail badge: "Selesai"
    id_penugasan: "tugas-blueprint",
    id_rangkaian: "rangkaian-1",
    judul: "Blueprint of Becoming",
    deskripsi:
      "Rancang blueprint peta pengembangan diri Anda untuk beberapa tahun ke depan.",
    tenggat: "H+7 Rangkaian 1 • 23.59 WIB",
    link_pengumpulan: "",
    status: "Selesai",
    rangkaian: {
      ID: "rangkaian-1",
      Name: "Pra-Rangkaian",
      Description: "Pra-Rangkaian SOS 2026",
      Start_Date: "2026-08-01T00:00:00.000Z",
      End_Date: "2026-08-31T00:00:00.000Z",
    },
  },
  {
    // Status: Belum Selesai + deadline sudah lewat → card: "Terlewat" (merah), detail badge: "Terlewat"
    id_penugasan: "tugas-hire-me",
    id_rangkaian: "rangkaian-3",
    judul: "Hire Me in 2029",
    deskripsi:
      "Buat CV kreatif dan video perkenalan diri profesional Anda untuk tahun 2029.",
    tenggat: "2025-07-01T16:59:00.000Z", // sudah lewat
    link_pengumpulan: "",
    status: "Belum Selesai",
    rangkaian: {
      ID: "rangkaian-3",
      Name: "Rangkaian 3",
      Description: "Rangkaian SOS 2026 Ketiga",
      Start_Date: "2026-08-01T00:00:00.000Z",
      End_Date: "2026-10-31T00:00:00.000Z",
    },
  },
  {
    // Status: Belum Selesai + deadline belum lewat → card: tanpa label, detail badge: "Belum Selesai"
    id_penugasan: "tugas-sync-shine",
    id_rangkaian: "rangkaian-3",
    judul: "Sync & Shine",
    deskripsi:
      "Tugas kolaborasi kelompok untuk menunjukkan kekompakan dan kreativitas.",
    tenggat: "2027-12-31T16:59:00.000Z", // belum lewat
    link_pengumpulan: "",
    status: "Belum Selesai",
    rangkaian: {
      ID: "rangkaian-3",
      Name: "Rangkaian 3",
      Description: "Rangkaian SOS 2026 Ketiga",
      Start_Date: "2026-08-01T00:00:00.000Z",
      End_Date: "2026-10-31T00:00:00.000Z",
    },
  },
];

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
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      return {
        success: true,
        message: "Berhasil mengambil penugasan mock",
        data: mockTugasList,
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
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      const found =
        mockTugasList.find((t) => t.id_penugasan === id_penugasan) ||
        mockTugasList[0];
      return {
        success: true,
        message: "Berhasil mengambil detail penugasan mock",
        data: found,
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
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      return {
        success: true,
        message: "Berhasil mengambil kuis mock",
        data: [
          {
            id_kuis: "kuis-1",
            nama_kuis: "Kuis Pengenalan SOS 2026",
            tenggat_kuis: "2026-08-25T23:59:59.000Z",
            status_kuis: "Belum Mulai",
          },
          {
            id_kuis: "kuis-2",
            nama_kuis: "Kuis Kode Etik & Kedisiplinan",
            tenggat_kuis: "2026-08-28T23:59:59.000Z",
            status_kuis: "Selesai",
          },
        ],
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
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      const isFirst = id_kuis === "kuis-1";
      return {
        success: true,
        message: "Berhasil mengambil detail kuis mock",
        data: {
          id_kuis: id_kuis,
          nama_kuis: isFirst
            ? "Kuis Pengenalan SOS 2026"
            : "Kuis Kode Etik & Kedisiplinan",
          deskripsi_kuis: isFirst
            ? "Uji pemahaman dasar Anda tentang sejarah dan nilai-nilai SOS."
            : "Uji pemahaman Anda tentang peraturan, tata tertib, dan kode etik mahasiswa baru.",
          kesempatan: isFirst ? 3 : 1,
          tenggat_kuis: isFirst
            ? "2026-08-25T23:59:59.000Z"
            : "2026-08-28T23:59:59.000Z",
          durasi_kuis: "30 Menit",
          status_kuis: isFirst ? "Belum Mulai" : "Selesai",
          data_rangkaian: {
            ID: "rangkaian-1",
            Name: "Pra-Rangkaian",
            Description: "Pra-Rangkaian SOS 2026",
            Start_Date: "2026-08-01T00:00:00.000Z",
            End_Date: "2026-08-31T00:00:00.000Z",
          },
        },
      };
    }
    /* === MOCK_BYPASS_END === */

    const response = await apiClient.get(`/api/kuis/${id_kuis}`);
    return response as unknown as BackendResponse<KuisDetail>;
  }
}

export const penugasanService = PenugasanService.getInstance();
