import React from "react";
import { QuizSoal, Pertanyaan, Pilihan } from "@/api/services/user/quiz";
import { Button } from "@/shared/components/ui/Button";

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
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-medium">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
          <p className="font-medium">Error occurred</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!kuisData || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="bg-yellow-100 text-yellow-700 px-6 py-4 rounded-lg">
          <p className="font-medium">Quiz data not found</p>
        </div>
      </div>
    );
  }

  const sortedPilihan = [...currentQuestion.pilihan].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  return (
    <main className="mycontainer py-10 ">
      <div className="max-w-4xl bg-white space-y-6 px-8 sm:px-16 py-12 rounded-2xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-center gap-4 lg:justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-xl  sm:text-xl text-primary-500 font-bold">
              {kuisData.nama_kuis}
            </h1>
            <p className="text-black text-center lg:text-left">
              Soal {currentQuestionIndex + 1} dari{" "}
              {kuisData.list_pertanyaan.length}
            </p>
          </div>
          <Button
            variant={"outline"}
            disabled={true}
            size={"small"}
            className="border-primary-500"
          >
            Sisa Waktu: {timeLeft}
          </Button>
        </div>

        <div className="border-t border-b border-gray-200 py-4">
          <h3 className="font-semibold mb-3">Navigasi Soal</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-4 lg:gap-2">
            {kuisData.list_pertanyaan.map((soal, index) => {
              const isAnswered = !!answers[soal.id_pertanyaan];
              const isCurrent = index === currentQuestionIndex;

              let buttonClass = "bg-gray-200 hover:bg-gray-300 text-black";
              if (isAnswered) {
                buttonClass =
                  "bg-primary-500 text-white ring-2 ring-primary-300";
              }
              if (isCurrent) {
                buttonClass =
                  "bg-primary-500 text-white ring-2 ring-primary-300";
              }

              return (
                <button
                  key={soal.id_pertanyaan}
                  onClick={() => onJumpToQuestion(index)}
                  className={`w-9 h-9 flex items-center justify-center rounded-md font-medium text-sm transition-all ${buttonClass}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 rounded-lg bg-[#F5E6E9]">
          <h5 className="font-semibold text-lg sm:text-xl">Pertanyaan</h5>
          <p className="text-base sm:text-lg mb-6 whitespace-pre-line break-words">
            {currentQuestion.pertanyaan}
          </p>

          <div className="grid grid-cols-1 gap-4">
            {sortedPilihan.map((pilihan: Pilihan) => (
              <button
                key={pilihan.label}
                onClick={() =>
                  onSelectAnswer(currentQuestion.id_pertanyaan, pilihan.label)
                }
                className={`w-full flex items-center gap-2  py-4 md:py-3 px-3 md:px-4 rounded-xl md:rounded-2xl border text-left text-sm md:text-base transition-colors ${
                  answers[currentQuestion.id_pertanyaan] === pilihan.label
                    ? "border-primary-500 text-primary-500 bg-primary-100 hover:bg-primary-200"
                    : "bg-white border-black/50 hover:bg-gray-100"
                }`}
              >
                <p className="font-bold mr-2 md:mr-3">{pilihan.label}.</p>
                <p>{pilihan.value}</p>
              </button>
            ))}
          </div>

          <div className="lg:flex grid grid-cols-2 gap-4 lg:gap-0  lg:justify-between mt-8">
            <Button
              className="text-xs md:text-base"
              onClick={onPrev}
              variant={"outline"}
              disabled={currentQuestionIndex === 0}
            >
              Sebelumnya
            </Button>
            {isLastQuestion ? (
              <Button
                className="text-xs md:text-base"
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Mengumpulkan..." : "Selesai"}
              </Button>
            ) : (
              <Button
                className="text-xs md:text-base"
                onClick={onNext}
                size="small"
              >
                Selanjutnya
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
