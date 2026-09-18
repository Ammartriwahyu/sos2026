"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { stfService, Caketang } from "@/api/services/user/stf";
import { Trophy, Medal, Star } from "lucide-react";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import GrassDivider from "@/shared/components/background/GrassDivider";

const HasilSection = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stfHasil"],
    queryFn: () => stfService.getHasilAkhir(),
  });

  if (isLoading) {
    return (
      <SpaceBackground className="w-full flex flex-col h-screen overflow-hidden relative">
        <div className="mx-auto flex h-full items-center justify-center text-white relative z-10">
          <p className="text-xl font-semibold animate-pulse">
            Memuat hasil pemilihan...
          </p>
        </div>
      </SpaceBackground>
    );
  }

  if (error || !response?.data) {
    return (
      <SpaceBackground className="w-full flex flex-col h-screen overflow-hidden relative">
        <div className="mx-auto flex h-full flex-col items-center justify-center text-white relative z-10 text-center gap-4 px-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            Gagal Memuat Hasil 😔
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-lg">
            Tidak dapat mengambil data hasil pemilihan. Silakan coba lagi nanti.
          </p>
        </div>
      </SpaceBackground>
    );
  }

  const { kadep, ketang } = response.data as {
    kadep: Caketang;
    ketang: Caketang[];
  };

  return (
    <SpaceBackground className="w-full flex flex-col min-h-screen overflow-hidden relative">
      <div className="relative z-10 w-full pt-24 pb-16 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center gap-4 text-center">
          <Trophy className="w-10 h-10 md:w-14 md:h-14 text-yellow-400 hidden sm:block" />
          Hasil Akhir Pemilihan
          <Trophy className="w-10 h-10 md:w-14 md:h-14 text-yellow-400 hidden sm:block" />
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl text-center mb-16 px-4">
          Selamat kepada para kandidat terpilih yang akan mengemban amanah baru
          di Departemen Sistem Informasi!
        </p>

        {!kadep && (!ketang || ketang.length === 0) && (
          <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-md max-w-lg text-center mx-4">
            <h4 className="text-2xl font-bold text-white mb-2">Belum Final</h4>
            <p className="text-white/80">
              Hasil pemilihan belum difinalisasi oleh panitia. Pantau terus
              halaman ini untuk mengetahui siapa pemenangnya!
            </p>
          </div>
        )}

        {/* Kadep Section */}
        {kadep && (
          <div className="flex flex-col items-center mb-24 w-full px-4">
            <h3 className="text-2xl md:text-4xl font-bold text-yellow-300 mb-8 border-b-2 border-yellow-300/50 pb-2">
              Kepala Departemen Terpilih
            </h3>
            <div className="flex flex-col items-center gap-4 max-w-sm w-full">
              <div className="flex flex-col w-full max-w-sm rounded-t-[5rem] rounded-b-[3rem] overflow-hidden shadow-2xl bg-[var(--color-primary-light)]">
                <div className="w-full pt-2 px-2 pb-0">
                  <Image
                    src={kadep.foto || "/placeholder-image.jpg"}
                    alt={kadep.nama}
                    width={400}
                    height={533}
                    className="w-full h-auto aspect-[3/4] object-contain object-bottom rounded-t-[4.5rem] rounded-b-none"
                  />
                </div>
                <div className="w-full -mt-8 relative z-10">
                  <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 flex flex-col justify-center items-center px-4 pt-5 pb-6 text-center min-h-[5rem] rounded-t-[5rem] shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
                    <p className="text-yellow-950 text-xl lg:text-2xl font-bold uppercase line-clamp-2 leading-tight tracking-wide mb-1">
                      {kadep.nama}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-900 bg-yellow-100/50 px-3 py-0.5 rounded-full text-xs font-semibold">
                      <Star className="w-3 h-3" /> Kepala Departemen Sistem
                      Informasi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ketang Section */}
        {ketang && ketang.length > 0 && (
          <div className="flex flex-col items-center w-full px-4 max-w-6xl mx-auto mb-20">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-12 border-b-2 border-white/30 pb-2 text-center">
              Ketua Angkatan Terpilih
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full place-items-center">
              {ketang.map((k: Caketang) => (
                <div
                  key={k.id_caketang}
                  className="flex flex-col w-full max-w-xs sm:max-w-sm rounded-t-[4rem] rounded-b-[2.5rem] overflow-hidden shadow-2xl bg-[var(--color-primary-light)] transition-transform hover:scale-105"
                >
                  <div className="w-full pt-1.5 px-1.5 pb-0">
                    <Image
                      src={k.foto || "/placeholder-image.jpg"}
                      alt={k.nama}
                      width={300}
                      height={400}
                      className="w-full h-auto aspect-[3/4] object-contain object-bottom rounded-t-[3.5rem] rounded-b-none"
                    />
                  </div>
                  <div className="w-full -mt-6 relative z-10">
                    <div className="bg-white flex flex-col justify-center items-center px-4 pt-4 pb-5 text-center min-h-[4.5rem] rounded-t-[3rem] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                      <p className="text-[var(--color-primary-normal)] text-lg lg:text-xl font-bold uppercase line-clamp-2 leading-tight tracking-wide mb-1">
                        {k.nama}
                      </p>
                      <div className="flex items-center gap-1 text-primary-700 bg-primary-100 px-3 py-0.5 rounded-full text-xs font-semibold">
                        <Medal className="w-3 h-3" /> Prodi {k.prodi}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-20 w-full mt-auto">
        <GrassDivider className="translate-y-px" />
        <div className="w-full h-16 md:h-24 peta-flashback-bg" />
      </div>
    </SpaceBackground>
  );
};

export default HasilSection;
