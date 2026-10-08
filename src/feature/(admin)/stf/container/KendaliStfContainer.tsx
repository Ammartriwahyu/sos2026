"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  RefreshCw,
  Play,
  Square,
  Users,
  Trophy,
  RotateCcw,
  CheckCircle,
} from "lucide-react";
import { useKendaliStf } from "../hooks/useKendaliStf";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";

const KendaliStfContainer = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetKey, setResetKey] = useState("");
  const {
    papanData,
    isLoading,
    ubahTahap,
    isUbahTahapLoading,
    siapkanPutaranPertama,
    bukaSesi,
    tutupSesi,
    siapkanSesiKadep,
    finalisasi,
    resetSesi,
    isResetLoading,
  } = useKendaliStf();

  if (isLoading) {
    return <div className="p-8">Memuat papan kendali...</div>;
  }

  if (!papanData) {
    return <div className="p-8 text-red-500">Gagal memuat papan kendali.</div>;
  }

  // Tombol A selesai jika setidaknya satu prodi sudah pernah punya sesi caketang
  // Backend menyediakan flag siap_buka_kadep saat putaran angkatan telah selesai
  const isAngkatanPrepared =
    papanData?.prodi?.some((p) => p.selesai) ||
    papanData?.siap_buka_kadep ||
    papanData?.siap_finalisasi ||
    papanData?.hasil_akhir?.sudah_final ||
    false;

  // Tombol B selesai jika sesi_kadep sudah ada (dibuat oleh backend)
  const isKadepPrepared = !!papanData?.sesi_kadep;

  // Tombol C selesai jika finalisasi sudah dilakukan
  const isFinalisasiDone = papanData?.hasil_akhir?.sudah_final || false;

  // Tombol A hanya bisa diklik jika tahap sudah voting
  const isTahapVoting = papanData?.tahap === "voting";

  const TahapButton = ({ name, value }: { name: string; value: string }) => {
    const isActive = papanData.tahap === value;
    return (
      <Button
        variant={isActive ? "admin" : "admin-outline"}
        onClick={() => ubahTahap(value)}
        disabled={isUbahTahapLoading || isActive}
      >
        {name}
      </Button>
    );
  };

  return (
    <div className="p-4 md:p-8 w-full flex flex-col gap-8 bg-slate-50/30 min-h-screen">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/stf"
          className="flex items-center gap-1/2 text-primary-normal hover:text-primary-normal-hover transition-colors w-fit"
        >
          <ChevronLeft size={24} />
          <span className="text-xl">Kelola Kandidat</span>
        </Link>
        <h1 className="text-3xl md:text-4xl font-semibold text-default-dark">
          Papan Kendali Pemilihan
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Kendali Tahap & Sesi Global */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* TAHAP HALAMAN */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/60 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                1. Tampilan Mahasiswa (UI)
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Mengontrol halaman apa yang dilihat mahasiswa saat ini.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <TahapButton name="Tertutup" value="tertutup" />
              <TahapButton name="Perkenalan" value="perkenalan" />
              <TahapButton name="Voting" value="voting" />
              <TahapButton name="Hasil" value="hasil" />
            </div>
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 mt-2">
              <p className="text-xs text-blue-700 leading-relaxed">
                <span className="font-semibold">Info:</span> Tombol di atas
                berjalan seketika <i>(real-time)</i>. Mahasiswa tidak perlu
                me-refresh browser mereka.
              </p>
            </div>
          </div>

          {/* KONTROL SISTEM VOTING (BACKEND) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/60 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                2. Persiapan Pemilihan (Voting)
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Langkah-langkah untuk mengelola sesi pemilihan. Lakukan secara
                berurutan.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => siapkanPutaranPertama()}
                  className="w-full justify-start gap-3 py-3 transition-all"
                  variant={isAngkatanPrepared ? "admin" : "admin-outline"}
                  disabled={!isTahapVoting || isAngkatanPrepared}
                >
                  {isAngkatanPrepared ? (
                    <CheckCircle size={18} />
                  ) : (
                    <RefreshCw size={18} />
                  )}
                  A. Siapkan Pemilihan Angkatan
                </Button>
                <p className="text-[11px] text-neutral-400 leading-tight px-1">
                  Menyiapkan sistem untuk menerima suara mahasiswa. Tekan tombol
                  ini sebelum membuka bilik suara.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => siapkanSesiKadep()}
                  className="w-full justify-start gap-3 py-3 transition-all"
                  variant={isKadepPrepared ? "admin" : "admin-outline"}
                  disabled={!papanData.siap_buka_kadep || isKadepPrepared}
                >
                  {isKadepPrepared ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Users size={18} />
                  )}
                  B. Siapkan Pemilihan Kadep
                </Button>
                <p className="text-[11px] text-neutral-400 leading-tight px-1">
                  Menyiapkan sistem untuk pemilihan Kepala Departemen (hanya
                  digunakan bila ada putaran kadep).
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => finalisasi()}
                  className="w-full justify-start gap-3 py-3 transition-all"
                  variant={isFinalisasiDone ? "admin" : "admin-outline"}
                  disabled={!papanData.siap_finalisasi || isFinalisasiDone}
                >
                  {isFinalisasiDone ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Trophy size={18} />
                  )}
                  C. Selesaikan & Hitung Hasil Akhir
                </Button>
                <p className="text-[11px] text-neutral-400 leading-tight px-1">
                  Mengunci seluruh bilik suara secara permanen dan menghitung
                  pemenang. Pastikan semua prodi selesai sebelum menekan ini.
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-5 mt-2">
              <Button
                onClick={() => {
                  setIsResetModalOpen(true);
                  setResetKey("");
                }}
                className="w-full justify-start gap-3 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300"
                variant="none"
                disabled={isResetLoading}
              >
                <RotateCcw size={18} /> Reset Ulang Pemilihan
              </Button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Prodi & Sesi Aktif */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/60 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                3. Monitor & Buka/Tutup Bilik Suara
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Pintu masuk suara dari masing-masing program studi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {papanData.prodi.map((p) => {
                const sesiRaw = p.sesi_aktif;
                const sesi = Array.isArray(sesiRaw) ? sesiRaw[0] : sesiRaw;
                const isSesiValid =
                  sesi &&
                  typeof sesi === "object" &&
                  Object.keys(sesi).length > 0 &&
                  sesi.id_sesi;

                return (
                  <div
                    key={p.prodi}
                    className="border border-neutral-200 bg-neutral-50/50 p-5 rounded-2xl flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-[17px] text-neutral-800 leading-tight w-2/3">
                        {p.nama_prodi}
                      </span>
                      {p.selesai ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-[11px] rounded-full font-bold tracking-wide uppercase">
                          Selesai
                        </span>
                      ) : isSesiValid ? (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[11px] rounded-full font-bold tracking-wide uppercase">
                          Berlangsung
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-neutral-200 text-neutral-600 text-[11px] rounded-full font-bold tracking-wide uppercase">
                          Belum Mulai
                        </span>
                      )}
                    </div>

                    {(() => {
                      if (isSesiValid) {
                        // BACKEND FIX: Derive status and defaults if backend omits them
                        const derivedStatus =
                          sesi.status ||
                          (sesi.dibuka_at ? "dibuka" : "tertutup");
                        const suaraMasuk = sesi.jumlah_suara ?? 0;
                        const berhakMemilih = sesi.jumlah_berhak ?? 0;

                        return (
                          <div className="text-sm bg-white p-4 rounded-xl shadow-sm border border-neutral-100 flex flex-col gap-3">
                            <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                              <span className="text-neutral-500 font-medium">
                                Bilik Suara:
                              </span>
                              <span
                                className={`font-bold capitalize ${
                                  derivedStatus === "dibuka"
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                              >
                                {derivedStatus === "dibuka"
                                  ? "Terbuka"
                                  : "Terkunci"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-neutral-500 font-medium">
                                Suara Masuk:
                              </span>
                              <span className="font-bold text-neutral-800 text-base">
                                {suaraMasuk}{" "}
                                <span className="text-neutral-400 text-sm font-medium">
                                  / {berhakMemilih}
                                </span>
                              </span>
                            </div>
                            {sesi.pengulangan && (
                              <div className="text-red-600 bg-red-50 py-1.5 px-3 rounded-lg text-center font-semibold mt-1 text-xs">
                                Pemungutan Ulang (Seri)
                              </div>
                            )}

                            <div className="flex gap-3 mt-3">
                              {derivedStatus === "tertutup" && (
                                <Button
                                  variant="none"
                                  onClick={() => bukaSesi(sesi.id_sesi)}
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 font-semibold transition-colors shadow-sm"
                                >
                                  <Play size={16} className="mr-1.5 inline" />{" "}
                                  Buka Bilik
                                </Button>
                              )}
                              {derivedStatus === "dibuka" && (
                                <Button
                                  variant="none"
                                  onClick={() => tutupSesi(sesi.id_sesi)}
                                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 font-semibold transition-colors shadow-sm"
                                >
                                  <Square size={16} className="mr-1.5 inline" />{" "}
                                  Kunci Bilik
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="text-sm text-neutral-400 italic bg-white p-4 rounded-xl border border-neutral-100 text-center">
                            Belum Disiapkan (Klik Tombol A)
                          </div>
                        );
                      }
                    })()}

                    {p.finalis && (
                      <div className="text-sm mt-1 bg-[var(--color-primary-light)]/30 p-3 rounded-xl border border-[var(--color-primary-light)]">
                        <span className="font-semibold block text-neutral-600 text-xs uppercase mb-1">
                          Finalis (Kadep):
                        </span>
                        <span className="text-primary-normal font-bold text-base">
                          {p.finalis.nama}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sesi Kadep */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200/60 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-neutral-800">
                Sesi Ekstra: Kepala Departemen
              </h2>
              <p className="text-sm text-neutral-500 mt-1">
                Monitor bilik suara spesifik untuk pemilihan Kepala Departemen.
              </p>
            </div>

            {(() => {
              const kadepRaw = papanData.sesi_kadep;
              const kadep = Array.isArray(kadepRaw) ? kadepRaw[0] : kadepRaw;
              const isKadepValid =
                kadep &&
                typeof kadep === "object" &&
                Object.keys(kadep).length > 0 &&
                kadep.id_sesi;

              if (isKadepValid) {
                // BACKEND FIX: Derive status and defaults if backend omits them
                const derivedStatus =
                  kadep.status || (kadep.dibuka_at ? "dibuka" : "tertutup");
                const suaraMasuk = kadep.jumlah_suara ?? 0;
                const berhakMemilih = kadep.jumlah_berhak ?? 0;

                return (
                  <div className="border border-neutral-200 bg-white p-5 rounded-2xl flex flex-col gap-4 max-w-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-neutral-800">
                        {kadep.judul}
                      </span>
                      <span
                        className={`px-3 py-1 text-[11px] rounded-full font-bold uppercase tracking-wide ${
                          derivedStatus === "dibuka"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {derivedStatus === "dibuka" ? "Terbuka" : "Terkunci"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                      <span className="text-neutral-500 font-medium">
                        Suara Masuk:
                      </span>
                      <span className="font-bold text-neutral-800 text-base">
                        {suaraMasuk}{" "}
                        <span className="text-neutral-400 text-sm font-medium">
                          / {berhakMemilih}
                        </span>
                      </span>
                    </div>

                    {kadep.pengulangan && (
                      <div className="text-red-600 bg-red-50 py-2 px-3 rounded-lg text-center font-semibold text-xs">
                        Pemungutan Ulang (Seri)
                      </div>
                    )}

                    <div className="flex gap-3 mt-1">
                      {derivedStatus === "tertutup" && (
                        <Button
                          variant="none"
                          onClick={() => bukaSesi(kadep.id_sesi)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2.5 font-semibold transition-colors shadow-sm"
                        >
                          <Play size={16} className="mr-2 inline" /> Buka Bilik
                        </Button>
                      )}
                      {derivedStatus === "dibuka" && (
                        <Button
                          variant="none"
                          onClick={() => tutupSesi(kadep.id_sesi)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2.5 font-semibold transition-colors shadow-sm"
                        >
                          <Square size={16} className="mr-2 inline" /> Kunci
                          Bilik
                        </Button>
                      )}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="text-sm text-neutral-400 italic bg-neutral-50 p-5 rounded-xl border border-neutral-100">
                    Sesi Kadep belum disiapkan. Pastikan sudah mengklik &quot;B.
                    Siapkan Pemilihan Kadep&quot; di panel kiri jika ingin
                    memulai sesi ini.
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset Seluruh Sesi"
      >
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm text-neutral-600">
            PERINGATAN: Tindakan ini sangat berbahaya dan akan{" "}
            <b>MENGHAPUS SEMUA HASIL VOTING!</b>
            <br />
            <br />
            Masukkan kunci rahasia untuk melanjutkan:
          </p>
          <input
            type="password"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Kunci Rahasia"
            value={resetKey}
            onChange={(e) => setResetKey(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="admin-outline"
              onClick={() => setIsResetModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="admin"
              className="bg-red-600 hover:bg-red-700 text-white border-none"
              onClick={() => {
                if (resetKey) {
                  resetSesi(resetKey);
                  setIsResetModalOpen(false);
                }
              }}
              disabled={!resetKey || isResetLoading}
            >
              {isResetLoading ? "Meriset..." : "Ya, Reset Sesi"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default KendaliStfContainer;
