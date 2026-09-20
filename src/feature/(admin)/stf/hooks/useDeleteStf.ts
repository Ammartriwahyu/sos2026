"use client";

import { useState } from "react";
import { stfService } from "@/api/services/admin/stf";

export const useDeleteStf = (
  onSuccess: () => void,
  onError: (msg: string) => void,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await stfService.deleteCaketang(id);
      if (response.status_code === 200) {
        onSuccess();
      } else {
        throw new Error(response.message || "Gagal menghapus data.");
      }
    } catch (error: unknown) {
      onError("Terjadi kesalahan saat menghapus data.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isDeleting: isLoading, deleteCaketang: handleDelete };
};
