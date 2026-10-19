# Backend SOS · API STF — Papan Hasil STF

Dokumentasi implementasi fitur **Papan Hasil STF** terbuka tanpa autentikasi wajib, serta transparansi perolehan suara per sesi.

- **Target Pembaca:** Tim Frontend (FE)
- **Branch:** `staging`
- **Base URL:** `/api/stf`

---

## 01. Ringkasan Endpoint

| Endpoint                   | Login / Auth          | Deskripsi                                                                                                         |
| :------------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `GET /api/stf/papan-hasil` | **Opsional** _(Baru)_ | Perolehan suara setiap sesi yang sudah ditutup, finalis per prodi, dan sesi putaran kadep.                        |
| `GET /api/stf/pemilihan`   | **Opsional**          | Kartu suara. Tanpa token: hanya data tahap dan daftar kandidat. Dengan token maba: lengkap dengan status pemilih. |
| `GET /api/stf/hasil`       | **Publik**            | Hasil akhir (kadep dan 3 ketang) setelah tahap finalisasi panitia. Bentuk respons tidak berubah.                  |
| `POST /api/stf/pemilihan`  | **Wajib**             | Mengirimkan suara pemilih. Tetap wajib menyertakan token maba.                                                    |

> **Catatan Penggunaan "Login Opsional":**
>
> - Kirim header `Authorization: Bearer <token>` jika pengguna sudah login.
> - Kosongkan / jangan kirim header jika pengguna belum login.
> - Token yang kedaluwarsa atau tidak valid **tidak akan mengembalikan HTTP 401**, melainkan secara otomatis diperlakukan sebagai tamu (_guest_ / belum login).

---

## 02. Siklus & Waktu Munculnya Hasil

Hasil suatu sesi hanya akan keluar **segera setelah panitia menutup sesi tersebut**. Angka perolehan pada sesi yang masih aktif (terbuka) tidak pernah dikirim ke frontend untuk mencegah _bandwagon effect_ / bias suara mahasiswa yang belum memilih.

### Tahapan Tampilan Berdasarkan Status Sesi

1. **Belum ada sesi yang ditutup**
   - **Halaman Maba:** Kosong (`ada_hasil: false`).
   - **Halaman Publik:** Kosong (`ada_hasil: false`).

2. **Putaran Pertama selesai (per prodi)**
   - **Halaman Maba:** Hanya menampilkan hasil prodi mahasiswa yang login (`putaran_pertama` berisi 1 objek prodi terkait).
   - **Halaman Publik:** Menampilkan ketiga prodi sekaligus (Sistem Informasi, Teknologi Informasi, Pendidikan Teknologi Informasi).

3. **Putaran Kadep selesai**
   - **Halaman Maba:** Hasil prodi maba terkait + hasil putaran kadep.
   - **Halaman Publik:** Hasil ketiga prodi + hasil putaran kadep.

> **Catatan:** Waktu penutupan sesi antar prodi bersifat independen. Jika sesi SI telah ditutup sedangkan TI masih membuka voting, papan publik langsung menampilkan hasil SI, sementara array `sesi` pada prodi TI masih berupa array kosong `[]`.

---

## 03. Endpoint Papan Hasil

```http
GET /api/stf/papan-hasil
Authorization: Bearer <token> (opsional)
```

### Logika Tampilan Berdasarkan Pemanggil

| Tipe Pemanggil             | Isi `putaran_pertama`            | Nilai `prodi_saya`        |
| :------------------------- | :------------------------------- | :------------------------ |
| **Tanpa Token (Publik)**   | 3 prodi lengkap                  | `null` / tidak ada        |
| **Token Admin**            | 3 prodi lengkap                  | `null` / tidak ada        |
| **Token Maba / Pemutihan** | 1 prodi (sesuai prodi mahasiswa) | `"SI"` / `"PTI"` / `"TI"` |

_Bagian `putaran_kadep` dan `hasil_akhir` memiliki struktur dan data yang identik untuk semua tipe pemanggil._

---

### Contoh Respons

#### A. Sebelum Ada Sesi Ditutup

