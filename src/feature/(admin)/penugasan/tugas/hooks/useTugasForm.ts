import { useState, useMemo, useEffect } from "react";
import { tugasService, TugasSummary } from "@/api/services/admin/tugas";

export const RANGKAIAN_TANGGAL_CUSTOM = "__tanggal_custom__";

interface UseTugasFormProps {
  initialData?: TugasSummary;
  onSuccess: () => void;
}

export const useTugasForm = ({ initialData, onSuccess }: UseTugasFormProps) => {
  const isEditMode = !!initialData;

  const [judul, setJudul] = useState<string>(initialData?.judul || "");
  const [deskripsi, setDeskripsi] = useState<string>(
    initialData?.deskripsi || "",
  );
  const [is_visible, setIs_visible] = useState<boolean>(
    initialData ? initialData.is_visible === "true" : false,
  );
  const [tenggat, setTenggat] = useState<string>(initialData?.tenggat || "");
  const [fileLink, setFileLink] = useState<string>(
    initialData?.file_link || "",
  );
  const [idRangkaian, setIdRangkaian] = useState<string>(
    initialData?.id_rangkaian || "",
  );
  const [tanggalMulai, setTanggalMulai] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [target, setTarget] = useState<string>(initialData?.target || "");

  const isTanggalCustom = idRangkaian === RANGKAIAN_TANGGAL_CUSTOM;

  useEffect(() => {
    if (initialData) {
      setJudul(initialData.judul);
      setDeskripsi(initialData.deskripsi);
      setTenggat(initialData.tenggat);
      setFileLink(initialData.file_link || "");
      setIdRangkaian(initialData.id_rangkaian);
      setIs_visible(Boolean(initialData.is_visible));
    }
  }, [initialData]);

  const isFormValid = useMemo(() => {
    return (
      judul.trim() !== "" &&
      deskripsi.trim() !== "" &&
      tenggat.trim() !== "" &&
      fileLink.trim() !== "" &&
      (isEditMode || idRangkaian.trim() !== "") &&
      (!isTanggalCustom || tanggalMulai.trim() !== "")
    );
  }, [
    judul,
    deskripsi,
    tenggat,
    fileLink,
    idRangkaian,
    isEditMode,
    isTanggalCustom,
    tanggalMulai,
  ]);

  const formatDateForCreate = (date: Date): string => {
    const pad = (num: number) => num.toString().padStart(2, "0");
    return (
      `${pad(date.getDate())}-${pad(
        date.getMonth() + 1,
      )}-${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds(),
      )}`
    );
  };

  const formatDateForEdit = (date: Date): string => {
    return date.toISOString();
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      throw new Error("Harap lengkapi semua kolom yang wajib diisi.");
    }

    setIsSubmitting(true);

    const date = new Date(tenggat);

    if (isNaN(date.getTime())) {
      throw new Error("Format tanggal tidak valid");
    }

    const formattedTenggat = isEditMode
      ? formatDateForEdit(date)
      : formatDateForCreate(date);

    try {
      if (isEditMode) {
        if (!initialData?.id_penugasan) {
          throw new Error("ID Penugasan tidak ditemukan untuk mode edit");
        }

        const updateData = {
          judul,
          deskripsi,
          tenggat: formattedTenggat,
          file: fileLink,
          is_visible: String(is_visible),
        };

        await tugasService.updateTugas(initialData.id_penugasan, updateData);
      } else {
        const formData = new FormData();
        formData.append("judul", judul);
        formData.append("deskripsi", deskripsi);
        formData.append("tenggat", formattedTenggat);
        formData.append("file", fileLink);
        formData.append("target", target);
        formData.append("is_visible", String(is_visible));

        if (isTanggalCustom) {
          const mulai = new Date(tanggalMulai);
          if (isNaN(mulai.getTime())) {
            throw new Error("Format tanggal mulai tidak valid");
          }
          formData.append("tanggal_mulai", formatDateForCreate(mulai));
          await tugasService.createTugas("", formData);
        } else {
          formData.append("tanggal_mulai", "");
          await tugasService.createTugas(idRangkaian, formData);
        }
      }
      onSuccess();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Gagal menyimpan Tugas. Silakan coba lagi.";
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    is_visible,
    setIs_visible,
    judul,
    setJudul,
    deskripsi,
    setDeskripsi,
    tenggat,
    setTenggat,
    fileLink,
    setFileLink,
    idRangkaian,
    setIdRangkaian,
    tanggalMulai,
    setTanggalMulai,
    isTanggalCustom,
    isSubmitting,
    isFormValid,
    isEditMode,
    handleSubmit,
    target,
    setTarget,
  };
};
