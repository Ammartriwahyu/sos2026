"use client";

import React, { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { QuizViewSos26 } from "../components/QuizViewSos26";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { QuizResultModalSos26 } from "../components/QuizResultModalSos26"; // <-- Import Modal Hasil Kuis
import { useGetDetailQuiz } from "../hooks/useGetQuiz";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

const QuizStartContainer = ({ id_kuis }: { id_kuis: string }) => {
  const { modalContent, closeModal, quizResult, isFinished, ...quizProps } = useQuiz({ id_kuis });
  const { data: dataQuiz } = useGetDetailQuiz(id_kuis);
  const router = useRouter();

  useEffect(() => {
    const s = dataQuiz?.status_kuis;
    if (s === "Selesai" || s === "Terlewat" || s === "Terlambat") {
      router.push(`/aktivitas/kuis/${id_kuis}`);
    }
  }, [dataQuiz?.status_kuis, id_kuis, router]);

  return (
    <SpaceBackground className="relative min-h-screen w-full overflow-x-hidden">
      <CircleGLow />
      <BgBawah gradientHeight="h-[200px]" />

      <div className="relative z-10 mycontainer py-8 md:py-12 flex flex-col items-center gap-6 pb-[350px] md:pb-[450px]">
        <AnimatedDiv className="w-full flex justify-start">
          <div className="w-full px-4 md:px-10 mt-2">
            <Link
              href="/aktivitas/penugasan?tab=kuis"
              className="inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0" />
              <span>Kembali</span>
            </Link>
          </div>
        </AnimatedDiv>

        <div className="w-full">
          <QuizViewSos26 {...quizProps} isFinished={isFinished} />
        </div>
      </div>

      {/* Modal Konfirmasi Biasa (misal: konfirmasi submit sebelum waktu habis) */}
      {modalContent?.isOpen && (
        <ConfirmationModal
          isOpen={modalContent.isOpen}
          onClose={closeModal}
          onConfirm={modalContent.onConfirm}
          isLoading={quizProps.isSubmitting}
          title={modalContent.title}
          message={modalContent.message}
          confirmText={modalContent.confirmText}
          hideCancelButton={modalContent.hideCancelButton}
        />
      )}

      {/* Modal Pop-up Hasil Kuis (QuizResultModalSos26) */}
      <QuizResultModalSos26
        isOpen={isFinished && quizResult !== null}
        onClose={() => {
          router.push(`/aktivitas/penugasan?tab=kuis`);
        }}
        result={quizResult}
      />
    </SpaceBackground>
  );
};

export default QuizStartContainer;