```json
{
  "status_code": 200,
  "message": "Papan hasil berhasil diambil",
  "data": {
    "tahap": "perkenalan",
    "ada_hasil": false,
    "putaran_pertama": [
      {
        "prodi": "SI",
        "nama_prodi": "Sistem Informasi",
        "selesai": false,
        "finalis": null,
        "cadangan": null,
        "sesi": []
      },
      {
        "prodi": "PTI",
        "nama_prodi": "Pendidikan Teknologi Informasi",
        "selesai": false,
        "finalis": null,
        "cadangan": null,
        "sesi": []
      },
      {
        "prodi": "TI",
        "nama_prodi": "Teknologi Informasi",
        "selesai": false,
        "finalis": null,
        "cadangan": null,
        "sesi": []
      }
    ],
    "putaran_kadep": null,
    "hasil_akhir": {
      "sudah_final": false,
      "kadep": null,
      "ketang": []
    }
  }
}
```

#### B. Putaran Pertama SI Selesai (Dilihat oleh Maba SI)

```json
{
  "status_code": 200,
  "message": "Papan hasil berhasil diambil",
  "data": {
    "tahap": "voting",
    "ada_hasil": true,
    "prodi_saya": "SI",
    "putaran_pertama": [
      {
        "prodi": "SI",
        "nama_prodi": "Sistem Informasi",
        "selesai": true,
        "finalis": {
          "id_caketang": "a1...",
          "nama": "Andi",
          "prodi": "Sistem Informasi",
          "foto": "https://..."
        },
        "cadangan": {
          "id_caketang": "b2...",
          "nama": "Budi",
          "prodi": "Sistem Informasi",
          "foto": "https://..."
        },
        "sesi": [
          {
            "id_sesi": "9f1c...",
            "jenis": "caketang",
            "judul": "Pemilihan Calon Ketua Angkatan Sistem Informasi",
            "prodi": "SI",
            "nama_prodi": "Sistem Informasi",
            "urutan": 1,
            "pengulangan": false,
            "status": "selesai",
            "dibuka_at": "2026-10-24T09:00:00+07:00",
            "ditutup_at": "2026-10-24T09:30:00+07:00",
            "jumlah_suara": 312,
            "jumlah_berhak": 333,
            "perolehan": [
              {
                "id_caketang": "a1...",
                "nama": "Andi",
                "prodi": "Sistem Informasi",
                "foto": "https://...",
                "jumlah_suara": 150,
                "peringkat": 1,
                "seri": false,
                "persentase": 48.1
              },
              {
                "id_caketang": "b2...",
                "nama": "Budi",
                "prodi": "Sistem Informasi",
                "foto": "https://...",
                "jumlah_suara": 100,
                "peringkat": 2,
                "seri": false,
                "persentase": 32.1
              },
              {
                "id_caketang": "c3...",
                "nama": "Citra",
                "prodi": "Sistem Informasi",
                "foto": "https://...",
                "jumlah_suara": 62,
                "peringkat": 3,
                "seri": false,
                "persentase": 19.9
              }
            ]
          }
        ]
      }
    ],
    "putaran_kadep": null,
    "hasil_akhir": {
      "sudah_final": false,
      "kadep": null,
      "ketang": []
    }
  }
}
```

#### C. Putaran Kadep Selesai (Disertai Riwayat Pemungutan Ulang karena Seri)

```json
{
  "putaran_kadep": {
    "selesai": true,
    "pemenang": {
      "id_caketang": "d4...",
      "nama": "Dewi",
      "prodi": "Pendidikan Teknologi Informasi",
      "foto": "https://...",
      "visi": "",
      "misi": ""
    },
    "sesi": [
      {
        "jenis": "kadep",
        "judul": "Pemilihan Ketua Departemen",
        "urutan": 1,
        "pengulangan": false,
        "jumlah_suara": 900,
        "perolehan": [
          {
            "id_caketang": "d4...",
            "nama": "Dewi",
            "peringkat": 1,
            "seri": true,
            "jumlah_suara": 450,
            "persentase": 50.0
          },
          {
            "id_caketang": "a1...",
            "nama": "Andi",
            "peringkat": 1,
            "seri": true,
            "jumlah_suara": 450,
            "persentase": 50.0
          }
        ]
      },
      {
        "jenis": "kadep",
        "judul": "Pemilihan Ketua Departemen — Pemungutan Ulang",
        "urutan": 2,
        "pengulangan": true,
        "jumlah_suara": 880,
        "perolehan": [
          {
            "id_caketang": "d4...",
            "nama": "Dewi",
            "peringkat": 1,
            "seri": false,
            "jumlah_suara": 490,
            "persentase": 55.7
          },
          {
            "id_caketang": "a1...",
            "nama": "Andi",
            "peringkat": 2,
            "seri": false,
            "jumlah_suara": 390,
            "persentase": 44.3
          }
        ]
      }
    ]
  }
}
```

