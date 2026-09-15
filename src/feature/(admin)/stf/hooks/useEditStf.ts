"use client";

import { useState, useEffect, FormEvent } from "react";
import { stfService } from "@/api/services/admin/stf";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

export const useEditStf = (id: string) => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  // ✅ TAMBAHKAN STATE INI untuk menyimpan URL foto yang sudah ada
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  const [initialDataLoading, setInitialDataLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await stfService.getCaketangById(id);
        if (response && response.data) {
          // Pastikan API Anda mengembalikan URL foto, contoh: response.data.foto_url
          const { nama, prodi, visi, misi, foto } = response.data;
          setNama(nama);
          setProdi(prodi);
          setVisi(visi);
          setMisi(misi);

          // ✅ SIMPAN URL FOTO yang didapat dari API
          setFotoUrl(foto);
        } else {
          throw new Error("Data caketang tidak ditemukan.");
        }
      } catch (error: unknown) {
        alert("Gagal memuat data caketang.");
      } finally {
        setInitialDataLoading(false);
      }
    };

    if (id) {
      fetchInitialData();
    }
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("prodi", prodi);
    formData.append("visi", visi);
    formData.append("misi", misi);

    // Logika ini sudah benar: hanya kirim file baru jika ada.
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const response = await stfService.updateCaketang(id, formData);
      if (response.status_code === 200) {
        alert("Data berhasil diperbarui!");
        router.push("/admin/stf");
      } else {
        throw new Error(response.message || "Gagal memperbarui data.");
      }
    } catch (error: unknown) {
      let backendMessage = "Terjadi kesalahan saat memperbarui data.";
      if (
        isAxiosError<{ message?: string }>(error) &&
        error.response?.data?.message
      ) {
        backendMessage = error.response.data.message;
      }
      alert(`Gagal: ${backendMessage}`);
    } finally {
      setIsSubmitting(false);
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
    setFoto,
    fotoUrl, // ✅ KEMBALIKAN FOTO URL untuk ditampilkan di UI
    initialDataLoading,
    isSubmitting,
    handleSubmit,
  };
};
