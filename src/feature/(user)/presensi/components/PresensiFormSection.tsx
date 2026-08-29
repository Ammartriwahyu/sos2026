"use client";

import React, { useState } from "react";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { useSubmitPresensi } from "../hooks/useSubmitPresensi";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";
import { cn } from "@/shared/utils/cn";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Maskot from "@/assets/assetsos26/illustrasions/maskot_cewe.svg";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import KameraPresensiModal from "./KameraPresensiModal";

interface PresensiFormSectionProps {
  refreshPresensi: () => void;
}

const PresensiFormSection = ({ refreshPresensi }: PresensiFormSectionProps) => {
  const [kode, setKode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKameraOpen, setIsKameraOpen] = useState(false);
  const { submit, isSubmitting, submitError, submitSuccess } =
    useSubmitPresensi();

  const handleNext = () => {
    if (kode.trim()) {
      setIsKameraOpen(true);
    }
  };

  const handleSubmit = (photo: Blob) => {
    submit(kode.trim(), photo);
  };

  React.useEffect(() => {
    if (submitSuccess) {
      refreshPresensi();
      setIsKameraOpen(false);
      setIsModalOpen(true);
      setKode("");
    }
  }, [submitSuccess, refreshPresensi]);

  React.useEffect(() => {
    if (submitError) {
      setIsKameraOpen(false);
      setIsModalOpen(true);
    }
  }, [submitError]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6">
        <div className="relative w-full max-w-[714px] flex flex-col items-center justify-center z-20">
          <div className="liquid-glass w-full min-h-[246px] rounded-[12px] px-6 sm:px-[92px] py-[32px] flex flex-col items-center justify-center z-20 relative">
            <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-[28px] drop-shadow-md whitespace-nowrap">
              Masukan Kode Presensi
            </h3>

            <div className="w-full flex flex-col items-center gap-[20px]">
              <Input
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="w-full sm:max-w-[530px] h-[50px] text-white placeholder:text-white/50 rounded-[8px] px-4 text-center text-sm md:text-base focus:outline-none focus:border-white/40 transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow:
                    "inset 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 2px 8px 0 rgba(0, 0, 0, 0.15)",
                }}
              />

              <div className="w-[179px] h-[48px]">
                <AktivitasButton
                  onClick={handleNext}
                  disabled={isSubmitting || !kode.trim()}
                  className="w-full h-full flex items-center justify-center"
                >
                  Selanjutnya
                </AktivitasButton>
              </div>
            </div>
          </div>

          <AnimatedDiv delay={0.3}>
            <Image
              src={Maskot}
              alt="Maskot"
              className="hidden lg:block absolute -bottom-50 -right-38 w-[161px] h-[310px] z-30 pointer-events-none object-contain scale-x-100 animate-bounce-idle"
              draggable={false}
            />
          </AnimatedDiv>
        </div>
      </div>

      <KameraPresensiModal
        isOpen={isKameraOpen}
        onClose={() => setIsKameraOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="space"
        showCloseButton={false}
        containerClassName="max-w-[340px] sm:max-w-sm lg:max-w-md"
        icon={
          <span
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full border lg:h-[72px] lg:w-[72px]",
              submitSuccess
                ? "border-badgeSuccess/45 bg-badgeSuccess/15 text-badgeSuccess"
                : "border-danger/45 bg-danger/15 text-danger",
            )}
          >
            {submitSuccess ? (
              <CheckCircle2 className="h-8 w-8 lg:h-9 lg:w-9" />
            ) : (
              <AlertTriangle className="h-8 w-8 lg:h-9 lg:w-9" />
            )}
          </span>
        }
        title={submitSuccess ? "Berhasil!" : "Terjadi Kesalahan"}
        desc={
          submitSuccess
            ? "Presensi Anda berhasil dicatat."
            : submitError || "Gagal mengirim presensi. Silakan coba lagi."
        }
      >
        <div className="mt-6 flex justify-center">
          <AktivitasButton
            onClick={() => setIsModalOpen(false)}
            variant={submitSuccess ? "primary" : "outline"}
            className="max-w-[180px]"
          >
            Tutup
          </AktivitasButton>
        </div>
      </Modal>
    </>
  );
};

export default PresensiFormSection;
