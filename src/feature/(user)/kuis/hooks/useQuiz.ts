"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useGetSoalKuis } from "./useGetSoalQuiz";
import { useSubmitKuis } from "./useSubmitJawaban";
import { useRouter } from "next/navigation";
import axios from "axios";
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
  const [isTimerReady, setIsTimerReady] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const [isSubmissionInProgress, setIsSubmissionInProgress] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const hasAutoSubmitted = useRef(false);

  const totalDuration = useMemo(() => {
    return kuisData ? parseDurationToSeconds(kuisData.durasi_kuis) : 0;
  }, [kuisData]);

  const getRemainingTime = useCallback(() => {
    const savedStartTime = localStorage.getItem(`quizStartTime-${id_kuis}`);
    const startTime = savedStartTime ? parseInt(savedStartTime, 10) : NaN;
    if (isNaN(startTime)) return totalDuration;
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, totalDuration - elapsedSeconds);
  }, [id_kuis, totalDuration]);

  useEffect(() => {
    if (totalDuration > 0) {
      const startTimeKey = `quizStartTime-${id_kuis}`;
      const savedAnswersKey = `quizAnswers-${id_kuis}`;
      const savedIndexKey = `quizCurrentIndex-${id_kuis}`;

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

      if (localStorage.getItem(startTimeKey)) {
        const remainingTime = getRemainingTime();

        setTimeLeft(remainingTime);

        if (remainingTime <= 0) {
          setIsFinished(true);
        }
      } else {
        localStorage.setItem(startTimeKey, Date.now().toString());
        setTimeLeft(totalDuration);
      }

      setIsTimerReady(true);
    }
  }, [totalDuration, id_kuis, getRemainingTime]);

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

      if (result) {
        setQuizResult(result);
      }

      setIsSubmissionInProgress(false);

      if (onQuizComplete && result) {
        await onQuizComplete(result);
      }

      if (onStatusChange) {
        setTimeout(() => {
          onStatusChange();
        }, 500);
      }
    } catch (submitError) {
      console.error("Submit error:", submitError);
      setIsSubmissionInProgress(false);

      const pesanBackend = axios.isAxiosError(submitError)
        ? (submitError.response?.data as { message?: string } | undefined)
            ?.message
        : undefined;

      if (
        axios.isAxiosError(submitError) &&
        submitError.response?.status === 409
      ) {
        setModalContent({
          isOpen: true,
          title: "Gagal Mengumpulkan",
          message:
            pesanBackend ??
            "Jawabanmu belum bisa dikirim. Muat ulang halaman, lalu kumpulkan lagi.",
          onConfirm: () => window.location.reload(),
          confirmText: "Muat Ulang",
          hideCancelButton: true,
        });
        return;
      }

      setModalContent({
        isOpen: true,
        title: "Gagal Mengumpulkan",
        message:
          pesanBackend ??
          "Terjadi kesalahan saat menyimpan jawaban. Silakan coba lagi.",
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
    if (!isTimerReady || isFinished || isSubmissionInProgress) return;

    const syncTimeLeft = () => setTimeLeft(getRemainingTime());
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") syncTimeLeft();
    };

    syncTimeLeft();
    const timerId = setInterval(syncTimeLeft, 1000);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", syncTimeLeft);
    window.addEventListener("pageshow", syncTimeLeft);

    return () => {
      clearInterval(timerId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", syncTimeLeft);
      window.removeEventListener("pageshow", syncTimeLeft);
    };
  }, [isTimerReady, isFinished, isSubmissionInProgress, getRemainingTime]);

  useEffect(() => {
    if (!isTimerReady || isFinished || isSubmissionInProgress) return;
    if (timeLeft > 1 || hasAutoSubmitted.current) return;
    hasAutoSubmitted.current = true;
    executeSubmit();
  }, [
    timeLeft,
    isTimerReady,
    isFinished,
    isSubmissionInProgress,
    executeSubmit,
  ]);

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
