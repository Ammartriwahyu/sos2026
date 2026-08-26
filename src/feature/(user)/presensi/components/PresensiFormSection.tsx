"use client";

import React, { useState } from "react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { useSubmitPresensi } from "../hooks/useSubmitPresensi";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";
import Image from "next/image";
import Maskot from "@/assets/assetsos26/illustrasions/maskot_cewe.svg";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

interface PresensiFormSectionProps {
  refreshPresensi: () => void;
}

const PresensiFormSection = ({ refreshPresensi }: PresensiFormSectionProps) => {
  const [kode, setKode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submit, isSubmitting, submitError, submitSuccess } =
    useSubmitPresensi();

  const handleSubmit = () => {
    if (kode) {
      submit(kode);
    }
  };

  React.useEffect(() => {
    if (submitSuccess) {
      refreshPresensi();
      setIsModalOpen(true);
      setKode("");
    }
  }, [submitSuccess, refreshPresensi]);

  React.useEffect(() => {
    if (submitError) {
      setIsModalOpen(true);
    }
  }, [submitError]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6">
        <div className="relative w-full max-w-[714px] flex flex-col items-center justify-center z-20">
          <div
            className="w-full min-h-[246px] rounded-[12px] px-6 sm:px-[92px] py-[32px] flex flex-col items-center justify-center z-20 relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              boxShadow:
                "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)",
            }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-[28px] drop-shadow-md whitespace-nowrap">
              Masukan Kode Presensi
            </h3>

            <div className="w-full flex flex-col items-center gap-[20px]">
              <Input
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                className="w-full sm:max-w-[530px] h-[50px] text-white placeholder:text-white/50 rounded-[8px] px-4 text-center text-base sm:text-lg focus:outline-none focus:border-white/40 transition-all"
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
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full h-full flex items-center justify-center"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </AktivitasButton>
              </div>
            </div>
          </div>

          <AnimatedDiv delay={0.3}>
            <Image
              src={Maskot}
              alt="Maskot"
              className="hidden lg:block absolute -bottom-65 -right-38 w-[161px] h-[310px] z-30 pointer-events-none object-contain scale-x-100 animate-bounce-idle"
              draggable={false}
            />
          </AnimatedDiv>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={submitSuccess ? "Berhasil!" : "Terjadi Kesalahan"}
        desc={
          submitSuccess
            ? "Presensi Anda berhasil dicatat."
            : submitError || "Gagal mengirim presensi. Silakan coba lagi."
        }
      >
        <div className="mt-4 flex justify-center">
          <Button onClick={() => setIsModalOpen(false)}>Tutup</Button>
        </div>
      </Modal>
    </>
  );
};

export default PresensiFormSection;
