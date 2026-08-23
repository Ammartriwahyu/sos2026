import { apiClient, ApiResponse } from "../core/AxiosInstance";
import axios from "axios";
export interface Pjl {
  nim: string;
  nama: string;
  line: string;
}

export interface Distrik {
  id_distrik: string;
  nama_distrik: string;
  list_pjl: Pjl[];
}

export interface Kelompok {
  id_kelompok: string;
  nama_kelompok: string;
  distrik: Distrik;
}

export interface AuthProfile {
  nim: string;
  nama: string;
  full_name: string;
  email?: string;
  kelamin?: string;
  fakultas?: string;
  prodi?: string;
  siakad_photo_url: string;
  file_filkom_photo_url: string;
  role: "admin" | "user";
  telp?: string;
  line?: string;
  agama?: string;
  golongan_darah?: string;
  riwayat_penyakit?: string;
  alergi_obat?: string;
  alergi_makanan?: string;
  kelompok?: Kelompok;
  tipe_mahasiswa?: string;
}

export interface EditProfileRequest {
  Phone?: string;
  Line?: string;
  Agama?: string;
  GolonganDarah?: string;
  RiwayatPenyakit?: string;
  AlergiObat?: string;
  AlergiMakanan?: string;
  Kelamin?: string;
}

interface LoginResponse {
  message: string;
  profile: AuthProfile;
  redirectUrl: string;
}

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: {
    emailornim: string;
    password: string;
  }): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      "/api/auth/login",
      credentials,
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await axios.post("/api/auth/logout");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  async getMe(): Promise<ApiResponse<AuthProfile>> {
    try {
      const response = await apiClient.get<AuthProfile>("/api/mahasiswa/");
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Gagal mengambil data pengguna.");
    }
  }
  async editProfile(
    profileData: EditProfileRequest,
  ): Promise<ApiResponse<AuthProfile>> {
    try {
      const response = await apiClient.patch<AuthProfile>(
        "/api/mahasiswa/",
        profileData,
      );
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Gagal memperbarui profil pengguna.");
    }
  }
}

export const authService = AuthService.getInstance();
