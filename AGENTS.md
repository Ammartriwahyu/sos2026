# AGENTS.md — Panduan AI untuk Project SOS 2026

> File ini adalah "peta jalan" untuk asisten AI (Claude, dsb.) yang bekerja di repo ini.
> Baca dulu sebelum menyentuh kode apa pun. Tujuannya: AI paham konteks, ikut konvensi
> tim, dan tidak merusak pekerjaan yang sudah jadi.

---

## 1. Konteks Project

**SOS (Synergy of Symphony)** adalah website Penerimaan Mahasiswa Baru (PMB) /
ospek Departemen Sistem Informasi, Universitas Brawijaya. Repo ini adalah kode
**tahun lalu (2025)** yang sedang **di-refactor untuk edisi 2026**.

| Field | Value |
|---|---|
| Nama project | SOS — Synergy of Symphony 2026 |
| Organisasi | `SOS-KBMDSI` (repo: `frontendsos26`) |
| Domain produksi | `sos.kbmdsi.com` |
| Target user | Maba SI + panitia (admin/PJL/SQC) |
| Branch kerja saat ini | `claude/sos-setup-refactor-1xfu72` |
| Base branch | `develop` |

### Filosofi refactor (WAJIB dipahami)

Kode 2025 dipakai ulang karena **logic-nya masih valid**. Yang berubah tiap tahun
umumnya **tampilan (design system) dan aset**, bukan alur bisnis. Jadi:

- **Pertahankan logic** (hooks, service API, container, middleware) selama fungsinya
  masih sama. Jangan tulis ulang dari nol tanpa alasan.
- **Ganti hanya lapisan visual** (warna, aset, tema) mengikuti design system 2026.
- **Fitur baru** = logic baru; boleh dibuat dari awal, tapi tetap ikuti pola folder
  yang ada.

### Status pengerjaan (per 2026-07-30)

| Bagian | Status |
|---|---|
| Setup project (update library, struktur, aset) | ✅ Selesai |
| Design system 2026 (warna + tema) di `globals.css` | ✅ Selesai |
| Halaman `coming-soon` (versi 2026) | ✅ Selesai |
| README dokumentasi | ✅ Selesai |
| **Semua halaman lain** (home, akademik, peta, stf, aktivitas, profile, admin, login, not-found) | ⚠️ **Masih tampilan 2025** — belum di-refactor ke 2026 |

> Artinya: mayoritas pekerjaan ke depan adalah **memigrasikan halaman-halaman 2025
> ke look & feel 2026** satu per satu, memakai design system dan aset yang sudah ada.

---

## 2. Tim

| Nama | Peran |
|---|---|
| **Ammar** (`ammartriwahyu@gmail.com`) | Lead Front End Developer — pemilik keputusan |
| **Zaki** | Front End Developer |
| **Rafa** | Front End Developer |
| **Viona** | Front End Developer |
| **King Dirga** | Front End Developer |


### Pembagian Job per Halaman (PIC)

Setiap halaman/modul punya penanggung jawab (PIC). **Sebelum mengubah sebuah
halaman, cek PIC-nya** — koordinasikan lewat Ammar bila perlu menyentuh milik orang lain.

| Halaman / Modul | PIC | Lokasi kode utama |
|---|---|---|
| **Coming Soon** | Ammar | `app/coming-soon/` · `feature/coming-soon/` |
| **Layout (Navbar & Footer)** | Zaki | `shared/components/navbar/` · `shared/components/footer/` · `app/(user)/layout.tsx` |
| **Landing / Dashboard** | King Dirga | `app/(user)/home/` · `feature/(user)/home/` · `app/page.tsx` |
| **Peta** | Ammar | `app/(user)/peta/` · `feature/(user)/peta/` |
| **Aktivitas** (presensi, penugasan, penilaian) | Rafa | `app/(user)/aktivitas/` · `feature/(user)/{aktivitas,penugasan,presensi,penilaian,kuis}/` |
| **Akademik** | Ammar | `app/(user)/akademik/` · `feature/(user)/akademik/` |
| **STF** | Zaki | `app/(user)/stf/` · `feature/(user)/stf/` |
| **Login & Edit Profile** | Zaki | `app/(auth)/login/` · `feature/(auth)/login/` · `app/(user)/profile/` · `feature/(user)/profile/` |
| **Error 404** | Ammar | `app/not-found.tsx` · `feature/not-found/` |
| **Admin** | Viona & Zaki | `app/admin/` · `feature/(admin)/` |

> Catatan untuk AI: saat mengerjakan sebuah halaman, ikuti pola & keputusan PIC-nya.
> Kalau tugas menyentuh beberapa halaman milik PIC berbeda, kerjakan sesuai instruksi
> tapi sebutkan area mana milik siapa agar mudah dikoordinasikan.

---

