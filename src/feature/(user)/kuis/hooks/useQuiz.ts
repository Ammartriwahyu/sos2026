"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useGetSoalKuis } from "./useGetSoalQuiz";
import { useSubmitKuis } from "./useSubmitJawaban";
import { useRouter } from "next/navigation";
import { QuizResult } from "@/api/services/user/quiz";

type ModalContent = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText: string;
  hideCancelButton?: boolean;
};

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => (v < 10 ? "0" + v : v)).join(":");
};

const parseDurationToSeconds = (duration: string): number => {
  const parts = duration.split(":").map(Number);
  return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
};

interface UseQuizProps {
  id_kuis: string;
  onQuizComplete?: (result: QuizResult) => void;
  onStatusChange?: () => void;
}

export const useQuiz = ({
  id_kuis,
  onQuizComplete,
  onStatusChange,
}: UseQuizProps) => {
  const router = useRouter();
  const { data: kuisData, isLoading, error } = useGetSoalKuis(id_kuis);
  const { submitJawaban, isLoading: isSubmitting } = useSubmitKuis();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [isSubmissionInProgress, setIsSubmissionInProgress] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const totalDuration = useMemo(() => {
    return kuisData ? parseDurationToSeconds(kuisData.durasi_kuis) : 0;
  }, [kuisData]);

  // Initialize timer dengan memperhitungkan waktu yang sudah berlalu
  useEffect(() => {
    if (totalDuration > 0) {
      const startTimeKey = `quizStartTime-${id_kuis}`;
      const savedAnswersKey = `quizAnswers-${id_kuis}`;
      const savedIndexKey = `quizCurrentIndex-${id_kuis}`;

      // Restore jawaban dan index yang tersimpan
      const savedAnswers = localStorage.getItem(savedAnswersKey);
      const savedIndex = localStorage.getItem(savedIndexKey);

      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
        } catch (e) {
          console.error("Error parsing saved answers:", e);
        }
      }

      if (savedIndex) {
        const index = parseInt(savedIndex, 10);
        if (!isNaN(index)) {
          setCurrentQuestionIndex(index);
        }
      }

      // Cek apakah quiz sudah dimulai sebelumnya
      const savedStartTime = localStorage.getItem(startTimeKey);
      const now = Date.now();

      if (savedStartTime) {
        // Hitung waktu yang sudah berlalu
        const startTime = parseInt(savedStartTime, 10);
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        const remainingTime = Math.max(0, totalDuration - elapsedSeconds);

        setTimeLeft(remainingTime);

        // Jika waktu sudah habis, auto submit
        if (remainingTime <= 0) {
          setIsFinished(true);
        }
      } else {
        // Pertama kali memulai quiz
        localStorage.setItem(startTimeKey, now.toString());
        setTimeLeft(totalDuration);
      }
    }
  }, [totalDuration, id_kuis]);

  // Save jawaban dan index ke localStorage setiap kali berubah
  useEffect(() => {
    if (!isFinished && Object.keys(answers).length > 0) {
      localStorage.setItem(`quizAnswers-${id_kuis}`, JSON.stringify(answers));
    }
  }, [answers, id_kuis, isFinished]);

  useEffect(() => {
    if (!isFinished) {
      localStorage.setItem(
        `quizCurrentIndex-${id_kuis}`,
        currentQuestionIndex.toString(),
      );
    }
  }, [currentQuestionIndex, id_kuis, isFinished]);

  const closeModal = () => setModalContent(null);

  const cleanupLocalStorage = useCallback(() => {
    localStorage.removeItem(`quizStartTime-${id_kuis}`);
    localStorage.removeItem(`quizAnswers-${id_kuis}`);
    localStorage.removeItem(`quizCurrentIndex-${id_kuis}`);
  }, [id_kuis]);

  const executeSubmit = useCallback(async () => {
    if (!kuisData || isFinished || isSubmissionInProgress) return;

    setIsSubmissionInProgress(true);
    closeModal();

    const payloadList = Object.entries(answers).map(([id, jawaban]) => ({
      id_pertanyaan: id,
      jawaban: jawaban,
    }));

    try {
      const result = await submitJawaban(id_kuis, {
        pertanyaan_list: payloadList,
      });

      setIsFinished(true);
      cleanupLocalStorage();

      // Panggil callback untuk update status quiz di parent component
      if (onQuizComplete && result) {
        await onQuizComplete(result);
      }

      // Trigger status refresh in parent component dengan delay
      if (onStatusChange) {
        // Berikan sedikit delay untuk memastikan backend sudah update
        setTimeout(() => {
          onStatusChange();
        }, 500);
      }

      // Navigate dengan force refresh untuk memastikan data terbaru
      setTimeout(() => {
        // Force refresh halaman untuk memastikan data terbaru
        window.location.href = `/aktivitas/kuis/${id_kuis}`;
      }, 1000);
    } catch (submitError) {
      console.error("Submit error:", submitError);
      setIsSubmissionInProgress(false);
      setModalContent({
        isOpen: true,
        title: "Gagal Mengumpulkan",
        message: "Terjadi kesalahan saat menyimpan jawaban. Silakan coba lagi.",
        onConfirm: closeModal,
        confirmText: "Tutup",
        hideCancelButton: true,
      });
    }
  }, [
    answers,
    kuisData,
    id_kuis,
    submitJawaban,
    router,
    isFinished,
    isSubmissionInProgress,
    cleanupLocalStorage,
    onQuizComplete,
    onStatusChange,
  ]);

  const handleSubmit = useCallback(() => {
    if (!kuisData || isFinished || isSubmissionInProgress) return;
    const totalSoal = kuisData.list_pertanyaan.length;
    const soalDijawab = Object.keys(answers).length;

    if (timeLeft > 1 && soalDijawab < totalSoal) {
      const belumTerjawab = totalSoal - soalDijawab;
      setModalContent({
        isOpen: true,
        title: "Konfirmasi Pengumpulan",
        message: `Anda belum menjawab ${belumTerjawab} soal. Apakah Anda yakin ingin mengumpulkan jawaban sekarang?`,
        onConfirm: executeSubmit,
        confirmText: "Ya, Kumpulkan",
      });
    } else {
      executeSubmit();
    }
  }, [
    kuisData,
    isFinished,
    isSubmissionInProgress,
    answers,
    timeLeft,
    executeSubmit,
  ]);

  useEffect(() => {
    if (isFinished || timeLeft <= 0 || isSubmissionInProgress) return;
    if (timeLeft === 1) handleSubmit();
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isFinished, isSubmissionInProgress, handleSubmit]);

  useEffect(() => {
    if (isFinished) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Anda yakin ingin meninggalkan halaman? Quiz akan tetap berjalan di background.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFinished]);

  const handleSelectAnswer = useCallback(
    (questionId: string, answerLabel: string) => {
      if (!isFinished && !isSubmissionInProgress) {
        setAnswers((prev) => ({ ...prev, [questionId]: answerLabel }));
      }
    },
    [isFinished, isSubmissionInProgress],
  );

  const handleJumpToQuestion = (index: number) => {
    if (
      kuisData &&
      index >= 0 &&
      index < kuisData.list_pertanyaan.length &&
      !isFinished &&
      !isSubmissionInProgress
    ) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleNext = () => {
    if (
      kuisData &&
      currentQuestionIndex < kuisData.list_pertanyaan.length - 1 &&
      !isFinished &&
      !isSubmissionInProgress
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0 && !isFinished && !isSubmissionInProgress) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const currentQuestion = kuisData?.list_pertanyaan[currentQuestionIndex];
  const isLastQuestion = kuisData
    ? currentQuestionIndex === kuisData.list_pertanyaan.length - 1
    : false;

  return {
    isLoading,
    isSubmitting: isSubmitting || isSubmissionInProgress,
    error,
    kuisData,
    currentQuestion,
    currentQuestionIndex,
    answers,
    timeLeft: formatTime(timeLeft),
    isLastQuestion,
    isFinished,
    modalContent,
    closeModal,
    quizResult,
    setQuizResult,
    onSelectAnswer: handleSelectAnswer,
    onSubmit: handleSubmit,
    onNext: handleNext,
    onPrev: handlePrev,
    onJumpToQuestion: handleJumpToQuestion,
  };
};
