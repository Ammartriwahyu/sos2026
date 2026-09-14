# Dokumentasi API STF Voting (Shape The Future)

Dokumen ini berisi spesifikasi lengkap API STF Voting berdasarkan koleksi Postman terbaru. Mencakup Autentikasi, Alur Mahasiswa, Kendali Admin Hari-H, dan Kelola Kandidat.

## Konsep Sistem (Wajib Dipahami)

1. **Berbasis Sesi, Bukan Putaran Tetap:** Pemilihan tidak dimodelkan sebagai putaran tetap, melainkan sebagai sesi. Alasannya: bila terjadi seri, pemungutan diulang HANYA untuk kandidat yang seri, dan pengulangan bisa terjadi berkali-kali sampai ada pemenang tunggal. Jumlah sesi tidak diketahui di muka.
2. **Smart Server, Dumb Client:** Frontend tidak perlu tahu sesi mana yang sedang berjalan. Cukup panggil `GET /api/stf/pemilihan`; server menentukan sesi yang berlaku bagi si pemilih berdasarkan prodinya dan tahap pemilihan saat itu. Saat mengirim suara, klien HANYA mengirim `id_caketang` — sesi ditentukan server dan tidak diambil dari permintaan.
3. **Jangan simpan `id_sesi` untuk dikirim balik:** Kalau frontend menyimpannya lalu memakainya setelah panitia membuka sesi ulang, yang terkirim adalah sesi yang salah dan justru ditolak.
4. **Bentuk Respons Dasar:** Semua endpoint memakai pembungkus JSON standar:
   ```json
   { "status_code": 200, "message": "...", "data": {} }
   ```

---

## 1. Autentikasi (Auth)

Ambil token lebih dulu.

### POST `/api/login` (Login Maba)

Untuk maba yang ada di daftar Maba Special, pakai password khusus dari panitia — bukan password SIAM.

```json
{
  "emailornim": "265150407111012",
  "password": "password-anda"
}
```

### POST `/api/login` (Login Admin)

```json
{
  "emailornim": "nim-admin",
  "password": "password-admin"
}
```

---

## 2. Alur Mahasiswa (Frontend Voting)

Dua endpoint ini adalah seluruh yang dibutuhkan halaman voting.

### GET `/api/stf/pemilihan` (Ambil Kartu Suara)

Mengembalikan seluruh keadaan halaman voting dalam satu panggilan.
**Penyegaran otomatis:** Sebaiknya halaman menyegarkan sendiri sekitar 10 detik sekali, supaya peserta melihat sesi ulang terbuka tanpa memuat ulang halaman. Jangan lebih cepat: batas laju per mahasiswa adalah 2 permintaan per detik dengan toleransi awal 30 permintaan.

**Keadaan yang harus ditangani frontend:**

| Kondisi State                                        | Bentuk Data                 | Tampilan UI                                       |
| ---------------------------------------------------- | --------------------------- | ------------------------------------------------- |
| `berhak_memilih: false`, alasan pemutihan            | Sesi & Kandidat kosong      | "Mahasiswa pemutihan tidak memiliki hak suara"    |
| `berhak_memilih: false`, alasan prodi_tidak_dikenali | Sesi & Kandidat kosong      | "Data prodi kamu belum lengkap, hubungi panitia"  |
| `sesi: null`                                         | Berhak, tapi belum ada sesi | "Pemilihan belum dibuka"                          |
| `sudah_memilih: true`                                | `pilihan_saya` terisi       | Tampilkan kartu pilihan, disable tombol.          |
| `sesi.pengulangan: true`                             | Kandidat lebih sedikit      | Beri tahu ini pemungutan ulang karena hasil seri. |

**Contoh Response Sukses:**

```json
{
  "status_code": 200,
  "message": "Data pemilihan berhasil diambil",
  "data": {
    "berhak_memilih": true,
    "prodi": "SI",
    "nama_prodi": "Sistem Informasi",
    "sesi": {
      "id_sesi": "8f3c1d2e-1a2b-4c3d-9e8f-0a1b2c3d4e5f",
      "jenis": "caketang",
      "judul": "Pemilihan Calon Ketua Angkatan Sistem Informasi",
      "prodi": "SI",
      "nama_prodi": "Sistem Informasi",
      "urutan": 1,
      "pengulangan": false,
      "dibuka_at": "2026-10-24T09:00:00+07:00"
    },
    "sudah_memilih": false,
    "pilihan_saya": null,
    "kandidat": [
      {
        "id_caketang": "si-1",
        "nama": "Andi Pratama",
        "prodi": "Sistem Informasi",
        "visi": "Visi kandidat...",
        "misi": "Misi kandidat...",
        "foto": "https://storage.supabase.co/....jpg"
      }
    ]
  }
}
```

### POST `/api/stf/pemilihan` (Kirim Suara)

Badan permintaan hanya berisi kandidat pilihan. Sesi ditentukan server, tidak dikirim klien.

```json
{
  "id_caketang": "si-1"
}
```

**Sifat Idempoten:** Mengirim ulang pilihan yang sama dijawab 200 OK. Ini disengaja agar kalau jaringan putus setelah suara tersimpan, percobaan ulang tetap berhasil dan peserta tidak panik. Yang ditolak 409 hanya percobaan mengganti pilihan ke kandidat berbeda.