## 3. Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | **Next.js 15** (App Router, RSC) |
| Bahasa | **TypeScript 5** (strict mode) |
| UI Runtime | **React 19** |
| Styling | **Tailwind CSS v4** (config via `@theme` di CSS, bukan `tailwind.config.js`) |
| Komponen primitif | **Radix UI** + pola **shadcn/ui** (style `new-york`) |
| Ikon | **lucide-react** |
| Data fetching | **TanStack Query** (`@tanstack/react-query`) |
| Tabel | **TanStack Table** |
| HTTP client | **Axios** (singleton `ApiCore` di `src/api/core`) |
| Validasi | **Zod 4** |
| Animasi | **framer-motion 12** *(rencana migrasi ke `motion/react`)* |
| Auth | **jose** (verifikasi JWT) + **js-cookie** |
| Toast | **react-toastify** |

**Prasyarat lokal:** Node.js v20+ (LTS), npm v10+.

---

## 4. Arsitektur & Struktur Folder

Arsitektur **feature-based** dengan pemisahan tegas antara *route*, *logic fitur*,
dan *kode lintas fitur*.

```
src/
├── app/            # Next.js App Router — HANYA routing & komposisi tipis
│   ├── (auth)/     #   route group: login
│   ├── (user)/     #   route group: home, akademik, peta, stf, aktivitas, profile
│   ├── admin/      #   halaman panitia (dashboard, penugasan, stf, presensi, dll)
│   ├── coming-soon/#   halaman aktif 2026
│   ├── ds/         #   halaman preview Design System (lihat komponen & warna)
│   ├── api/        #   route handler (mis. /api/auth/[action])
│   ├── layout.tsx  #   root layout: font Poppins + upanddownnormal, metadata
│   └── page.tsx
│
├── feature/        # LOGIC per fitur — di sinilah mayoritas kerja
│   ├── (user)/<fitur>/{components,container,hooks,data,types}
│   ├── (admin)/<fitur>/...
│   ├── coming-soon/{components,container,hooks}
│   └── ds/         #   isi halaman design system
│
├── shared/         # Dipakai lintas fitur
│   ├── components/{ui,navbar,footer,admin,background,table,filter,icon,provider}
│   ├── hooks/  context/  data/  type/  utils/   (mis. utils/font.ts, utils/metadata.ts)
│
├── api/
│   ├── core/AxiosInstance.ts     # singleton ApiCore (interceptor, baseURL dari env)
│   └── services/{admin,user,select,auth}/*.ts   # service layer per domain
│
├── assets/         # Gambar, font, ikon
│   ├── assetsos26/{decorations,icons,illustrasions}   # ASET TEMA 2026 (space/meteor)
│   └── <fitur>/    #   aset lama per fitur (2025)
│
├── lib/            # helper umum: utils.ts (cn), downloadHelper.ts
├── styles/globals.css   # DESIGN SYSTEM 2026 (@theme: warna, font, animasi)
└── middleware.ts   # proteksi route berbasis JWT + role
```

### Aturan lapisan (jangan dilanggar)

- **`app/page.tsx`** harus tipis: cukup import container dari `feature/`. Jangan taruh
  logic berat di file route.
- **`feature/<x>/container/`** = orkestrasi (state, data fetching, susun komponen).
- **`feature/<x>/components/`** = presentational, sebisa mungkin tanpa side-effect.
- **`feature/<x>/hooks/`** = logic reusable khusus fitur itu.
- **Komponen yang dipakai >1 fitur** → naikkan ke `shared/components/`.
- **Panggilan API** selalu lewat `api/services/...`, bukan `axios` langsung di komponen.

### Alias import

`@/*` → `src/*`. Selalu pakai alias, hindari `../../../`.
Contoh: `import { cn } from "@/lib/utils"`.

---

## 5. Design System 2026

Sumber kebenaran ada di **`src/styles/globals.css`** (blok `@theme`). Lihat previewnya
di route **`/ds`**.

- **Warna primary 2026:** merah maroon — `--color-primary-500: #9c0221` (skala 100–900).
- **Secondary:** krem/cream (`#e7dfd2` dst).
- Tersedia sistem warna lengkap: black, blue, green, orange, pink, violet, yellow
  (masing-masing light/normal/dark + hover/active), plus alert (danger/success) dan
  surface. **Pakai token ini, jangan hardcode hex** di komponen.
- **Font:** `--font-poppins` (utama) & `--font-upanddownnormal` (display). Di-load lewat
  `shared/utils/font.ts` dan dipasang di root layout.
- **Aset tema 2026:** `src/assets/assetsos26/` — bertema luar angkasa (meteor, bintang,
  planet, boss, timer). Gunakan ini saat me-refactor halaman lama, bukan aset 2025.
- **Utility custom:** `.mycontainer` (padding responsif standar), `.bg-login`.

> Saat memindahkan halaman 2025 → 2026: ganti warna ke token design system, tukar aset
> ke `assetsos26/`, samakan tipografi. **Jangan** ubah struktur data / props tanpa alasan.

---

## 6. Konvensi Kode & Git

