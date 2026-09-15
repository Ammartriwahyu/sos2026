"use client";

import { useState } from "react";
import { stfService } from "@/api/services/admin/stf";

export const useDeleteStf = (onSuccess: () => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string, nama: string) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus calon "${nama}"?`,
    );

    if (isConfirmed) {
      setIsLoading(true);
      try {
        const response = await stfService.deleteCaketang(id);
        if (response.status_code === 200) {
          alert("Caketang berhasil dihapus.");
          onSuccess();
        } else {
          throw new Error(response.message || "Gagal menghapus data.");
        }
      } catch (error: unknown) {
        alert("Terjadi kesalahan saat menghapus data.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { isDeleting: isLoading, deleteCaketang: handleDelete };
};
