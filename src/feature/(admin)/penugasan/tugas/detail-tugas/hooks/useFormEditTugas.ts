import { useState, useEffect } from "react";
import { tugasService, TugasStatus } from "@/api/services/admin/tugas";

interface UseFormEditTugasProps {
  submissionData: TugasStatus;
  onSuccess: () => void;
}

export const useFormEditTugas = ({
  submissionData,
  onSuccess,
}: UseFormEditTugasProps) => {
  const keTeks = (value: number | null | undefined) =>
    value === null || value === undefined ? "" : String(value);

  const [nilai, setNilai] = useState<string>(keTeks(submissionData.nilai));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setNilai(keTeks(submissionData.nilai));
  }, [submissionData]);

  const performSubmit = async () => {
    setIsSubmitting(true);
    try {
      await tugasService.updateSubmissionScore(submissionData.id, {
        score: Number(nilai),
      });
      onSuccess();
    } catch (error) {
      console.error("Gagal memperbarui nilai:", error);
      throw new Error("Gagal memperbarui nilai. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    nilai,
    setNilai,
    isSubmitting,
    performSubmit,
  };
};
