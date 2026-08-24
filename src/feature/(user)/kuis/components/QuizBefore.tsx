import { Quiz } from "@/api/services/user/quiz";
import { Button } from "@/shared/components/ui/Button";
import React, { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

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
      <div className="w-full space-y-4 px-8 py-6 rounded-2xl mt-20 min-h-[15rem] bg-[#F5E6E9]">
        <h4 className="font-bold text-black">Siap Taklukan Quiz?</h4>
        <p className="text-justify ">
          <span className="whitespace-pre-line">{quiz?.deskripsi_kuis}</span>
          <p>
            Kamu punya <span className="font-bold">{totalMinutes}</span>
            Menit penuh untuk fokus. Ingat, timer akan terus berjalan.
            Percayalah pada persiapan yang sudah kamu lakukan!
          </p>
        </p>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mx-auto cursor-pointer text-sm mt-10"
          disabled={isOverdue}
        >
          {isOverdue ? "Kuis Sudah Berakhir" : "Mulai Kuis Sekarang"}
        </Button>
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
