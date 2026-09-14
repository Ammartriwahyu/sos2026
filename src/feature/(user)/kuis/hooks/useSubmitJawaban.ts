import { useState } from "react";
import axios from "axios";
import {
  kuisService,
  SubmitKuisPayload,
  QuizResult,
} from "@/api/services/user/quiz";

export const useSubmitKuis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<QuizResult | null>(null);

  const submitJawaban = async (
    id_kuis: string,
    payload: SubmitKuisPayload,
  ): Promise<QuizResult | null> => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await kuisService.submitJawabanKuis(id_kuis, payload);
      const resultData = response.data as QuizResult;
      setData(resultData);
      return resultData;
    } catch (err) {
      const pesanBackend = axios.isAxiosError(err)
        ? (err.response?.data as { message?: string } | undefined)?.message
        : undefined;
      const errorMessage =
        pesanBackend ??
        (err instanceof Error ? err.message : "Gagal mengirim jawaban.");
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitJawaban, isLoading, error, data };
};
