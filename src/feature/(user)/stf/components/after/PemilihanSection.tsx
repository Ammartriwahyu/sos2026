"use client";
import React, { useState } from "react";
import PemilihanCard from "./PemilihanCard";
import { Button } from "@/shared/components/ui/Button";
import { Caketang } from "@/api/services/user/stf";
import { useVoteForCaketang } from "../../hooks/useVoteForCaketang";
import { Modal } from "@/shared/components/ui/Modal";
import { useGetStfData } from "../../hooks/useGetStfData";
import { CheckCircle, XCircle } from "lucide-react";
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

  const activeCaketang = kandidat?.find(
    (caketang: Caketang) => caketang.id_caketang === activeCardId,
  );

  const handleVote = async () => {
    if (activeCaketang) {
      const success = await vote(activeCaketang.id_caketang);
      setIsConfirmationModalOpen(false);
      if (success) {
        setIsResultModalOpen(true);
      }
      refresh();
    }
  };

  return (
    <>
      <section className="relative z-10 w-full pt-16 pb-32">
        <div className="mycontainer text-center text-white w-full max-w-5xl mx-auto flex flex-col gap-16 md:gap-24 items-center">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg"
          >
            Saatnya memilih!
          </motion.h4>
          <div
            className="flex flex-row justify-center items-center w-full px-4 sm:px-0 -space-x-16 md:-space-x-24 lg:-space-x-32 pt-8 pb-12"
            onTouchStart={(e) => {
              const touchDown = e.touches[0].clientX;
              e.currentTarget.setAttribute("data-touch", touchDown.toString());
            }}
            onTouchEnd={(e) => {
              const touchDown = parseFloat(
                e.currentTarget.getAttribute("data-touch") || "0",
              );
              if (!touchDown) return;
              const touchUp = e.changedTouches[0].clientX;
              const diff = touchDown - touchUp;

              if (Math.abs(diff) > 50) {
                // threshold 50px
                const activeIndex = kandidat.findIndex(
                  (c) => c.id_caketang === activeCardId,
                );
                if (diff > 0 && activeIndex < kandidat.length - 1) {
                  // swiped left, go next
                  setActiveCardId(kandidat[activeIndex + 1].id_caketang);
                } else if (diff < 0 && activeIndex > 0) {
                  // swiped right, go prev
                  setActiveCardId(kandidat[activeIndex - 1].id_caketang);
                }
              }
            }}
          >
            {kandidat?.map((caketang: Caketang, index: number) => {
              const activeIndex = kandidat.findIndex(
                (c) => c.id_caketang === activeCardId,
              );
              return (
                <PemilihanCard
                  key={caketang.id_caketang}
                  data={caketang}
                  isActive={caketang.id_caketang === activeCardId}
                  onClick={() => setActiveCardId(caketang.id_caketang)}
                  index={index}
                  activeIndex={activeIndex}
                  total={kandidat.length}
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
              onClick={() => setIsConfirmationModalOpen(true)}
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
        onClose={() => setIsResultModalOpen(false)}
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
                onClick={() => setIsResultModalOpen(false)}
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
                onClick={() => setIsResultModalOpen(false)}
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
