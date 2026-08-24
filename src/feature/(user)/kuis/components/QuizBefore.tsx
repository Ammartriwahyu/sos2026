import { Quiz } from "@/api/services/user/quiz";
import React, { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";
import { Clock, PlayCircle } from "lucide-react";

const convertDurationToMinutes = (duration: string | undefined): number => {
  if (!duration) return 0;
  try {
    const parts = duration.split(":");
    if (parts.length !== 3) return 0;
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return hours * 60 + minutes;
  } catch {
    return 0;
  }
};

const QuizBefore = ({ quiz }: { quiz: Quiz | null }) => {
  const totalMinutes = convertDurationToMinutes(quiz?.durasi_kuis);

  const isOverdue =
    quiz?.status_kuis === "Terlewat" ||
    quiz?.status_kuis === "Terlambat" ||
    (quiz?.tenggat_kuis
      ? new Date(quiz.tenggat_kuis).getTime() < Date.now()
      : false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartQuiz = () => {
    if (!quiz?.id_kuis) return;
    window.location.href = `/aktivitas/kuis/start/${quiz.id_kuis}`;
  };

  return (
    <>
      <div
        className="w-full px-6 py-6 rounded-xl flex flex-col gap-4"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-2">
          <PlayCircle className="w-5 h-5 text-white/70 shrink-0" />
          <h4 className="font-bold text-white text-lg">Siap Taklukan Kuis?</h4>
        </div>

        <p className="text-white/70 text-sm leading-relaxed">
          {quiz?.deskripsi_kuis}
        </p>

        {totalMinutes > 0 && (
          <div
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg self-start"
            style={{
              background: "rgba(96,89,146,0.25)",
              border: "1px solid rgba(96,89,146,0.4)",
            }}
          >
            <Clock className="w-4 h-4 text-white/70 shrink-0" />
            <p className="text-white/80 text-sm">
              Durasi:{" "}
              <span className="font-bold text-white">{totalMinutes} menit</span>
              . Timer akan terus berjalan setelah kuis dimulai.
            </p>
          </div>
        )}

        <AktivitasButton
          onClick={() => setIsModalOpen(true)}
          className="mt-2 py-3 cursor-pointer"
          disabled={isOverdue}
          variant="primary"
        >
          {isOverdue ? "Kuis Sudah Berakhir" : "Mulai Kuis Sekarang"}
        </AktivitasButton>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleStartQuiz}
        title="Mulai Kuis"
        message="Apakah Anda yakin ingin memulai kuis sekarang? Waktu akan langsung berjalan setelah Anda menekan 'Mulai'."
        confirmText="Ya, Mulai Sekarang"
        cancelText="Nanti Dulu"
      />
    </>
  );
};

export default QuizBefore;
