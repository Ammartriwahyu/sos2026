import React from "react";
import { QuizSoal, Pilihan, Pertanyaan } from "@/api/services/user/quiz";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";

interface QuizViewSos26Props {
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  kuisData?: QuizSoal | null;
  currentQuestion?: Pertanyaan;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  timeLeft: string;
  isLastQuestion: boolean;
  isFinished?: boolean; // <--- Tambahkan baris ini agar TypeScript mengenalinya
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
}: QuizViewSos26Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-white/50 border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-medium">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div className="bg-red-500/20 border border-red-500/50 text-white px-6 py-4 rounded-xl max-w-md text-center backdrop-blur-md">
          <p className="font-medium">Error occurred</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!kuisData || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="bg-yellow-500/20 border border-yellow-500/50 text-white px-6 py-4 rounded-xl backdrop-blur-md">
          <p className="font-medium">Quiz data not found</p>
        </div>
      </div>
    );
  }

  const sortedPilihan = [...currentQuestion.pilihan].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  return (
    <main className="mycontainer py-6 flex flex-col items-center">
      {/* COMMENT: [Countdown Timer] Gaya Liquid Glass terbaru dengan rounded-12, semi-bold, text-white */}
      <div className="w-full max-w-[1080px] flex justify-end mb-[20px] px-2">
        <div
          className="px-4 py-2 rounded-[12px] text-base font-semibold text-white transition-all"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.04) 100%)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "inset 0 1px 2px 0 rgba(0,0,0,0.2), 0 4px 16px 0 rgba(0,0,0,0.15)",
          }}
        >
          Sisa Waktu: {timeLeft}
        </div>
      </div>

      {/* COMMENT: [Main Card Container] Liquid Glass max-w-[1080px] dengan padding xy 40 */}
      <div
        className="w-full max-w-[1080px] h-auto p-[40px] rounded-[24px] flex flex-col transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.04) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "inset 0 2px 4px 0 rgba(0,0,0,0.25), 0 8px 32px 0 rgba(0,0,0,0.2)",
        }}
      >
        {/* SUB-FRAME 1: Informasi Soal Ke Berapa */}
        <div className="w-full">
          <h2 className="text-xl font-semibold text-white tracking-wide">
            Soal {currentQuestionIndex + 1} dari{" "}
            {kuisData.list_pertanyaan.length}
          </h2>
        </div>

        {/* SUB-FRAME 2: Frame Soal (Gap vertikal 26px) */}
        <div className="w-full mt-[26px]">
          <p className="text-base font-medium text-white whitespace-pre-line break-words leading-relaxed">
            {currentQuestion.pertanyaan}
          </p>
        </div>

        {/* SUB-FRAME 3: Frame Opsi Pilihan Soal (Gap vertikal 26px, antar opsi 18px) */}
        <div className="w-full mt-[26px] flex flex-col gap-[18px]">
          {sortedPilihan.map((pilihan: Pilihan) => {
            const isSelected =
              answers[currentQuestion.id_pertanyaan] === pilihan.label;
            return (
              <button
                key={pilihan.label}
                type="button"
                onClick={() =>
                  onSelectAnswer(currentQuestion.id_pertanyaan, pilihan.label)
                }
                className="w-full h-[48px] px-4 rounded-[24px] flex items-center text-left transition-all duration-200 border cursor-pointer group"
                style={{
                  background: isSelected
                    ? "rgba(136, 129, 188, 0.5)"
                    : "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderColor: isSelected
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(255, 255, 255, 0.2)",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.15)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.08)";
                  }
                }}
              >
                <span className="font-bold text-base mr-3 text-white">
                  {pilihan.label}.
                </span>
                <span className="text-base font-normal text-white">
                  {pilihan.value}
                </span>
              </button>
            );
          })}
        </div>

        {/* SUB-FRAME 4: Frame Button Navigasi Bawah (Gap vertikal 26px, tanpa line pemisah) */}
        <div className="w-full mt-[26px] flex items-center justify-end">
          {isLastQuestion ? (
            <AktivitasButton
              onClick={onSubmit}
              disabled={isSubmitting}
              className="bg-[#8881BC] hover:bg-[#776fa8] text-white border-none shadow-md"
            >
              {isSubmitting ? "Mengumpulkan..." : "Selesai"}
            </AktivitasButton>
          ) : (
            <AktivitasButton
              onClick={onNext}
              className="bg-[#8881BC] hover:bg-[#776fa8] text-white border-none shadow-md"
            >
              Soal Berikutnya
            </AktivitasButton>
          )}
        </div>
      </div>
    </main>
  );
};
