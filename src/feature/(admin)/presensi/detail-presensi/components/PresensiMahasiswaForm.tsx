"use client";

import { PresensiMahasiswaSummary } from "@/api/services/admin/presensi";
import { Button } from "@/shared/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { useToast } from "@/shared/hooks/useToast";
import React from "react";
import { Loader2 } from "lucide-react";
import { usePresensiMahasiswaForm } from "../../hooks/usePresensiMahasiswaForm";

interface Option {
  value: string;
  label: string;
}

interface PresensiFormProps {
  presensi_id: string;
  initialData?: PresensiMahasiswaSummary;
  onSuccess: () => void;
}

const PresensiMahasiswaForm = ({
  initialData,
  onSuccess,
  presensi_id,
}: PresensiFormProps) => {
  const statusOptions: Option[] = [
    { value: "hadir", label: "Hadir" },
    { value: "tidak-hadir", label: "Tidak Hadir" },
    { value: "izin", label: "izin" },
  ];

  const { showToast } = useToast();

  const {
    setStatus,
    status,
    isSubmitting,
    isFormValid,
    handleSubmit: performSubmit,
  } = usePresensiMahasiswaForm({
    initialData,
    presensi_id,
    onSuccess: () => {
      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Presensi mahasiswa berhasil diubah",
      });
      onSuccess();
    },
  });

  const formatStatus = (
    inputStatus: string,
  ): "hadir" | "tidak-hadir" | "izin" => {
    const lowercasedStatus = inputStatus.toLowerCase();
    if (lowercasedStatus === "izin") {
      return "izin";
    } else if (lowercasedStatus === "hadir") {
      return "hadir";
    } else if (lowercasedStatus === "tidak hadir") {
      return "tidak-hadir";
    } else {
      return "tidak-hadir";
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [status];

    if (requiredFields.some((field) => !field)) {
      showToast({
        type: "error",
        title: "Error!",
        message: "Semua field wajib diisi",
        duration: 6000,
      });
      return;
    }

    try {
      await performSubmit();
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal!",
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
        duration: 6000,
      });
    }
  };

  const labelClasses = "text-lg text-admin-500 font-semibold";

  return (
    <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2">
        <p>{initialData?.nama}</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <label htmlFor="statusSelect" className={labelClasses}>
          Edit Status <span className="text-red-500">*</span>
        </label>
        <Select
          onValueChange={setStatus}
          value={formatStatus(status) ?? undefined}
          disabled={isSubmitting}
        >
          <SelectTrigger id="statusSelect" className="col-span-1">
            <SelectValue placeholder="Pilih Sesi" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="admin"
        type="submit"
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
};

export default PresensiMahasiswaForm;
