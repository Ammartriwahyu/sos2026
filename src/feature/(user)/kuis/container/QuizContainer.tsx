"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useQuiz } from "../hooks/useQuiz";
import { useGetDetailQuiz } from "../hooks/useGetQuiz";
import QuizStatusSection from "../components/QuizStatusSection";
import { QuizViewSos26 } from "../components/QuizViewSos26";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { QuizResultModalSos26 } from "../components/QuizResultModalSos26";

import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import BackLink from "@/shared/components/ui/BackLink";

const QuizContainer = ({ id_kuis }: { id_kuis: string }) => {
  const router = useRouter();

  // Hook detail kuis (status, nama, deadline)
  const { data: detailQuiz } = useGetDetailQuiz(id_kuis);

  // Hook quiz (soal, timer, jawaban, submit)
  const { modalContent, closeModal, quizResult, setQuizResult, ...quizProps } =
    useQuiz({ id_kuis });

  // Jika kuis sudah selesai / terlewat dan tidak ada result modal → redirect ke penugasan
  useEffect(() => {
    const s = detailQuiz?.status_kuis;
    if (s === "Selesai" || s === "Terlewat" || s === "Terlambat") {
      if (!quizResult) {
        router.push("/aktivitas/penugasan?tab=kuis");
      }
    }
  }, [detailQuiz?.status_kuis, id_kuis, router, quizResult]);

  const handleCloseResultModal = () => {
    setQuizResult(null);
    router.push("/aktivitas/penugasan?tab=kuis");
  };

  // Tentukan tampilan: jika kuis sedang aktif (ada soal) tampilkan QuizViewSos26,
  // selain itu tampilkan QuizStatusSection (preview sebelum mulai / hasil)
  const isQuizActive =
    detailQuiz?.status_kuis === "Sedang Berlangsung" ||
    detailQuiz?.status_kuis === "Belum Mulai";

  return (
    <SpaceBackground className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      <CircleGLow />

      <BgBawah gradientHeight="h-[200px]" />

      <BackLink href="/aktivitas/penugasan?tab=kuis" />

      <div className="relative z-10 mycontainer pt-8 md:pt-10 flex flex-col items-center gap-6 pb-[250px] md:pb-[400px]">
        {/* Konten utama */}
        <AnimatedDiv delay={0.1} className="w-full">
          {isQuizActive && quizProps.kuisData ? (
            // Tampilan mengerjakan soal
            <QuizViewSos26 {...quizProps} />
          ) : (
            // Tampilan status kuis (sebelum mulai / selesai / terlewat)
            <QuizStatusSection Quiz={detailQuiz} />
          )}
        </AnimatedDiv>
      </div>

      {/* Modal konfirmasi submit */}
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

      {/* Modal hasil kuis */}
      {quizResult && (
        <QuizResultModalSos26
          isOpen={!!quizResult}
          onClose={handleCloseResultModal}
          result={quizResult}
          quizTitle={quizProps.kuisData?.nama_kuis || detailQuiz?.nama_kuis}
        />
      )}
    </SpaceBackground>
  );
};

export default QuizContainer;
