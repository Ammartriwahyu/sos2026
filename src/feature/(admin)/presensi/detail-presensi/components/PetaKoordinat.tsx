"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Loader2, MapPinOff } from "lucide-react";
import type { PresensiMahasiswaDetail } from "@/api/services/admin/presensi";
import type { TitikPresensi } from "./PetaKoordinatMap";

const PetaKoordinatMap = dynamic(() => import("./PetaKoordinatMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center gap-2 text-sm text-default-dark/60">
      <Loader2 className="h-4 w-4 animate-spin" />
      Memuat peta...
    </div>
  ),
});

interface PetaKoordinatProps {
  mahasiswaList: PresensiMahasiswaDetail[];
  isLoading: boolean;
}

const PetaKoordinat = ({ mahasiswaList, isLoading }: PetaKoordinatProps) => {
  const titik = useMemo<TitikPresensi[]>(
    () =>
      mahasiswaList.flatMap((mahasiswa) =>
        typeof mahasiswa.latitude === "number" &&
        typeof mahasiswa.longitude === "number"
          ? [
              {
                nim: mahasiswa.nim,
                nama: mahasiswa.nama,
                latitude: mahasiswa.latitude,
                longitude: mahasiswa.longitude,
              },
            ]
          : [],
      ),
    [mahasiswaList],
  );

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-primary-normal">Peta Koordinat</h3>

      <div className="mt-4 h-72 overflow-hidden rounded-xl bg-admin-card md:h-96">
        {isLoading ? (
          <div className="flex h-full items-center justify-center gap-2 text-sm text-default-dark/60">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memuat data presensi...
          </div>
        ) : titik.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-sm text-default-dark/60">
            <MapPinOff className="h-6 w-6" />
            Belum ada koordinat presensi yang tercatat.
          </div>
        ) : (
          <PetaKoordinatMap titik={titik} />
        )}
      </div>

      {titik.length > 0 && (
        <p className="mt-3 text-sm text-default-dark/60">
          Menampilkan {titik.length} dari {mahasiswaList.length} mahasiswa.
          Arahkan kursor ke titik untuk melihat nama dan NIM, klik untuk membuka
          Google Maps.
        </p>
      )}
    </section>
  );
};

export default PetaKoordinat;
