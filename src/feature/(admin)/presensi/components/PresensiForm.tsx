"use client";

import { PresensiSummary } from "@/api/services/admin/presensi";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { useSelectOptions } from "@/shared/hooks/useSelectOptions";
import { useToast } from "@/shared/hooks/useToast";
import React from "react";
import { usePresensiForm } from "../hooks/usePresensiForm";
import { Loader2 } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface PresensiFormProps {
  initialData?: PresensiSummary;
  onSuccess: () => void;
}

const PresensiForm = ({ initialData, onSuccess }: PresensiFormProps) => {
  const { options: rangkaianOptions, isLoading: isLoadingRangkaian } =
    useSelectOptions("rangkaian");

  const sesiOptions: Option[] = [
    { value: "1", label: "Sesi 1" },
    { value: "2", label: "Sesi 2" },
    { value: "3", label: "Sesi 3" },
    { value: "4", label: "Sesi 4" },
    { value: "5", label: "Sesi 5" },
  ];

  const { showToast } = useToast();

  const {
    kode,
    setKode,
    rangkaianId,
    setRangkaianId,
    sesi,
    setSesi,
    status,
    setStatus,
    isSubmitting,
    isFormValid,
    isEditMode,
    handleSubmit: performSubmit,
  } = usePresensiForm({
    initialData,
    onSuccess: () => {
      showToast({
        type: "success",
        title: "Berhasil!",
        message: isEditMode
          ? "Presensi berhasil diperbarui"
          : "Presensi Baru berhasil dibuat",
      });
      onSuccess();
    },
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [kode, rangkaianId, sesi, status];

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

  const labelClasses = "text-lg text-[#2A1F5C] font-semibold";

  return (
    <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="kodeAbsensi" className={labelClasses}>
          Tambah Kode Absensi <span className="text-red-500">*</span>
        </label>
        <Input
          id="kodeAbsensi"
          type="text"
          placeholder="contoh. SELAMATDATANGMABA"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="sesiSelect" className={labelClasses}>
            Sesi <span className="text-red-500">*</span>
          </label>
          <Select
            onValueChange={setSesi}
            value={sesi ?? undefined}
            disabled={isSubmitting}
          >
            <SelectTrigger id="sesiSelect" className="col-span-1">
              <SelectValue placeholder="Pilih Sesi" />
            </SelectTrigger>
            <SelectContent>
              {sesiOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="rangkaianSelect" className={labelClasses}>
            Rangkaian <span className="text-red-500">*</span>
          </label>
          {rangkaianOptions && (
            <Select
              onValueChange={setRangkaianId}
              value={rangkaianId}
              disabled={isSubmitting || isLoadingRangkaian}
            >
              <SelectTrigger id="rangkaianSelect" className="col-span-1">
                <SelectValue
                  placeholder={
                    isLoadingRangkaian ? "Memuat..." : "Pilih Rangkaian"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {rangkaianOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-x-2 items-center text-default-dark-50">
          <input
            id="active"
            type="checkbox"
            checked={status === "aktif"}
            onChange={(e) =>
              setStatus(e.target.checked ? "aktif" : "non-aktif")
            }
            disabled={isSubmitting}
            className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500"
          />
          <label htmlFor="active">Aktifkan Kode Ini</label>
        </div>
      </div>

      <Button
        variant="admin"
        type="submit"
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting
          ? "Menyimpan..."
          : isEditMode
            ? "Simpan Perubahan"
            : "Simpan Presensi"}
      </Button>
    </form>
  );
};

export default PresensiForm;
