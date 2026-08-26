import { useState, useCallback } from "react";
import { presensiService } from "@/api/services/user/presensi";
import axios from "axios";

export const useSubmitPresensi = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const submit = useCallback(async (kode: string, photo: Blob) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    try {
      const response = await presensiService.submitPresensi(kode, photo);
      if (response.status_code === 200) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(response.message || "Gagal melakukan presensi.");
      }
    } catch (err: unknown) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err.response.data.message
      ) {
        setSubmitError(err.response.data.message);
      } else {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat melakukan presensi.";
        setSubmitError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submit,
    isSubmitting,
    submitError,
    submitSuccess,
  };
};
