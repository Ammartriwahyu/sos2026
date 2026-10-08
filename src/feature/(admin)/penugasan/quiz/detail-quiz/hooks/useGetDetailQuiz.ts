import { DetailQuiz, kuisService } from "@/api/services/admin/quiz";
import { useCallback, useEffect, useState } from "react";

export const useGetDetailQuiz = (id_quiz: string) => {
  const [data, setData] = useState<DetailQuiz | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await kuisService.getDetailKuisById(id_quiz);
      const detail = response.data;

      if (detail && !detail.is_visible) {
        try {
          const listResponse = await kuisService.getAllKuis();
          const summary = listResponse.data?.find(
            (kuis) => kuis.id_kuis === id_quiz,
          );

          if (summary?.is_visible) {
            setData({ ...detail, is_visible: summary.is_visible });
            return;
          }
        } catch (listError) {
          console.error(listError);
        }
      }

      setData(detail);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id_quiz]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { data, isLoading, error, refresh: fetchDetail };
};
