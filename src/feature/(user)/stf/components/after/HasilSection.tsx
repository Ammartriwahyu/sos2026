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
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center gap-4">
          <Trophy className="w-10 h-10 md:w-14 md:h-14 text-yellow-400" />
          Hasil Akhir Pemilihan
          <Trophy className="w-10 h-10 md:w-14 md:h-14 text-yellow-400" />
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl text-center mb-16 px-4">
          Selamat kepada para kandidat terpilih yang akan mengemban amanah baru
          di Departemen Sistem Informasi!
        </p>

        {/* Kadep Section */}
        {kadep && (
          <div className="flex flex-col items-center mb-24 w-full px-4">
            <h3 className="text-2xl md:text-4xl font-bold text-yellow-300 mb-8 border-b-2 border-yellow-300/50 pb-2">
              Kepala Departemen Terpilih
            </h3>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm max-w-3xl w-full shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-yellow-400 shrink-0">
                <Image
                  src={kadep.foto || "/placeholder-avatar.png"}
                  alt={kadep.nama}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-white text-center md:text-left">
                <h4 className="text-3xl font-bold mb-2 text-yellow-50">
                  {kadep.nama}
                </h4>
                <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-200 bg-yellow-900/30 w-fit px-4 py-1.5 rounded-full mb-4 mx-auto md:mx-0">
                  <Star className="w-4 h-4" />
                  <span className="font-semibold text-sm">
                    Program Studi {kadep.prodi}
                  </span>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                  <p className="text-sm md:text-base leading-relaxed text-white/90 italic">
                    &quot;{kadep.visi}&quot;
                  </p>
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
                  className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col items-center gap-6 backdrop-blur-sm w-full max-w-sm hover:bg-white/10 transition-colors"
                >
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-[#6543A7] shadow-lg shrink-0">
                    <Image
                      src={k.foto || "/placeholder-avatar.png"}
                      alt={k.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-white text-center w-full">
                    <h4 className="text-2xl font-bold mb-3">{k.nama}</h4>
                    <div className="flex items-center justify-center gap-2 text-primary-200 bg-primary-900/30 w-fit px-4 py-1.5 rounded-full mx-auto mb-4 border border-primary-500/30">
                      <Medal className="w-4 h-4" />
                      <span className="font-semibold text-sm">
                        Prodi {k.prodi}
                      </span>
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
