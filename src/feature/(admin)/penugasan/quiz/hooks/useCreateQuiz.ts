import { useState, useCallback } from "react";
import { isAxiosError } from "axios";
import { kuisService, type CreateQuizPayload } from "@/api/services/admin/quiz";

interface UseCreateQuizProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useCreateQuiz = ({
  onSuccess,
  onError,
}: UseCreateQuizProps = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createQuiz = useCallback(
    async (payload: CreateQuizPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        await kuisService.createKuis(payload);
        if (onSuccess) {
          onSuccess();
        }
      } catch (err: unknown) {
        const pesanBackend = isAxiosError<{ message?: string }>(err)
          ? err.response?.data?.message
          : undefined;
        const errorMessage =
          pesanBackend ??
          (err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat membuat kuis");
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
        console.error(err);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError],
  );

  return { createQuiz, isLoading, error };
};
