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

    try {
      const response = await apiClient.get(`/api/kuis/${id}`);
      const responseData = response as unknown as BackendResponse<Quiz>;
      this.cache.set(cacheKey, {
        data: responseData,
        expiry: Date.now() + this.cacheDuration,
      });
      return responseData;
    } catch (e) {
      console.warn("Backend API kuis detail failed, using mock data:", e);

      const mockDictionary: Record<
        string,
        {
          nama: string;
          deskripsi: string;
          kesempatan: number;
          tenggat: string;
          durasi: string;
          defaultStatus: string;
          defaultScore?: number;
          total_soal: number;
        }
      > = {
        "kuis-1": {
          nama: "Kuis Pengenalan SOS 2026",
          deskripsi:
            "Kuis ini dirancang untuk menguji pemahaman dasar logika pemrograman, struktur data dasar, nilai-nilai SOS, serta alur berpikir analitis mahasiswa baru. Pastikan koneksi internet stabil sebelum memulai.",
          kesempatan: 3,
          tenggat: "2026-08-25T23:59:59.000Z",
          durasi: "00:60:00",
          defaultStatus: "Belum Mulai",
          total_soal: 5,
        },
        "kuis-2": {
          nama: "Kuis Kode Etik & Kedisiplinan",
          deskripsi:
            "Uji pemahaman Anda tentang peraturan, tata tertib, dan kode etik mahasiswa baru.",
          kesempatan: 1,
          tenggat: "2026-08-28T23:59:59.000Z",
          durasi: "00:45:00",
          defaultStatus: "Belum Mulai",
          defaultScore: 85,
          total_soal: 5,
        },
        "kuis-3": {
          nama: "Kuis Sejarah & Budaya Kampus",
          deskripsi:
            "Uji pengetahuan Anda tentang sejarah dan budaya kampus yang perlu diketahui mahasiswa baru.",
          kesempatan: 2,
          tenggat: "2026-08-10T23:59:59.000Z",
          durasi: "00:20:00",
          defaultStatus: "Terlewat",
          total_soal: 5,
        },
      };

      const selected = mockDictionary[id] || mockDictionary["kuis-1"];
      const savedStatus =
        typeof window !== "undefined"
          ? localStorage.getItem(`mock_kuis_status_${id}`)
          : null;
      const resolvedStatus = savedStatus || selected.defaultStatus;
      const savedScore =
        typeof window !== "undefined"
          ? localStorage.getItem(`mock_kuis_score_${id}`)
          : null;
      const resolvedScore = savedScore
        ? Number(savedScore)
        : resolvedStatus === "Selesai"
          ? (selected.defaultScore ?? 80)
          : 0;

      const mockQuiz: BackendResponse<Quiz> = {
        status_code: 200,
        message: "success",
        data: {
          id_kuis: id,
          nama_kuis: selected.nama,
          deskripsi_kuis: selected.deskripsi,
          kesempatan: selected.kesempatan,
          data_rangkaian: {
            ID: "rangkaian-1",
            Name: "Pra-Rangkaian",
            Description: "Pra-Rangkaian SOS 2026",
            Start_Date: new Date().toISOString(),
            End_Date: new Date(Date.now() + 86400000).toISOString(),
          },
          tenggat_kuis: selected.tenggat,
          durasi_kuis: selected.durasi,
          status_kuis: resolvedStatus,
          score: resolvedScore,
          jawaban_benar: Math.round(
            (resolvedScore / 100) * selected.total_soal,
          ),
          total_pertanyaan: selected.total_soal,
          total_soal: selected.total_soal,
        },
      };
      return mockQuiz;
    }
  }

  async getSoalKuisById(id: string): Promise<BackendResponse<QuizSoal>> {
    const cacheKey = `kuis_soal_${id}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<QuizSoal>;
    }

    try {
      const response = await apiClient.get(`/api/kuis/${id}/soal`);
      const responseData = response as unknown as BackendResponse<QuizSoal>;

      this.cache.set(cacheKey, {
        data: responseData,
        expiry: Date.now() + this.cacheDuration,
      });

      return responseData;
    } catch (e) {
      console.warn("Backend API kuis soal failed, using mock data:", e);

      const mockQuizDetails: Record<
        string,
        {
          nama: string;
          tenggat: string;
          durasi: string;
          soalList: Pertanyaan[];
        }
      > = {
        "kuis-1": {
          nama: "Kuis Pengenalan SOS 2026",
          tenggat: "2026-08-25T23:59:59.000Z",
          durasi: "00:30:00",
          soalList: [
            {
              id_pertanyaan: "q1",
              pertanyaan:
                "Manakah di bawah ini yang merupakan representasi struktur data First-In-First-Out (FIFO)?",
              pilihan: [
                { label: "A", value: "Stack" },
                { label: "B", value: "Queue" },
                { label: "C", value: "Tree" },
                { label: "D", value: "Graph" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q2",
              pertanyaan:
                "Dalam kompleksitas waktu (Big O Notation), algoritma Binary Search memiliki efisiensi sebesar...",
              pilihan: [
                { label: "A", value: "O(1)" },
                { label: "B", value: "O(n)" },
                { label: "C", value: "O(log n)" },
                { label: "D", value: "O(n log n)" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q3",
              pertanyaan:
                "Protokol manakah yang berjalan pada Application Layer dalam model TCP/IP dan digunakan untuk transfer dokumen web secara aman?",
              pilihan: [
                { label: "A", value: "HTTP" },
                { label: "B", value: "FTP" },
                { label: "C", value: "HTTPS" },
                { label: "D", value: "SSH" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q4",
              pertanyaan:
                "Manakah yang merupakan pilar utama dari Pemrograman Berorientasi Objek (OOP)?",
              pilihan: [
                {
                  label: "A",
                  value:
                    "Inheritance, Polymorphism, Encapsulation, Abstraction",
                },
                {
                  label: "B",
                  value: "Compilation, Execution, Debugging, Deployment",
                },
                {
                  label: "C",
                  value:
                    "Declaration, Initialization, Instantiation, Invocation",
                },
                {
                  label: "D",
                  value: "Iteration, Selection, Recursion, Sequential",
                },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q5",
              pertanyaan:
                "Database NoSQL sangat cocok digunakan untuk skenario berikut, KECUALI...",
              pilihan: [
                {
                  label: "A",
                  value: "Menyimpan data dengan skema yang sangat dinamis",
                },
                {
                  label: "B",
                  value:
                    "Transaksi finansial yang memerlukan kepatuhan ACID yang ketat",
                },
                {
                  label: "C",
                  value:
                    "Menyimpan data cache atau sesi pengguna dalam jumlah masif",
                },
                {
                  label: "D",
                  value:
                    "Penyimpanan dokumen berskala besar dengan performa tinggi",
                },
              ],
              durasi: 360,
            },
          ],
        },
        "kuis-2": {
          nama: "Kuis Kode Etik & Kedisiplinan",
          tenggat: "2026-08-28T23:59:59.000Z",
          durasi: "00:45:00",
          soalList: [
            {
              id_pertanyaan: "q1_k2",
              pertanyaan:
                "Apa sanksi utama jika seorang mahasiswa melanggar integritas akademik saat ujian/tugas?",
              pilihan: [
                { label: "A", value: "Teguran lisan saja" },
                {
                  label: "B",
                  value: "Nilai E/pembatalan mata kuliah dan sidang etik",
                },
                { label: "C", value: "Pemberian tugas tambahan" },
                { label: "D", value: "Tidak ada sanksi" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q2_k2",
              pertanyaan:
                "Apa sanksi utama jika seorang mahasiswa melanggar integritas akademik saat ujian/tugas?",
              pilihan: [
                { label: "A", value: "Teguran lisan saja" },
                {
                  label: "B",
                  value: "Nilai E/pembatalan mata kuliah dan sidang etik",
                },
                { label: "C", value: "Pemberian tugas tambahan" },
                { label: "D", value: "Tidak ada sanksi" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q3_k2",
              pertanyaan:
                "Batas toleransi keterlambatan kehadiran saat sesi penugasan dan rangkaian adalah...",
              pilihan: [
                { label: "A", value: "15 Menit" },
                { label: "B", value: "30 Menit" },
                { label: "C", value: "45 Menit" },
                { label: "D", value: "Bebas kapan saja" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q4_k2",
              pertanyaan:
                "Batas toleransi keterlambatan kehadiran saat sesi penugasan dan rangkaian adalah...",
              pilihan: [
                { label: "A", value: "15 Menit" },
                { label: "B", value: "30 Menit" },
                { label: "C", value: "45 Menit" },
                { label: "D", value: "Bebas kapan saja" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q5_k2",
              pertanyaan:
                "Batas toleransi keterlambatan kehadiran saat sesi penugasan dan rangkaian adalah...",
              pilihan: [
                { label: "A", value: "15 Menit" },
                { label: "B", value: "30 Menit" },
                { label: "C", value: "45 Menit" },
                { label: "D", value: "Bebas kapan saja" },
              ],
              durasi: 360,
            },
          ],
        },
        "kuis-3": {
          nama: "Kuis Sejarah & Budaya Kampus",
          tenggat: "2026-08-10T23:59:59.000Z",
          durasi: "00:20:00",
          soalList: [
            {
              id_pertanyaan: "q1_k3",
              pertanyaan:
                "Nilai utama yang dijunjung tinggi dalam kegiatan SOS adalah...",
              pilihan: [
                { label: "A", value: "Integritas, Kolaborasi, dan Resiliensi" },
                { label: "B", value: "Individualisme" },
                { label: "C", value: "Kompetisi tanpa batas" },
                { label: "D", value: "Pasif terhadap lingkungan" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q2_k3",
              pertanyaan:
                "Nilai utama yang dijunjung tinggi dalam kegiatan SOS adalah...",
              pilihan: [
                { label: "A", value: "Integritas, Kolaborasi, dan Resiliensi" },
                { label: "B", value: "Individualisme" },
                { label: "C", value: "Kompetisi tanpa batas" },
                { label: "D", value: "Pasif terhadap lingkungan" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q3_k3",
              pertanyaan:
                "Nilai utama yang dijunjung tinggi dalam kegiatan SOS adalah...",
              pilihan: [
                { label: "A", value: "Integritas, Kolaborasi, dan Resiliensi" },
                { label: "B", value: "Individualisme" },
                { label: "C", value: "Kompetisi tanpa batas" },
                { label: "D", value: "Pasif terhadap lingkungan" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q4_k3",
              pertanyaan:
                "Nilai utama yang dijunjung tinggi dalam kegiatan SOS adalah...",
              pilihan: [
                { label: "A", value: "Integritas, Kolaborasi, dan Resiliensi" },
                { label: "B", value: "Individualisme" },
                { label: "C", value: "Kompetisi tanpa batas" },
                { label: "D", value: "Pasif terhadap lingkungan" },
              ],
              durasi: 360,
            },
            {
              id_pertanyaan: "q5_k3",
              pertanyaan:
                "Nilai utama yang dijunjung tinggi dalam kegiatan SOS adalah...",
              pilihan: [
                { label: "A", value: "Integritas, Kolaborasi, dan Resiliensi" },
                { label: "B", value: "Individualisme" },
                { label: "C", value: "Kompetisi tanpa batas" },
                { label: "D", value: "Pasif terhadap lingkungan" },
              ],
              durasi: 360,
            },
          ],
        },
      };

      const selected = mockQuizDetails[id] || mockQuizDetails["kuis-1"];

      const mockSoal: BackendResponse<QuizSoal> = {
        status_code: 200,
        message: "success",
        data: {
          id_kuis: id,
          nama_kuis: selected.nama,
          tenggat_kuis: selected.tenggat,
          durasi_kuis: selected.durasi,
          list_pertanyaan: selected.soalList,
        },
      };
      return mockSoal;
    }
  }

  async submitJawabanKuis(
    id_kuis: string,
    payload: SubmitKuisPayload,
  ): Promise<BackendResponse<QuizResult>> {
    try {
      const response = await apiClient.post(
        `/api/kuis/${id_kuis}/jawab`,
        payload,
      );
      return response as unknown as BackendResponse<QuizResult>;
    } catch (e) {
      console.warn("Backend API kuis submit failed, using mock data:", e);

      const correctAnswers: Record<string, string> = {
        q1: "B",
        q2: "C",
        q3: "C",
        q4: "A",
        q5: "B",
        q1_k2: "B",
        q2_k2: "A",
        q1_k3: "A",
      };
      let benar = 0;
      payload.pertanyaan_list.forEach((p) => {
        if (correctAnswers[p.id_pertanyaan] === p.jawaban) {
          benar++;
        }
      });
      const totalSoal = Math.max(1, payload.pertanyaan_list.length);
      const score = Math.round((benar / totalSoal) * 100);

      localStorage.setItem(`mock_kuis_status_${id_kuis}`, "Selesai");
      localStorage.setItem(`mock_kuis_score_${id_kuis}`, String(score));
      localStorage.setItem(`mock_kuis_benar_${id_kuis}`, String(benar));

      const mockResult: BackendResponse<QuizResult> = {
        status_code: 200,
        message: "success",
        data: {
          score: score,
          jawaban_benar: benar,
          total_pertanyaan: totalSoal,
        },
      };
      return mockResult;
    }
  }
}

export const kuisService = KuisService.getInstance();
