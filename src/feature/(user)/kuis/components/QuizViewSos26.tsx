import React from "react";
import { QuizSoal, Pertanyaan, Pilihan } from "@/api/services/user/quiz";
import { Loader2, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";

export interface QuizViewSos26Props {
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  kuisData?: QuizSoal | null;
  currentQuestion?: Pertanyaan;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  timeLeft: string;
  isLastQuestion: boolean;
  onSelectAnswer: (questionId: string, answerLabel: string) => void;
  onSubmit: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJumpToQuestion: (index: number) => void;
}

export const QuizViewSos26 = ({
  isLoading,
  isSubmitting,
  error,
  kuisData,
  currentQuestion,
  currentQuestionIndex,
  answers,
  timeLeft,
  isLastQuestion,
  onSelectAnswer,
  onSubmit,
  onNext,
  onPrev,
  onJumpToQuestion,
}: QuizViewSos26Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Loader2 className="w-16 h-16 animate-spin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        <p className="text-white font-medium">Memuat kuis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div
          className="px-6 py-4 rounded-2xl max-w-md text-center text-white"
          style={{
            background: "rgba(207, 42, 74, 0.2)",
            border: "1px solid rgba(207, 42, 74, 0.4)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p className="font-semibold">Terjadi Kesalahan</p>
          <p className="text-sm mt-1 text-white/70">{error}</p>
        </div>
      </div>
    );
  }

  if (!kuisData || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div
          className="px-6 py-4 rounded-2xl text-white"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          }}
        >
          <p className="font-medium">Data kuis tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const sortedPilihan = [...currentQuestion.pilihan].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  const totalSoal = kuisData.list_pertanyaan.length;
  const totalDijawab = Object.keys(answers).length;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-5 px-3 md:px-6">
      {/* ── Header Card ── */}
      <div
        className="w-full rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(42, 31, 92, 0.5) 0%, rgba(42, 31, 92, 0.25) 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {kuisData.nama_kuis}
          </h1>
          <p className="text-white/60 text-sm">
            Soal {currentQuestionIndex + 1} dari {totalSoal} &nbsp;·&nbsp;{" "}
            {totalDijawab} terjawab
          </p>
        </div>

        {/* Timer badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full self-start sm:self-auto"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Clock className="w-4 h-4 text-white/70 shrink-0" />
          <span className="text-white font-semibold text-sm tabular-nums">
            {timeLeft}
          </span>
        </div>
      </div>

      {/* ── Navigasi Soal ── */}
      <div
        className="w-full rounded-2xl px-6 py-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(250,250,250,0.07) 0%, rgba(250,250,250,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <h3 className="text-white/80 font-semibold text-sm mb-3">
          Navigasi Soal
        </h3>
        <div className="flex flex-wrap gap-2">
          {kuisData.list_pertanyaan.map((soal, index) => {
            const isAnswered = !!answers[soal.id_pertanyaan];
            const isCurrent = index === currentQuestionIndex;

            let style: React.CSSProperties = {
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.6)",
            };

            if (isAnswered) {
              style = {
                background: "rgba(96,89,146,0.7)",
                border: "1px solid rgba(96,89,146,0.9)",
                color: "#fff",
              };
            }

            if (isCurrent) {
              style = {
                background: "#605992",
                border: "2px solid rgba(255,255,255,0.5)",
                color: "#fff",
                boxShadow: "0 0 10px rgba(96,89,146,0.6)",
              };
            }

            return (
              <button
                key={soal.id_pertanyaan}
                onClick={() => onJumpToQuestion(index)}
                style={style}
                className="w-9 h-9 flex items-center justify-center rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Area Pertanyaan ── */}
      <div
        className="w-full rounded-2xl px-6 py-7 flex flex-col gap-6"
        style={{
          background:
            "linear-gradient(135deg, rgba(42, 31, 92, 0.4) 0%, rgba(42, 31, 92, 0.2) 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Nomor & teks pertanyaan */}
        <div className="space-y-3">
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest">
            Pertanyaan {currentQuestionIndex + 1}
          </p>
          <p className="text-white text-base sm:text-lg leading-relaxed whitespace-pre-line break-words">
            {currentQuestion.pertanyaan}
          </p>
        </div>

        {/* Pilihan jawaban */}
        <div className="flex flex-col gap-3">
          {sortedPilihan.map((pilihan: Pilihan) => {
            const isSelected =
              answers[currentQuestion.id_pertanyaan] === pilihan.label;

            return (
              <button
                key={pilihan.label}
                onClick={() =>
                  onSelectAnswer(currentQuestion.id_pertanyaan, pilihan.label)
                }
                className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                style={
                  isSelected
                    ? {
                        background: "rgba(96,89,146,0.6)",
                        border: "1.5px solid rgba(96,89,146,0.9)",
                        boxShadow: "0 0 12px rgba(96,89,146,0.4)",
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }
                }
              >
                {/* Label huruf */}
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={
                    isSelected
                      ? { background: "#605992", color: "#fff" }
                      : {
                          background: "rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.7)",
                        }
                  }
                >
                  {pilihan.label}
                </span>
                <p
                  className={`text-sm sm:text-base ${isSelected ? "text-white font-medium" : "text-white/80"}`}
                >
                  {pilihan.value}
                </p>
              </button>
            );
          })}
        </div>

        {/* Tombol navigasi */}
        <div className="flex justify-between gap-4 pt-2">
          <AktivitasButton
            variant="outline"
            onClick={onPrev}
            disabled={currentQuestionIndex === 0}
            className="flex-1 py-3 flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span>Sebelumnya</span>
          </AktivitasButton>

          {isLastQuestion ? (
            <AktivitasButton
              variant="primary"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Mengumpulkan...</span>
                </>
              ) : (
                <span>Selesai & Kumpulkan</span>
              )}
            </AktivitasButton>
          ) : (
            <AktivitasButton
              variant="primary"
              onClick={onNext}
              className="flex-1 py-3 flex items-center justify-center gap-2"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </AktivitasButton>
          )}
        </div>
      </div>
    </div>
  );
};
