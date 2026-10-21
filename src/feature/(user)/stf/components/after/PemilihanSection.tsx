"use client";
import React, { useState, useRef } from "react";
import PemilihanCard from "./PemilihanCard";
import { Button } from "@/shared/components/ui/Button";
import { Caketang } from "@/api/services/user/stf";
import { useVoteForCaketang } from "../../hooks/useVoteForCaketang";
import { Modal } from "@/shared/components/ui/Modal";
import { useGetStfData } from "../../hooks/useGetStfData";
import { Check, CheckCircle, XCircle } from "lucide-react";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { motion } from "motion/react";

interface PemilihanSectionProps {
  kandidat: Caketang[];
  activeCardId: string | null;
  kesempatan: boolean;
  sudah_memilih?: boolean;
  setActiveCardId: (id: string) => void;
}

const PemilihanSection = ({
  kandidat,
  activeCardId,
  setActiveCardId,
  kesempatan = false,
  sudah_memilih = false,
}: PemilihanSectionProps) => {
  const { vote, isVoting, voteSuccess } = useVoteForCaketang();
  const { refresh } = useGetStfData();
  const { user } = useAuthContext();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const activeCaketang = kandidat?.find(
    (caketang: Caketang) => caketang.id_caketang === activeCardId,
  );

  const displayKandidat = React.useMemo(() => {
    if (!kandidat || kandidat.length === 0) return [];
    if (!sudah_memilih || !activeCardId) return kandidat;

    const votedIndex = kandidat.findIndex(
      (c) => c.id_caketang === activeCardId,
    );
    if (votedIndex === -1) return kandidat;

    const targetIndex = Math.floor((kandidat.length - 1) / 2);
    if (votedIndex === targetIndex) return kandidat;

    const list = [...kandidat];
    const [votedCandidate] = list.splice(votedIndex, 1);
    list.splice(targetIndex, 0, votedCandidate);
    return list;
  }, [kandidat, sudah_memilih, activeCardId]);

  const handleVote = React.useCallback(async () => {
    if (
      !activeCaketang ||
      isVoting ||
      sudah_memilih ||
      user?.tipe_mahasiswa === "pemutihan"
    ) {
      return;
    }
    const success = await vote(activeCaketang.id_caketang);
    setIsConfirmationModalOpen(false);
    if (success) {
      setIsResultModalOpen(true);
    }
  }, [activeCaketang, isVoting, sudah_memilih, user?.tipe_mahasiswa, vote]);

  const handleCloseResultModal = React.useCallback(() => {
    setIsResultModalOpen(false);
    refresh();
  }, [refresh]);

  return (
    <>
      <section className="relative z-10 w-full pt-16 pb-32">
        <div
          className={`mycontainer text-center text-white w-full max-w-5xl mx-auto flex flex-col items-center ${
            sudah_memilih ? "gap-10 md:gap-14" : "gap-16 md:gap-24"
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg"
            >
              {sudah_memilih
                ? "Pilihan Kamu Telah Disimpan"
                : "Saatnya memilih!"}
            </motion.h4>
            {sudah_memilih && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-stf-text)] text-[var(--color-stf-purple)] font-bold text-xs md:text-sm shadow-md"
              >
                <Check
                  className="w-4 h-4 text-[var(--color-stf-purple)]"
                  strokeWidth={2.5}
                />
                <span>Pilihan Kamu</span>
              </motion.div>
            )}
          </div>

          <div
            className="flex flex-row justify-center items-center w-full px-4 sm:px-0 -space-x-16 md:-space-x-24 lg:-space-x-32 pt-8 sm:pt-12 pb-12"
            onTouchStart={(e) => {
              if (sudah_memilih) return;
              touchStartRef.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (sudah_memilih) return;
              const touchDown = touchStartRef.current;
              if (touchDown === null) return;
              touchStartRef.current = null;
              const touchUp = e.changedTouches[0].clientX;
              const diff = touchDown - touchUp;
              if (Math.abs(diff) > 50) {
                // threshold 50px
                const activeIndex = displayKandidat.findIndex(
                  (c) => c.id_caketang === activeCardId,
                );
                if (diff > 0 && activeIndex < displayKandidat.length - 1) {
                  // swiped left, go next
                  setActiveCardId(displayKandidat[activeIndex + 1].id_caketang);
                } else if (diff < 0 && activeIndex > 0) {
                  // swiped right, go prev
                  setActiveCardId(displayKandidat[activeIndex - 1].id_caketang);
                }
              }
            }}
          >
            {displayKandidat.map((caketang: Caketang, index: number) => {
              const isThisCardVoted =
                sudah_memilih && caketang.id_caketang === activeCardId;
              return (
                <PemilihanCard
                  key={caketang.id_caketang}
                  data={caketang}
                  isActive={caketang.id_caketang === activeCardId}
                  onClick={() => {
                    if (!sudah_memilih) {
                      setActiveCardId(caketang.id_caketang);
                    }
                  }}
                  index={index}
                  total={displayKandidat.length}
                  isLocked={sudah_memilih}
                  isPilihanSaya={isThisCardVoted}
                />
              );
            })}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-3xl lg:max-w-4xl mx-auto"
          >
            <Button
              variant="none"
              className="w-full py-4 md:py-6 rounded-2xl font-bold text-xl md:text-2xl bg-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary-hover)] text-[var(--color-stf-text)] transition-all shadow-lg border border-white/20 disabled:opacity-50"
              disabled={
                !kesempatan ||
                user?.tipe_mahasiswa === "pemutihan" ||
                sudah_memilih ||
                isVoting
              }
              onClick={() => {
                if (
                  kesempatan &&
                  user?.tipe_mahasiswa !== "pemutihan" &&
                  !sudah_memilih &&
                  !isVoting
                ) {
                  setIsConfirmationModalOpen(true);
                }
              }}
            >
              {isVoting
                ? "Memproses..."
                : sudah_memilih
                  ? "Anda Sudah Memilih"
                  : "Pilih"}
            </Button>
          </motion.div>
        </div>
      </section>

      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        variant="space"
      >
        <h2 className="md:text-xl text-lg text-center font-bold leading-6 lg:text-2xl text-white mb-2">
          Konfirmasi Pilihan
        </h2>
        <p className="mt-2 text-xs md:text-sm text-center text-gray-300 mb-8">
          Apakah Anda yakin ingin memilih{" "}
          <span className="font-semibold text-white">
            {activeCaketang?.nama}
          </span>
          ? Pilihan tidak dapat diubah.
        </p>
        <div className="mt-4 flex justify-center space-x-3 md:space-x-4">
          <Button
            variant="none"
            className="border border-white/20 text-white/80 hover:bg-white/10 hover:text-white px-6 py-2.5 rounded-xl transition-colors font-medium"
            onClick={() => setIsConfirmationModalOpen(false)}
          >
            Batal
          </Button>
          <Button
            variant="none"
            className="bg-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary-hover)] text-white px-6 py-2.5 rounded-xl disabled:opacity-50 transition-colors font-medium"
            onClick={handleVote}
            disabled={isVoting}
          >
            {isVoting ? "Memilih..." : "Ya, Yakin"}
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isResultModalOpen}
        onClose={handleCloseResultModal}
        variant="space"
      >
        {voteSuccess ? (
          <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-6 gap-8">
            <CheckCircle
              className="w-20 h-20 md:w-24 md:h-24 text-green-400 mx-auto"
              strokeWidth={1.5}
            />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col justify-center items-center gap-2">
                <h5 className="text-xl md:text-2xl font-bold text-center text-white">
                  Yeay, Kamu Sudah Memilih!
                </h5>
                <p className="text-center text-sm text-gray-300">
                  Satu suara darimu berarti besar! Terima kasih telah ikut
                  menentukan masa depan angkatan kita.
                </p>
              </div>
              <Button
                variant="none"
                className="px-10 py-2.5 rounded-xl bg-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary-hover)] text-white font-medium transition-colors"
                onClick={handleCloseResultModal}
              >
                Selesai
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-6 gap-8">
            <XCircle
              className="w-20 h-20 md:w-24 md:h-24 text-red-400 mx-auto"
              strokeWidth={1.5}
            />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col justify-center items-center gap-2">
                <h5 className="text-xl md:text-2xl font-bold text-center text-white">
                  Gagal Melakukan Pemilihan
                </h5>
                <p className="text-center text-sm text-gray-300">
                  Maaf suara kamu belum diterima, silakan coba lagi atau hubungi
                  panitia
                </p>
              </div>
              <Button
                variant="none"
                className="px-10 py-2.5 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 hover:text-white font-medium transition-colors"
                onClick={handleCloseResultModal}
              >
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PemilihanSection;
