// VisiMisiSection.tsx

"use client";
import React, { useState, useMemo, useEffect } from "react";
import CaketangCard from "./CaketangCard";
import { Caketang } from "@/api/services/user/stf";
import Image from "next/image";
import { formatText } from "@/lib/utils";
import Starfield from "@/shared/components/background/Starfield";
import { motion } from "motion/react";

interface VisiMisiSectionProps {
  kandidat: Caketang[];
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
  isKadep?: boolean;
}

/* ─── Helpers Normalisasi & Label Prodi ───────────────────────────── */
const normalizeProdiKey = (prodi: string | undefined): string => {
  if (!prodi) return "SI";
  const p = prodi.trim().toLowerCase();
  if (p === "si" || p.includes("sistem informasi")) return "SI";
  if (p === "pti" || p.includes("pendidikan")) return "PTI";
  if (p === "ti" || p.includes("teknologi informasi")) return "TI";
  return prodi.toUpperCase();
};

const getProdiMeta = (key: string) => {
  const norm = normalizeProdiKey(key);
  switch (norm) {
    case "SI":
      return {
        key: "SI",
        short: "SI",
        full: "Sistem Informasi",
        label: "Sistem Informasi (SI)",
      };
    case "TI":
      return {
        key: "TI",
        short: "TI",
        full: "Teknologi Informasi",
        label: "Teknologi Informasi (TI)",
      };
    case "PTI":
      return {
        key: "PTI",
        short: "PTI",
        full: "Pendidikan Teknologi Informasi",
        label: "Pendidikan TI (PTI)",
      };
    default:
      return {
        key,
        short: key,
        full: key,
        label: key,
      };
  }
};

const PRODI_SORT_ORDER = ["SI", "TI", "PTI"];

