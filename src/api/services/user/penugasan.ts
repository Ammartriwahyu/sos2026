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
    id_penugasan: "tugas-twibbon",
    id_rangkaian: "rangkaian-1",
    judul: "Twibbon",
    deskripsi:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
    tenggat: "2025-08-30T16:59:00.000Z",
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
    id_penugasan: "tugas-survival-guide",
    id_rangkaian: "rangkaian-1",
    judul: "Survival Guide Maba",
    deskripsi:
      "Survival Guide untuk Mahasiswa Baru dalam menjalani perkuliahan.",
    tenggat: "2025-08-30T16:59:00.000Z",
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
    id_penugasan: "tugas-hire-me",
    id_rangkaian: "rangkaian-3",
    judul: "Hire Me in 2029",
    deskripsi:
      "Buat CV kreatif dan video perkenalan diri profesional Anda untuk tahun 2029.",
    tenggat: "2025-07-01T16:59:00.000Z",
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
    id_penugasan: "tugas-sync-shine",
    id_rangkaian: "rangkaian-3",
    judul: "Sync & Shine",
    deskripsi:
      "Tugas kolaborasi kelompok untuk menunjukkan kekompakan dan kreativitas.",
    tenggat: "2027-12-31T16:59:00.000Z",
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

    const response = await apiClient.get("/api/penugasan/");
    return response as unknown as BackendResponse<Tugas[]>;
  }

  async getAllRangkaian(): Promise<BackendResponse<Rangkaian[]>> {
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      return {
        success: true,
        message: "Berhasil mengambil rangkaian mock",
        data: [
          {
            ID: "1",
            Name: "Rangkaian 1",
            Description: "Rangkaian awal pengenalan SOS 2026",
            Start_Date: "2026-08-01",
            End_Date: "2026-08-10",
          },
          {
            ID: "2",
            Name: "Rangkaian 2",
            Description: "Rangkaian pendalaman materi dan penugasan kelompok",
            Start_Date: "2026-08-11",
            End_Date: "2026-08-20",
          },
          {
            ID: "3",
            Name: "Rangkaian 3",
            Description: "Rangkaian puncak dan evaluasi akhir",
            Start_Date: "2026-08-21",
            End_Date: "2026-08-30",
          },
        ],
      };
    }

    try {
      const response = await apiClient.get("/api/rangkaian/");
      return response as unknown as BackendResponse<Rangkaian[]>;
    } catch {
      return {
        success: true,
        message: "Fallback mock rangkaian",
        data: [
          {
            ID: "1",
            Name: "Rangkaian 1",
            Description: "Rangkaian awal pengenalan SOS 2026",
            Start_Date: "2026-08-01",
            End_Date: "2026-08-10",
          },
          {
            ID: "2",
            Name: "Rangkaian 2",
            Description: "Rangkaian pendalaman materi",
            Start_Date: "2026-08-11",
            End_Date: "2026-08-20",
          },
        ],
      };
    }
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
          {
            id_kuis: "kuis-3",
            nama_kuis: "Kuis Sejarah & Budaya Kampus",
            tenggat_kuis: "2026-08-10T23:59:59.000Z",
            status_kuis: "Terlewat",
          },
        ],
      };
    }

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
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      return {
        success: true,
        message: "Berhasil mengambil kegiatan mock",
        data: [
          {
            id_kegiatan: "keg-1",
            nama: "Penilaian",
            rangkaian: "1",
            waktu_mulai: "2026-08-01T08:00:00.000Z",
            active: true,
            rangkaian_detail: {
              ID: "1",
              Name: "Rangkaian 1",
              Description: "Rangkaian 1",
              Start_Date: "2026-08-01",
              End_Date: "2026-08-10",
            },
          },
          {
            id_kegiatan: "keg-2",
            nama: "Presensi",
            rangkaian: "1",
            waktu_mulai: "2026-08-01T08:00:00.000Z",
            active: true,
            rangkaian_detail: {
              ID: "1",
              Name: "Rangkaian 1",
              Description: "Rangkaian 1",
              Start_Date: "2026-08-01",
              End_Date: "2026-08-10",
            },
          },
        ],
      };
    }

    try {
      const response = await apiClient.get("/api/rangkaian/kegiatan");
      return response as unknown as BackendResponse<Kegiatan[]>;
    } catch {
      return {
        success: true,
        message: "Fallback mock kegiatan",
        data: [
          {
            id_kegiatan: "keg-1",
            nama: "Penilaian",
            rangkaian: "1",
            waktu_mulai: "2026-08-01T08:00:00.000Z",
            active: true,
            rangkaian_detail: {
              ID: "1",
              Name: "Rangkaian 1",
              Description: "Rangkaian 1",
              Start_Date: "2026-08-01",
              End_Date: "2026-08-10",
            },
          },
        ],
      };
    }
  }

  async getKuisDetailWithStatus(
    id_kuis: string,
  ): Promise<BackendResponse<KuisDetail>> {
    if (
      typeof window !== "undefined" &&
      document.cookie.includes("auth_session=mock_demo_token")
    ) {
      const mockKuisData: Record<
        string,
        {
          nama: string;
          deskripsi: string;
          kesempatan: number;
          tenggat: string;
          durasi: string;
          status: "Belum Mulai" | "Selesai" | "Terlewat";
          jumlah_soal: number;
          skor?: number;
        }
      > = {
        "kuis-1": {
          nama: "Kuis Pengenalan SOS 2026",
          deskripsi:
            "Kuis ini dirancang untuk menguji pemahaman dasar logika pemrograman, struktur data dasar, nilai-nilai SOS, serta alur berpikir analitis mahasiswa baru. Pastikan koneksi internet stabil sebelum memulai.",
          kesempatan: 3,
          tenggat: "2026-08-25T23:59:59.000Z",
          durasi: "30 Menit",
          status: "Belum Mulai",
          jumlah_soal: 5,
          skor: undefined,
        },
        "kuis-2": {
          nama: "Kuis Kode Etik & Kedisiplinan",
          deskripsi:
            "Uji pemahaman Anda tentang peraturan, tata tertib, dan kode etik mahasiswa baru.",
          kesempatan: 1,
          tenggat: "2026-08-28T23:59:59.000Z",
          durasi: "45 Menit",
          status: "Belum Mulai",
          jumlah_soal: 5,
          skor: 85,
        },
        "kuis-3": {
          nama: "Kuis Sejarah & Budaya Kampus",
          deskripsi:
            "Uji pengetahuan Anda tentang sejarah dan budaya kampus yang perlu diketahui mahasiswa baru.",
          kesempatan: 2,
          tenggat: "2026-08-10T23:59:59.000Z",
          durasi: "20 Menit",
          status: "Terlewat",
          jumlah_soal: 5,
          skor: undefined,
        },
      };
      const kd = mockKuisData[id_kuis] || mockKuisData["kuis-1"];
      const deadlinePast = new Date() > new Date(kd.tenggat);
      const resolvedStatus =
        kd.status === "Selesai"
          ? "Selesai"
          : deadlinePast
            ? "Terlewat"
            : "Belum Mulai";
      return {
        success: true,
        message: "Berhasil mengambil detail kuis mock",
        data: {
          id_kuis: id_kuis,
          nama_kuis: kd.nama,
          deskripsi_kuis: kd.deskripsi,
          kesempatan: kd.kesempatan,
          tenggat_kuis: kd.tenggat,
          durasi_kuis: kd.durasi,
          status_kuis: resolvedStatus,
          jumlah_soal: kd.jumlah_soal,
          skor: resolvedStatus === "Selesai" ? kd.skor : undefined,
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

    const response = await apiClient.get(`/api/kuis/${id_kuis}`);
    return response as unknown as BackendResponse<KuisDetail>;
  }
}

export const penugasanService = PenugasanService.getInstance();