---

### Kamus Data / Arti Field

| Field                            | Tipe            | Penjelasan                                                                                                                                                                                         |
| :------------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ada_hasil`                      | Boolean         | `false` = render _empty state_. `true` = minimal sudah ada satu sesi yang ditutup.                                                                                                                 |
| `putaran_pertama[].sesi`         | Array           | Seluruh riwayat sesi yang sudah ditutup untuk prodi tersebut (urut dari sesi pertama). Jika panjangnya $>1$, berarti sempat terjadi putaran ulang akibat seri. Selalu array (tidak pernah `null`). |
| `selesai`                        | Boolean         | Penanda apakah penentuan finalis dan cadangan sudah tuntas. Bernilai `false` jika finalis juara 1 sudah jelas namun posisi cadangan (peringkat 2) masih memerlukan putaran ulang.                  |
| `finalis` / `cadangan`           | Object / `null` | Kandidat yang maju ke putaran kadep (`finalis`) atau pengganti ketang jika finalis terpilih menjadi kadep (`cadangan`). Bernilai `null` sampai hasil dipastikan.                                   |
| `perolehan[]`                    | Array           | Daftar kandidat terurut berdasarkan `peringkat`. Jika skor seri, peringkat berikutnya melompat (contoh: 1, 1, 3).                                                                                  |
| `seri`                           | Boolean         | `true` bila kandidat berbagi peringkat yang sama dengan kandidat lain di sesi tersebut.                                                                                                            |
| `persentase`                     | Float           | Porsi suara terhadap total `jumlah_suara` sesi dengan pembulatan 1 angka di belakang koma (total akumulasi bisa $99.9\%$ atau $100.1\%$).                                                          |
| `jumlah_suara` / `jumlah_berhak` | Integer         | Total suara masuk vs jumlah DPT sesi tersebut. Digunakan untuk indikator partisipasi pemilih (misal: "312 dari 333 mahasiswa telah memilih").                                                      |
| `putaran_kadep`                  | Object / `null` | Bernilai `null` hingga sesi kadep putaran pertama resmi ditutup panitia.                                                                                                                           |
| `putaran_kadep.pemenang`         | Object / `null` | Terisi bila sesi kadep terakhir memiliki pemenang tunggal peringkat 1 tanpa status seri. `null` selama status masih seri.                                                                          |
| `hasil_akhir`                    | Object          | Identik dengan respons `GET /api/stf/hasil`. Terisi penuh setelah panitia menekan tombol finalisasi.                                                                                               |

---

## 04. Kartu Suara Tanpa Login

```http
GET /api/stf/pemilihan
Authorization: Bearer <token> (opsional)
```

Dengan token maba yang valid, data kartu suara akan dikembalikan seperti biasa.  
Tanpa token (atau menggunakan token admin), format data yang dikembalikan tetap sama namun tanpa metadata personal:

```json
{
  "status_code": 200,
  "message": "Data pemilihan berhasil diambil",
  "data": {
    "tahap": "perkenalan",
    "berhak_memilih": false,
    "alasan_tidak_berhak": "belum_login",
    "sesi": null,
    "sudah_memilih": false,
    "pilihan_saya": null,
    "kandidat": [
      {
        "id_caketang": "a1...",
        "nama": "Andi",
        "prodi": "Sistem Informasi",
        "visi": "...",
        "misi": "...",
        "foto": "https://..."
      },
      {
        "id_caketang": "d4...",
        "nama": "Dewi",
        "prodi": "Pendidikan Teknologi Informasi",
        "visi": "...",
        "misi": "...",
        "foto": "https://..."
      },
      {
        "id_caketang": "f6...",
        "nama": "Fajar",
        "prodi": "Teknologi Informasi",
        "visi": "...",
        "misi": "...",
        "foto": "https://..."
      }
    ]
  }
}
```

### Logika Tampilan Array `kandidat` untuk Tamu (Guest)

| Nilai `tahap` | Isi Array `kandidat`                 | Rekomendasi Tampilan UI FE                                                                                                     |
| :------------ | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `tertutup`    | `[]` (Kosong)                        | Tampilkan informasi gerbang pemilihan belum dibuka.                                                                            |
| `perkenalan`  | Semua kandidat dari 3 prodi          | Kelompokkan daftar kandidat berdasarkan field `prodi`.                                                                         |
| `voting`      | Kandidat dari sesi yang sedang aktif | Tampilkan daftar kandidat disertai _banner_ ajakan login untuk memilih. _(Pada sesi kadep, hanya kandidat kadep yang muncul)._ |
| `menunggu`    | `[]` (Kosong)                        | Tahap voting aktif, namun belum ada sesi yang dibuka.                                                                          |
| `hasil`       | `[]` (Kosong)                        | Redirect atau arahkan pengguna membuka `/papan-hasil` atau `/hasil`.                                                           |

> **Catatan Tombol Voting:** Tombol "Pilih" / Submit Suara hanya boleh diaktifkan jika `berhak_memilih === true`.

---

## 05. Hasil Akhir (Finalized)

```http
GET /api/stf/hasil
```

Format respons tidak mengalami perubahan struktur, kini dapat diakses secara publik tanpa token.

```json
{
  "data": {
    "sudah_final": true,
    "kadep": {
      "jabatan": "kadep",
      "prodi": "PTI",
      "nama_prodi": "Pendidikan Teknologi Informasi",
      "id_caketang": "d4...",
      "nama": "Dewi",
      "foto": "https://..."
    },
    "ketang": [
      {
        "jabatan": "ketang",
        "prodi": "PTI",
        "nama": "Eko",
        "foto": "https://..."
      },
      {
        "jabatan": "ketang",
        "prodi": "SI",
        "nama": "Andi",
        "foto": "https://..."
      },
      {
        "jabatan": "ketang",
        "prodi": "TI",
        "nama": "Fajar",
        "foto": "https://..."
      }
    ]
  }
}
```

_Kondisi sebelum finalisasi:_

```json
{
  "data": {
    "sudah_final": false,
    "kadep": null,
    "ketang": []
  }
}
```

---

## 06. Checklist Implementasi Frontend (FE)

- [ ] **Penanganan Header Autentikasi:** Kirimkan header `Authorization` jika token tersedia di local storage / cookie. Halaman publik tidak perlu mengirimkan token.
- [ ] **Polling Data:** Gunakan interval polling antara **5–10 detik** untuk mengikuti status penutupan sesi dari panitia secara _real-time_.
- [ ] **Deteksi State Kosong (_Empty State_):** Selalu lakukan pengecekan berbasis flag boolean `ada_hasil`, bukan dari `array.length`, karena endpoint tetap mengembalikan array kosong `[]`.
- [ ] **Render Riwayat Sesi:** Render seluruh elemen dalam array `sesi[]` secara berurutan (bukan hanya indeks terakhir) agar transparansi proses putaran ulang bila terjadi perolehan suara seri dapat dilihat oleh mahasiswa.
- [ ] **Error Handling & Status Code:**
  - Endpoint GET publik/opsional selalu mengembalikan `200 OK` (tidak pernah `401 Unauthorized`).
  - Penanganan status `429 Too Many Requests` jika pemanggilan melebihi batas _rate limit_ ($>2$ request per detik per sesi login).
  - Penanganan status `500 Internal Server Error`.
- [ ] **Submit Suara:** Endpoint pengiriman suara `POST /api/stf/pemilihan` **wajib** menggunakan token maba. Permintaan tanpa token akan menghasilkan response `401 Unauthorized`.