const VisiMisiSection = ({
  kandidat,
  activeCardId,
  setActiveCardId,
  isKadep = false,
}: VisiMisiSectionProps) => {
  // Deteksi apakah ini pemilihan ketua departemen
  const isKadepElection = useMemo(() => {
    if (isKadep) return true;
    if (kandidat?.some((k) => k.jabatan === "kadep")) return true;
    // Cek jika setiap prodi hanya punya maksimal 1 kandidat dan total <= 3 (format 3 finalis kadep)
    const countPerProdi: Record<string, number> = {};
    for (const k of kandidat || []) {
      const key = normalizeProdiKey(k.prodi);
      countPerProdi[key] = (countPerProdi[key] || 0) + 1;
    }
    const maxPerProdi = Math.max(...Object.values(countPerProdi), 0);
    if (maxPerProdi <= 1 && (kandidat?.length || 0) <= 3) {
      return true;
    }
    return false;
  }, [isKadep, kandidat]);

  // Ambil daftar unik prodi yang ada dalam daftar kandidat
  const uniqueProdiKeys = useMemo(() => {
    if (!kandidat || kandidat.length === 0) return [];
    const keys = Array.from(
      new Set(kandidat.map((k) => normalizeProdiKey(k.prodi))),
    );
    return keys.sort((a, b) => {
      const idxA = PRODI_SORT_ORDER.indexOf(a);
      const idxB = PRODI_SORT_ORDER.indexOf(b);
      return (idxA !== -1 ? idxA : 99) - (idxB !== -1 ? idxB : 99);
    });
  }, [kandidat]);

  const uniqueProdis = useMemo(() => {
    return uniqueProdiKeys.map((k) => getProdiMeta(k));
  }, [uniqueProdiKeys]);

  // Tombol filter prodi HANYA dimunculkan jika BUKAN pemilihan kadep dan ada >1 prodi
  const showProdiFilter = !isKadepElection && uniqueProdiKeys.length > 1;

  // State prodi aktif yang dipilih pada tab filter
  const [selectedProdi, setSelectedProdi] = useState<string>(() => {
    if (activeCardId && kandidat) {
      const activeCand = kandidat.find((k) => k.id_caketang === activeCardId);
      if (activeCand) return normalizeProdiKey(activeCand.prodi);
    }
    return uniqueProdiKeys[0] || "SI";
  });

  // Sinkronisasi bila uniqueProdiKeys berubah
  useEffect(() => {
    if (
      uniqueProdiKeys.length > 0 &&
      !uniqueProdiKeys.includes(selectedProdi)
    ) {
      setSelectedProdi(uniqueProdiKeys[0]);
    }
  }, [uniqueProdiKeys, selectedProdi]);

  // Filter kandidat hanya sesuai prodi yang dipilih jika showProdiFilter aktif (maksimal 3 kartu)
  const filteredKandidat = useMemo(() => {
    if (!kandidat) return [];
    if (!showProdiFilter) return kandidat;
    return kandidat.filter((k) => normalizeProdiKey(k.prodi) === selectedProdi);
  }, [kandidat, showProdiFilter, selectedProdi]);

  // Pastikan kandidat yang aktif selalu ada dalam kandidat yang sedang difilter
  useEffect(() => {
    if (filteredKandidat.length > 0) {
      const isActiveInFiltered = filteredKandidat.some(
        (k) => k.id_caketang === activeCardId,
      );
      if (!isActiveInFiltered) {
        const nextActive =
          filteredKandidat.length > 1
            ? filteredKandidat[1].id_caketang
            : filteredKandidat[0].id_caketang;
        setActiveCardId(nextActive);
      }
    }
  }, [filteredKandidat, activeCardId, setActiveCardId]);

  // Handler saat user klik tombol prodi SI / TI / PTI
  const handleSelectProdi = (key: string) => {
    setSelectedProdi(key);
    const targetCandidates = kandidat.filter(
      (k) => normalizeProdiKey(k.prodi) === key,
    );
    if (targetCandidates.length > 0) {
      const nextActive =
        targetCandidates.length > 1
          ? targetCandidates[1].id_caketang
          : targetCandidates[0].id_caketang;
      setActiveCardId(nextActive);
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Decorative Glow & Circles */}
      {/* Kiri Atas */}
      <div className="absolute top-0 md:top-20 left-0 -translate-x-1/2 w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] rounded-full border-[1px] border-dashed border-white/20 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-32 h-32 md:w-48 md:h-48 bg-[var(--color-primary-normal)]/40 blur-[50px] md:blur-[70px] rounded-full animate-pulse"></div>
      </div>

      {/* Kanan Bawah */}
      <div className="absolute bottom-0 md:bottom-20 right-0 translate-x-1/2 w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] rounded-full border-[1px] border-dashed border-white/20 z-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-32 h-32 md:w-48 md:h-48 bg-[var(--color-primary-normal)]/40 blur-[50px] md:blur-[70px] rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <Starfield />

      <div className="mx-auto flex w-full flex-col relative z-10 items-center justify-center py-16 md:py-24 px-4 gap-12 md:gap-20 text-white lg:px-8 md:px-12 xl:px-24">
        {/* ── Filter Tombol Prodi (hanya muncul saat ada >1 prodi pada pemilihan ketang maba belum login) ── */}
        {showProdiFilter && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-2.5 w-full -mb-2"
          >
            <p className="text-xs md:text-sm font-semibold text-white/70 tracking-wider uppercase">
              Pilih Program Studi:
            </p>
            <div className="bg-black/40 backdrop-blur-xl p-1.5 rounded-full border border-white/15 flex items-center gap-1.5 sm:gap-2 shadow-2xl">
              {uniqueProdis.map((p) => {
                const isSelected = selectedProdi === p.key;
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => handleSelectProdi(p.key)}
                    className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "text-white shadow-[0_0_20px_rgba(108,74,182,0.6)]"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeProdiPill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-stf-purple)] to-[var(--color-stf-primary)] border border-[var(--color-stf-purple-border)] shadow-[0_0_15px_rgba(129,106,197,0.5)] -z-0"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="font-extrabold">{p.short}</span>
                      <span className="hidden md:inline font-normal opacity-90 text-[11px] normal-case">
                        ({p.full})
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Cards Row (Selalu 3 kartu per prodi yang dipilih atau 3 calon kadep) ── */}
        <motion.div
          key={showProdiFilter ? selectedProdi : "all-candidates"}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex w-full flex-nowrap justify-center gap-4 md:gap-12 lg:gap-20"
        >
          {filteredKandidat?.map((caketang: Caketang) => (
            <CaketangCard
              key={caketang.id_caketang}
              data={caketang}
              isActive={caketang.id_caketang === activeCardId}
              onClick={() => setActiveCardId(caketang.id_caketang)}
            />
          ))}
        </motion.div>

        {/* ── Detail Section (Visi & Misi) ── */}
        <div className="w-full relative grid grid-cols-1">
          {kandidat?.map((caketang) => (
            <div
              key={caketang.id_caketang}
              className={`col-start-1 row-start-1 grid grid-cols-1 lg:grid-cols-12 w-full gap-10 md:gap-16 items-start transition-all duration-500 ease-in-out ${
                caketang.id_caketang === activeCardId
                  ? "opacity-100 z-10 translate-y-0"
                  : "opacity-0 z-0 pointer-events-none translate-y-4"
              }`}
            >
              {/* Left: Photo */}
              <div className="col-span-1 lg:col-span-4 flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-0">
                <div className="flex flex-col w-full max-w-[16rem] sm:max-w-xs md:max-w-md rounded-t-[5rem] md:rounded-t-[6rem] rounded-b-none overflow-hidden shadow-2xl bg-[var(--color-primary-light)]">
                  <div className="w-full pt-1.5 md:pt-2 px-1.5 md:px-2 pb-0 md:pb-0">
                    <Image
                      src={caketang.foto || "/placeholder-image.jpg"}
                      width={400}
                      height={533}
                      alt="Foto Caketang"
                      className="w-full h-auto aspect-[3/4] object-contain object-bottom rounded-t-[4.5rem] md:rounded-t-[5.5rem] rounded-b-none"
                    />
                  </div>
                </div>

                {/* Separate Name Container */}
                <div className="flex flex-col w-full max-w-[16rem] sm:max-w-xs md:max-w-md rounded-b-[5rem] md:rounded-b-[6rem] rounded-t-none shadow-xl bg-[var(--color-caketang-name)] justify-center items-center px-4 py-4 md:py-6 text-center">
                  <p className="text-white font-bold text-lg sm:text-xl md:text-2xl uppercase leading-tight">
                    {caketang.nama}
                  </p>
                </div>
              </div>

              {/* Right: Details (Prodi, Visi, Misi) */}
              <div className="col-span-1 lg:col-span-8 flex flex-col gap-10">
                <h4 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left leading-tight">
                  {caketang.prodi}
                </h4>

                <div className="flex flex-col gap-4">
                  <h5 className="text-xl md:text-2xl font-bold text-white/90">
                    Visi :
                  </h5>
                  {caketang.visi &&
                    formatText(caketang.visi).map((line, index) => (
                      <p
                        key={index}
                        className="text-sm md:text-base leading-7 font-normal text-justify text-white/80"
                      >
                        {line}
                      </p>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                  <h5 className="text-xl md:text-2xl font-bold text-white/90">
                    Misi :
                  </h5>
                  <div className="flex flex-col gap-2">
                    {caketang.misi &&
                      formatText(caketang.misi).map((line, index) => (
                        <p
                          key={index}
                          className="text-sm md:text-base leading-7 font-normal text-justify text-white/80"
                        >
                          {line}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(VisiMisiSection);
