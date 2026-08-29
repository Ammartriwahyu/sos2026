import { useState, useMemo } from "react";
import { type CreateQuizPayload } from "@/api/services/admin/quiz";
import { useCreateQuiz } from "./useCreateQuiz";

interface UseQuizFormProps {
  onSuccess: () => void;
  onError?: (error: Error) => void;
}

export const useQuizForm = ({ onSuccess, onError }: UseQuizFormProps) => {
  const [kuisNama, setKuisNama] = useState("");
  const [kuisDeskripsi, setKuisDeskripsi] = useState("");
  const [tenggat, setTenggat] = useState("");
  const [durasiKuis, setDurasiKuis] = useState("");
  const [kesempatan, setKesempatan] = useState<string>("1");
  const [idRangkaian, setIdRangkaian] = useState("");

  const { createQuiz, isLoading: isSubmitting } = useCreateQuiz({ onSuccess });

  const isFormValid = useMemo(() => {
    return (
      kuisNama.trim() !== "" &&
      kuisDeskripsi.trim() !== "" &&
      tenggat !== "" &&
      durasiKuis !== "" &&
      Number(kesempatan) > 0 &&
      idRangkaian !== ""
    );
  }, [kuisNama, kuisDeskripsi, tenggat, durasiKuis, kesempatan, idRangkaian]);
  const convertMinutesToHHMM = (minutesString: string): string => {
    const totalMinutes = parseInt(minutesString, 10);
    if (isNaN(totalMinutes) || totalMinutes < 0) {
      return "00:00";
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };
  const handleSubmit = async () => {
    try {
      if (!isFormValid) {
        throw new Error("Harap lengkapi semua field yang wajib diisi.");
      }

      const payload: CreateQuizPayload = {
        kuis_nama: kuisNama,
        kuis_deskripsi: kuisDeskripsi,
        tenggat: new Date(tenggat).toISOString(),
        durasi_kuis: convertMinutesToHHMM(durasiKuis),
        kesempatan: Number(kesempatan),
        id_rangkaian: idRangkaian,
      };

      await createQuiz(payload);
    } catch (error) {
      if (onError && error instanceof Error) {
        onError(error);
      }
      throw error;
    }
  };

  const resetForm = () => {
    setKuisNama("");
    setKuisDeskripsi("");
    setTenggat("");
    setDurasiKuis("");
    setKesempatan("1");
    setIdRangkaian("");
  };

  return {
    kuisNama,
    setKuisNama,
    kuisDeskripsi,
    setKuisDeskripsi,
    tenggat,
    setTenggat,
    durasiKuis,
    setDurasiKuis,
    kesempatan,
    setKesempatan,
    idRangkaian,
    setIdRangkaian,
    isSubmitting,
    isFormValid,
    handleSubmit,
    resetForm,
  };
};
