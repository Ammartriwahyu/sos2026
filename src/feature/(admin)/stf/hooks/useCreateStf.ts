"use client";

import { useState, FormEvent } from "react";
import { stfService } from "@/api/services/admin/stf";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

export const useCreateStf = () => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    onSuccess: () => void,
    onError: (msg: string) => void,
  ) => {
    event.preventDefault();
    setIsLoading(true);

    if (!nama || !prodi || !visi || !misi || !foto) {
      onError("Semua field wajib diisi!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("prodi", prodi);
    formData.append("visi", visi);
    formData.append("misi", misi);
    formData.append("foto", foto);

    try {
      const response = await stfService.createCaketang(formData);
      if (response.status_code === 201) {
        onSuccess();
      } else {
        throw new Error(response.message || "Gagal membuat caketang.");
      }
    } catch (error: unknown) {
      let backendMessage = "Terjadi kesalahan saat menghubungi server.";
      if (
        isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
      ) {
        backendMessage = error.response.data.message;
      }
      onError(backendMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nama,
    setNama,
    prodi,
    setProdi,
    visi,
    setVisi,
    misi,
    setMisi,
    foto,
    setFoto,
    isLoading,
    handleSubmit,
  };
};
