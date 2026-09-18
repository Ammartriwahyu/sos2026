"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  RefreshCw,
  Play,
  Square,
  Users,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { useKendaliStf } from "../hooks/useKendaliStf";
import { Button } from "@/shared/components/ui/Button";

const KendaliStfContainer = () => {
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
    <div className="p-4 md:p-8 w-full flex flex-col gap-8">
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
          <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b pb-2">Tahap Halaman</h2>
            <p className="text-sm text-neutral-600">
              Layar yang dilihat mahasiswa saat ini. Pastikan untuk memindahkan
              ke &quot;Voting&quot; saat pemungutan suara dimulai.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <TahapButton name="Tertutup" value="tertutup" />
              <TahapButton name="Perkenalan" value="perkenalan" />
              <TahapButton name="Voting" value="voting" />
              <TahapButton name="Hasil" value="hasil" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b pb-2">Aksi Global</h2>
            <Button
              onClick={() => siapkanPutaranPertama()}
              className="w-full justify-start gap-2"
              variant="admin-outline"
            >
              <RefreshCw size={18} /> Siapkan Sesi Putaran Pertama
            </Button>
            <Button
              onClick={() => siapkanSesiKadep()}
              className="w-full justify-start gap-2"
              variant={papanData.siap_buka_kadep ? "admin" : "admin-outline"}
              disabled={!papanData.siap_buka_kadep}
            >
              <Users size={18} /> Siapkan Sesi Kadep
            </Button>
            <Button
              onClick={() => finalisasi()}
              className="w-full justify-start gap-2"
              variant={papanData.siap_finalisasi ? "admin" : "admin-outline"}
              disabled={!papanData.siap_finalisasi}
            >
              <Trophy size={18} /> Finalisasi Pemilihan
            </Button>
            <div className="border-t pt-4 mt-2">
              <Button
                onClick={() => {
                  if (
                    window.confirm(
                      "Apakah Anda yakin ingin me-reset seluruh sesi pemilihan? Tindakan ini tidak dapat dibatalkan!",
                    )
                  ) {
                    resetSesi("gaffasangpelaut");
                  }
                }}
                className="w-full justify-start gap-2 bg-red-600 hover:bg-red-700 text-white border-none"
                variant="none"
                disabled={isResetLoading}
              >
                <RotateCcw size={18} /> Reset Seluruh Sesi
              </Button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Prodi & Sesi Aktif */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b pb-2">
              Status per Prodi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="border p-4 rounded-lg flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">
                        {p.nama_prodi}
                      </span>
                      {p.selesai ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">
                          Selesai
                        </span>
                      ) : isSesiValid ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-bold">
                          Berlangsung
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-bold">
                          Belum Dimulai
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
                          <div className="text-sm bg-neutral-50 p-3 rounded border flex flex-col gap-2">
                            <div className="flex justify-between">
                              <span className="text-neutral-500">Status:</span>
                              <span className="font-medium capitalize">
                                {derivedStatus}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-500">
                                Suara Masuk:
                              </span>
                              <span className="font-medium">
                                {suaraMasuk} / {berhakMemilih}
                              </span>
                            </div>
                            {sesi.pengulangan && (
                              <div className="text-red-500 font-semibold mt-1">
                                Pemungutan Ulang (Seri)
                              </div>
                            )}

                            <div className="flex gap-2 mt-2">
                              {derivedStatus === "tertutup" && (
                                <Button
                                  size="small"
                                  onClick={() => bukaSesi(sesi.id_sesi)}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <Play size={14} className="mr-1" /> Buka
                                </Button>
                              )}
                              {derivedStatus === "dibuka" && (
                                <Button
                                  size="small"
                                  onClick={() => tutupSesi(sesi.id_sesi)}
                                  className="flex-1 bg-red-600 hover:bg-red-700"
                                >
                                  <Square size={14} className="mr-1" /> Tutup
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="text-sm text-neutral-400 italic">
                            Tidak ada sesi aktif
                          </div>
                        );
                      }
                    })()}

                    {p.finalis && (
                      <div className="text-sm mt-2">
                        <span className="font-semibold block mb-1">
                          Finalis (Kadep):
                        </span>
                        <span className="text-primary-normal font-bold">
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
          <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b pb-2">
              Pemilihan Kepala Departemen
            </h2>
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
                  <div className="border p-4 rounded-lg flex flex-col gap-3 max-w-md">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">
                        {kadep.judul}
                      </span>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-bold capitalize">
                        {derivedStatus}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Suara Masuk:</span>
                      <span className="font-medium">
                        {suaraMasuk} / {berhakMemilih}
                      </span>
                    </div>
                    {kadep.pengulangan && (
                      <div className="text-red-500 font-semibold mt-1">
                        Pemungutan Ulang (Seri)
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      {derivedStatus === "tertutup" && (
                        <Button
                          size="small"
                          onClick={() => bukaSesi(kadep.id_sesi)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Play size={14} className="mr-1" /> Buka Sesi
                        </Button>
                      )}
                      {derivedStatus === "dibuka" && (
                        <Button
                          size="small"
                          onClick={() => tutupSesi(kadep.id_sesi)}
                          className="flex-1 bg-red-600 hover:bg-red-700"
                        >
                          <Square size={14} className="mr-1" /> Tutup Sesi
                        </Button>
                      )}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="text-sm text-neutral-500 italic">
                    Sesi Kadep belum disiapkan.
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KendaliStfContainer;
