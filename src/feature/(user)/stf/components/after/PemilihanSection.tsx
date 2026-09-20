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
import { motion } from "framer-motion";

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
      >
        <h2 className="md:text-xl text-lg text-center font-bold leading-6 lg:text-2xl text-[var(--color-stf-title)] mb-2">
          Konfirmasi Pilihan
        </h2>
        <p className="mt-2 text-xs md:text-sm text-center text-gray-500 mb-6">
          Apakah Anda yakin ingin memilih {activeCaketang?.nama}? Pilihan tidak
          dapat diubah.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <Button
            variant="none"
            className="border border-[var(--color-stf-primary)] text-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary)]/10 px-5 py-3 rounded-2xl"
            onClick={() => setIsConfirmationModalOpen(false)}
          >
            Batal
          </Button>
          <Button
            variant="none"
            className="bg-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary-hover)] text-[var(--color-stf-text)] px-5 py-3 rounded-2xl disabled:opacity-50"
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
      >
        {voteSuccess ? (
          <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-8 gap-10">
            <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-green-500 mx-auto" />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col justify-center items-center gap-3">
                <h5 className="text-xl md:text-3xl font-bold text-center text-[var(--color-stf-title)]">
                  🎉 Yeay, Kamu Sudah Memilih!
                </h5>
                <p className="text-center text-sm text-gray-500">
                  Satu suara darimu berarti besar! Terima kasih telah ikut
                  menentukan masa depan angkatan kita.
                </p>
              </div>
              <Button
                variant="none"
                className="px-8 md:px-14 py-3 rounded-2xl bg-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary-hover)] text-[var(--color-stf-text)]"
                onClick={() => setIsResultModalOpen(false)}
              >
                Selesai
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-8 gap-10">
            <XCircle className="w-24 h-24 md:w-32 md:h-32 text-red-500 mx-auto" />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col justify-center items-center gap-3">
                <h5 className="text-xl md:text-3xl font-bold text-center text-[var(--color-stf-title)]">
                  Gagal Melakukan Pemilihan 😣
                </h5>
                <p className="text-center text-sm text-gray-500">
                  Maaf suara kamu belum diterima, silakan coba lagi atau hubungi
                  panitia
                </p>
              </div>
              <Button
                variant="none"
                className="px-8 md:px-14 py-3 rounded-2xl bg-[var(--color-stf-primary)] hover:bg-[var(--color-stf-primary-hover)] text-[var(--color-stf-text)]"
                onClick={() => setIsResultModalOpen(false)}
              >
                Baiklah
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PemilihanSection;