**Kode Galat (Error Codes):**

- **400:** Kandidat tidak terdaftar pada sesi ini (Muat ulang kartu suara).
- **403:** Bukan pemilih sah pemutihan / prodi kosong (Tampilkan alasan, sembunyikan tombol).
- **409:** Belum ada sesi dibuka, atau sudah memilih kandidat lain (Muat ulang kartu suara lalu tampilkan keadaan terbaru).
- **429:** Terlalu sering mengirim (Beri jeda, jangan retry otomatis beruntun).

### GET `/api/stf/hasil` (Hasil Akhir)

Boleh diakses siapa pun yang sudah login, termasuk mahasiswa pemutihan.
Sebelum finalisasi, `sudah_final` bernilai false, `kadep` bernilai null, dan `ketang` berupa array kosong.
Ketang di prodi yang sama dengan kadep adalah peringkat 2 putaran pertama prodi itu, karena finalisnya naik menjadi kadep.

---

## 3. Alur Admin — Kendali Pemilihan (Hari-H)

Urutkan dari atas ke bawah untuk menjalankan keseluruhan alur hari-H.

### 1. GET `/api/stf/sesi/papan` (Papan Kendali)

Endpoint utama halaman admin. Satu panggilan untuk seluruh keadaan.
Pakai `siap_buka_kadep` dan `siap_finalisasi` untuk mengaktifkan atau menonaktifkan tombol, sehingga panitia tidak bisa menekan tahap yang belum waktunya.

### 2. POST `/api/stf/sesi/putaran-pertama`

Membuat satu sesi untuk tiap prodi dalam keadaan tertutup. Panitia yang menentukan kapan dibuka.
Aman ditekan dua kali: prodi yang sesinya sudah ada dilewati, dan respons berisi array kosong.

### 3. GET `/api/stf/sesi` (Daftar semua sesi)

Seluruh sesi beserta perolehan suara. Sesi yang masih berjalan memakai penghitungan langsung; sesi yang sudah ditutup memakai hasil yang dibekukan.

### 4. POST `/api/stf/sesi/{id_sesi}/buka` (Buka sesi)

Membuka sesi sehingga mahasiswa bisa memilih. Menolak dengan 409 bila sesi sudah pernah ditutup.

### 5. GET `/api/stf/sesi/{id_sesi}` (Pantau satu sesi / Papan hasil langsung)

Untuk papan hasil langsung saat pemungutan berjalan.
`jumlah_berhak` adalah jumlah mahasiswa yang punya hak suara di prodi tersebut — pakai bersama `jumlah_suara` untuk menampilkan tingkat partisipasi.

### 6. POST `/api/stf/sesi/{id_sesi}/tutup` (Tutup Sesi / Bekukan hasil)

Menutup sesi, membekukan hasil, memberi peringkat, dan mendeteksi seri.

- Bila seri, sesi ulang berisi kandidat yang seri saja otomatis disiapkan dalam keadaan tertutup. Id-nya ada di `id_sesi_ulang`.
- Aturan peringkat: perolehan sama mendapat peringkat sama, peringkat berikutnya melompat. (Contoh: 100, 50, 50, 30 menghasilkan peringkat 1, 2, 2, 4).
- Hanya peringkat 1 dan 2 yang bisa memicu pengulangan — peringkat 3 ke bawah tidak memengaruhi hasil.

### 7. POST `/api/stf/sesi/kadep` (Siapkan sesi kadep)

Menyusun sesi pemilihan kadep dari tiga finalis, dalam keadaan tertutup.
Menolak dengan 409 bila masih ada prodi yang belum selesai, atau bila sesi kadep sudah pernah dibuat.
Setelah dibuka, mahasiswa memakai halaman voting yang sama — server otomatis mengarahkan ke sesi kadep.

### 8. POST `/api/stf/sesi/finalisasi` (Finalisasi)

Menetapkan kadep dan tiga ketang, lalu menyimpannya sekali.
Kursi ketang di prodi sang kadep diisi peringkat 2 putaran pertama prodi itu.
Menolak dengan 409 bila pemilihan kadep belum ditutup atau hasilnya masih seri.

---

## 4. Admin — Kelola Kandidat (CRUD)

Endpoint CRUD caketang tidak mengalami perubahan sama sekali. Dimasukkan di sini hanya untuk kelengkapan.

### POST `/api/stf` (Tambah Kandidat)

- **Content-Type:** `multipart/form-data`
- **Fields:** `nama`, `prodi` (SI, PTI, atau TI), `visi`, `misi`, `foto` (opsional: .jpg, .jpeg, .png, .webp).

### GET `/api/stf/?prodi=SI` (Daftar Kandidat + jumlah suara)

- **Query Params:** `?prodi=SI` (opsional: SI, PTI, TI), `?nama=...` (opsional, pencarian sebagian).

### GET `/api/stf/{id_caketang}` (Detail Kandidat)

### PATCH `/api/stf/{id_caketang}` (Ubah Kandidat)

- **Content-Type:** `multipart/form-data`
- **Fields:** `nama`, `prodi`, `visi`, `misi`, `foto` (opsional; kosongkan bila foto tidak diganti).

### DELETE `/api/stf/{id_caketang}` (Hapus Kandidat)

Menghapus kandidat dari database.
