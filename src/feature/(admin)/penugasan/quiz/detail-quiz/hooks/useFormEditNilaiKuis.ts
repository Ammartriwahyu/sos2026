import { useState, useEffect } from "react";
import { kuisService, QuizSubmission } from "@/api/services/admin/quiz";

interface UseFormEditNilaiKuisProps {
  submissionData: QuizSubmission;
  kuisId: string;
  totalSoal: number;
  onSuccess: () => void;
}

export const useFormEditNilaiKuis = ({
  submissionData,
  kuisId,
  totalSoal,
  onSuccess,
}: UseFormEditNilaiKuisProps) => {
  const toJawabanBenar = (score: number, total: number) => {
    if (total <= 0) return String(score);
    // score is 0-100, convert to count; if score already looks like count, keep it
    if (score > 100) return String(score);
    return String(Math.round((score / 100) * total));
  };

  const [jawabanBenar, setJawabanBenar] = useState<string>(
    toJawabanBenar(submissionData.score, totalSoal),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setJawabanBenar(toJawabanBenar(submissionData.score, totalSoal));
  }, [submissionData.score, totalSoal]);

  const performSubmit = async () => {
    setIsSubmitting(true);
    try {
      const angka = Number(jawabanBenar);
      await kuisService.updateManualScore(kuisId, {
        nim: submissionData.nim,
        jawaban_benar: angka,
      });
      onSuccess();
    } catch (error) {
      console.error("Gagal memperbarui nilai kuis:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    jawabanBenar,
    setJawabanBenar,
    isSubmitting,
    performSubmit,
  };
};
