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
        variant={isActive ? "admin" : "outline"}
        onClick={() => ubahTahap(value)}
        disabled={isUbahTahapLoading || isActive}
        className={isActive ? "bg-primary-500 text-white" : ""}
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
              variant="outline"
            >
              <RefreshCw size={18} /> Siapkan Sesi Putaran Pertama
            </Button>
            <Button
              onClick={() => siapkanSesiKadep()}
              className="w-full justify-start gap-2"
              variant={papanData.siap_buka_kadep ? "admin" : "outline"}
              disabled={!papanData.siap_buka_kadep}
            >
              <Users size={18} /> Siapkan Sesi Kadep
            </Button>
            <Button
              onClick={() => finalisasi()}
              className="w-full justify-start gap-2"
              variant={papanData.siap_finalisasi ? "admin" : "outline"}
              disabled={!papanData.siap_finalisasi}
            >
              <Trophy size={18} /> Finalisasi Pemilihan
            </Button>
          </div>
        </div>

        {/* Kolom Kanan: Prodi & Sesi Aktif */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b pb-2">
              Status per Prodi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {papanData.prodi.map((p) => (
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
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-bold">
                        Berlangsung
                      </span>
                    )}
                  </div>

                  {p.sesi_aktif ? (
                    <div className="text-sm bg-neutral-50 p-3 rounded border flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Status:</span>
                        <span className="font-medium capitalize">
                          {p.sesi_aktif.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Suara Masuk:</span>
                        <span className="font-medium">
                          {p.sesi_aktif.jumlah_suara} /{" "}
                          {p.sesi_aktif.jumlah_berhak}
                        </span>
                      </div>
                      {p.sesi_aktif.pengulangan && (
                        <div className="text-red-500 font-semibold mt-1">
                          Pemungutan Ulang (Seri)
                        </div>
                      )}

                      <div className="flex gap-2 mt-2">
                        {p.sesi_aktif.status === "tertutup" && (
                          <Button
                            size="small"
                            onClick={() => bukaSesi(p.sesi_aktif!.id_sesi)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <Play size={14} className="mr-1" /> Buka
                          </Button>
                        )}
                        {p.sesi_aktif.status === "dibuka" && (
                          <Button
                            size="small"
                            onClick={() => tutupSesi(p.sesi_aktif!.id_sesi)}
                            className="flex-1 bg-red-600 hover:bg-red-700"
                          >
                            <Square size={14} className="mr-1" /> Tutup
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-neutral-400 italic">
                      Tidak ada sesi aktif
                    </div>
                  )}

                  {p.finalis && (
                    <div className="text-sm mt-2">
                      <span className="font-semibold block mb-1">
                        Finalis (Kadep):
                      </span>
                      <span className="text-primary-600 font-medium">
                        {p.finalis.nama}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sesi Kadep */}
          <div className="bg-white p-6 rounded-xl shadow border border-neutral-200 flex flex-col gap-4">
            <h2 className="text-xl font-bold border-b pb-2">
              Pemilihan Kepala Departemen
            </h2>
            {papanData.sesi_kadep ? (
              <div className="border p-4 rounded-lg flex flex-col gap-3 max-w-md">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">
                    {papanData.sesi_kadep.judul}
                  </span>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-bold capitalize">
                    {papanData.sesi_kadep.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Suara Masuk:</span>
                  <span className="font-medium">
                    {papanData.sesi_kadep.jumlah_suara} /{" "}
                    {papanData.sesi_kadep.jumlah_berhak}
                  </span>
                </div>
                {papanData.sesi_kadep.pengulangan && (
                  <div className="text-red-500 font-semibold mt-1">
                    Pemungutan Ulang (Seri)
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  {papanData.sesi_kadep.status === "tertutup" && (
                    <Button
                      size="small"
                      onClick={() => bukaSesi(papanData.sesi_kadep!.id_sesi)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Play size={14} className="mr-1" /> Buka Sesi
                    </Button>
                  )}
                  {papanData.sesi_kadep.status === "dibuka" && (
                    <Button
                      size="small"
                      onClick={() => tutupSesi(papanData.sesi_kadep!.id_sesi)}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      <Square size={14} className="mr-1" /> Tutup Sesi
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-sm text-neutral-500 italic">
                Sesi Kadep belum disiapkan.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KendaliStfContainer;
