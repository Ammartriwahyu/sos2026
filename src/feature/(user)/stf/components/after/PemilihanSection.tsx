"use client";
import React, { useState } from "react";
import PemilihanCard from "./PemilihanCard";
import { Button } from "@/shared/components/ui/Button";
import { Caketang } from "@/api/services/user/stf";
import { useVoteForCaketang } from "../../hooks/useVoteForCaketang";
import { Modal } from "@/shared/components/ui/Modal";
import { useGetStfData } from "../../hooks/useGetStfData";
import Image from "next/image";
import SuccessIcon from "@/assets/stf/success.png";
import ErrorIcon from "@/assets/stf/error.png";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

interface PemilihanSectionProps {
  caketangList: Caketang[];
  isLoading: boolean;
  error: string | null;
  activeCardId: string | null;
  kesempatan: boolean;
  setActiveCardId: (id: string) => void;
}

const PemilihanSection = ({
  caketangList,
  activeCardId,
  setActiveCardId,
  kesempatan = false,
}: PemilihanSectionProps) => {
  const { vote, isVoting, voteSuccess } = useVoteForCaketang();
  const { refresh } = useGetStfData();
  const { user } = useAuthContext();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const activeCaketang = caketangList?.find(
    (caketang: Caketang) => caketang.id_caketang === activeCardId,
  );

  const handleVote = () => {
    if (activeCaketang) {
      vote(activeCaketang.id_caketang);
      setIsConfirmationModalOpen(false);
      setIsResultModalOpen(true);
      refresh();
    }
  };

  return (
    <>
      <section className="relative z-10 w-full pt-16 pb-32">
        <div className="mycontainer text-center text-white w-full max-w-5xl mx-auto flex flex-col gap-16 md:gap-24 items-center">
          <h4 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide drop-shadow-lg">
            Saatnya memilih!
          </h4>
          <div className="flex flex-row justify-center items-center w-full px-4 sm:px-0 -space-x-16 md:-space-x-24 lg:-space-x-32 pt-8 pb-12">
            {caketangList?.map((caketang: Caketang, index: number) => {
              const activeIndex = caketangList.findIndex(
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
                />
              );
            })}
          </div>
          <Button
            className="w-full max-w-3xl lg:max-w-4xl mx-auto py-6 rounded-2xl font-bold text-xl md:text-2xl bg-[#6543A7] hover:bg-[#4E3285] text-white transition-all shadow-lg border border-white/20"
            disabled={!kesempatan || user?.tipe_mahasiswa === "pemutihan"}
            onClick={() => setIsConfirmationModalOpen(true)}
          >
            Pilih
          </Button>
        </div>
      </section>

      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Konfirmasi Pilihan"
        desc={`Apakah Anda yakin ingin memilih ${activeCaketang?.nama}? Pilihan tidak dapat diubah.`}
      >
        <div className="mt-4 flex justify-center space-x-4">
          <Button
            variant="outline"
            className="border-[#6543A7] text-[#6543A7] hover:bg-[#F8F7FC] hover:text-[#4E3285] hover:border-[#4E3285]"
            onClick={() => setIsConfirmationModalOpen(false)}
          >
            Batal
          </Button>
          <Button
            className="bg-[#6543A7] hover:bg-[#4E3285] text-white"
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
            <Image
              src={SuccessIcon}
              width={300}
              height={300}
              alt="Success Icon"
              className="w-1/3 mx-auto"
            />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="text-default-dark flex flex-col justify-center items-center gap-3">
                <h5 className="text-xl md:text-3xl font-bold text-center">
                  🎉 Yeay, Kamu Sudah Memilih!
                </h5>
                <p className="text-center text-sm">
                  Satu suara darimu berarti besar! Terima kasih telah ikut
                  menentukan masa depan angkatan kita.
                </p>
              </div>
              <Button
                className="px-8 md:px-14 bg-[#6543A7] hover:bg-[#4E3285] text-white"
                onClick={() => setIsResultModalOpen(false)}
              >
                Selesai
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-8 gap-10">
            <Image
              src={ErrorIcon}
              width={300}
              height={300}
              alt="Error Icon"
              className="w-1/3 mx-auto"
            />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="text-default-dark flex flex-col justify-center items-center gap-3">
                <h5 className="text-xl md:text-3xl font-bold text-center">
                  Gagal Melakukan Pemilihan 😣
                </h5>
                <p className="text-center text-sm">
                  Maaf suara kamu belum diterima, silakan coba lagi atau hubungi
                  panitia
                </p>
              </div>
              <Button
                className="px-8 md:px-14 bg-[#6543A7] hover:bg-[#4E3285] text-white"
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