### Penamaan
- Komponen React & file komponen: **PascalCase** (`ProdiSection.tsx`).
- Hook: **camelCase** diawali `use` (`useQuizGame.ts`).
- Folder fitur: **kebab-case** (`detail-tugas`).
- Utility class merge selalu via `cn()` dari `@/lib/utils`.

### Branch
Format: `<tipe>/<deskripsi-kebab-case>` — tipe: `feat`, `fix`, `chore`, `docs`, `refactor`.

### Commit — **Conventional Commits (di-enforce commitlint)**
Format: `<tipe>(scope opsional): deskripsi`. Contoh nyata dari repo ini:
```
feat: add asset for comingsoon page
fix: update from 2025 to 2026
refactor: rename downloadHelper typo and remove unused folders
chore(deps): bump minor versions within semver range
docs: write project README in Indonesian
```
- Tulis pesan dalam **bahasa yang konsisten** dengan riwayat (campuran ID/EN diterima,
  ikuti gaya yang ada).
- Jangan cantumkan nama model AI / identitas internal di commit, PR, atau komentar kode.

### Pull Request
- Minimal 1 reviewer.
- **Jangan buat PR kecuali diminta eksplisit oleh Ammar.**

---

## 7. Quality Gate (Husky) — WAJIB LOLOS

Git hook aktif; **jangan pakai `--no-verify`** untuk menerobosnya.

| Hook | Yang dijalankan |
|---|---|
| `pre-commit` | `tsc --noEmit` (type check) → lalu `lint-staged` (eslint --fix + prettier) |
| `commit-msg` | `commitlint` (validasi format Conventional Commits) |
| `pre-push` | `npm run build` — kalau build gagal, push dibatalkan |

**Konsekuensi untuk AI:** sebelum menyatakan pekerjaan selesai, pastikan:
1. Tidak ada type error (`npx tsc --noEmit`).
2. Lint bersih (`npm run lint`).
3. `npm run build` sukses.

---

## 8. Skrip

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Dev server → http://localhost:3000 |
| `npm run build` | Build produksi (dipakai pre-push) |
| `npm run start` | Jalankan hasil build |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |

---

## 9. Environment Variables

Dibaca dari `.env.local` (di-gitignore). Yang dipakai kode:

| Variable | Dipakai di | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `api/core/AxiosInstance.ts` | Base URL backend |
| `JWT_SECRET` | `middleware.ts` | Secret verifikasi JWT (server-side) |

> Jangan pernah commit nilai env asli. Kalau butuh var baru, dokumentasikan di README.

---

## 10. Auth & Role

- Middleware (`src/middleware.ts`) memverifikasi cookie `auth_session` (JWT via `jose`)
  dan mengatur akses berbasis **role**.
- Role admin: `admin`, `superadmin`, `sqc`, `pjl`. User biasa = maba.
- Route `/admin/*` & `/profile/*` diproteksi. User tanpa role valid ditendang ke `/login`.
- Kalau menyentuh alur auth/role, uji manual semua cabang redirect sebelum push.

---

## 11. Aturan Kerja untuk AI (Do & Don't)

**DO**
- Baca file terkait dulu sebelum mengubah; ikuti pola folder & penamaan yang sudah ada.
- Refactor visual halaman lama pakai design system + `assetsos26/`.
- Pertahankan logic 2025 yang masih valid.
- Jalankan type-check, lint, dan build sebelum bilang "selesai".
- Commit dengan format Conventional Commits ke branch `claude/sos-setup-refactor-1xfu72`.
- Kalau ragu soal keputusan desain/produk, **tanya Ammar** dulu.

**DON'T**
- Jangan push ke `develop`/`main` tanpa izin eksplisit.
- Jangan buat PR tanpa diminta.
- Jangan tulis ulang logic yang sudah jalan hanya demi gaya.
- Jangan hardcode warna/hex — pakai token design system.
- Jangan pakai `--no-verify` untuk melewati git hook.
- Jangan hapus folder/fitur lama tanpa konfirmasi (banyak yang masih dipakai ulang).

---

## 12. Catatan Teknis yang Perlu Diingat

- **Tailwind v4**: konfigurasi tema ada di CSS (`@theme` di `globals.css`), **bukan**
  `tailwind.config.js`. Tambah warna/token baru di sana.
- **Migrasi animasi**: rencana pindah dari `framer-motion` → `motion/react` (API identik,
  hanya import path berubah). Belum dieksekusi.
- **shadcn**: `components.json` memakai style `new-york`, base color `neutral`, alias
  `@/components`, `@/lib`, `@/hooks`. Komponen UI hasil generate diletakkan di
  `shared/components/ui`.
- **next.config.ts**: di production, `console.*` di-drop via Terser; sourcemap dimatikan;
  `next/image` hanya izinkan host tertentu (google, supabase, youtube) — tambah host baru
  di `remotePatterns` bila perlu.

---

_Update file ini setiap kali ada perubahan struktur, konvensi, atau status pengerjaan
yang signifikan, supaya sesi AI berikutnya tetap punya konteks yang akurat._
