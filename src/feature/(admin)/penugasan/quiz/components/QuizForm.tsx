"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Button } from "@/shared/components/ui/Button";
import { Loader2 } from "lucide-react";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { CalendarPicker } from "@/shared/components/ui/CalendarPicker";

// Tipe untuk Select options
interface RangkaianOption {
  value: string;
  label: string;
}

// Props yang dibutuhkan oleh form
interface QuizFormProps {
  // State values
  kuisNama: string;
  kuisDeskripsi: string;
  tenggat: string;
  durasiKuis: string;
  kesempatan: number;
  idRangkaian: string;

  // State setters
  setKuisNama: (value: string) => void;
  setKuisDeskripsi: (value: string) => void;
  setTenggat: (value: string) => void;
  setDurasiKuis: (value: string) => void;
  setKesempatan: (value: number) => void;
  setIdRangkaian: (value: string) => void;

  // Form handling
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  isFormValid: boolean;

  // Data untuk select
  rangkaianOptions: RangkaianOption[];
  isLoadingRangkaian: boolean;
}

export const QuizForm: React.FC<QuizFormProps> = ({
  kuisNama,
  setKuisNama,
  kuisDeskripsi,
  setKuisDeskripsi,
  tenggat,
  setTenggat,
  durasiKuis,
  setDurasiKuis,
  kesempatan,
  setKesempatan,
  idRangkaian,
  setIdRangkaian,
  onSubmit,
  isSubmitting,
  isFormValid,
  rangkaianOptions,
  isLoadingRangkaian,
}) => {
  const labelClasses = "mb-1 block text-sm font-medium text-gray-800";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="rangkaian" className={labelClasses}>
            Rangkaian Acara <span className="text-red-500">*</span>
          </label>
          <Select
            onValueChange={setIdRangkaian}
            value={idRangkaian}
            disabled={isLoadingRangkaian || isSubmitting}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoadingRangkaian ? "Memuat..." : "-- Pilih Rangkaian --"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {rangkaianOptions?.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label htmlFor="kuisNama" className={labelClasses}>
            Nama Kuis <span className="text-red-500">*</span>
          </label>
          <Input
            id="kuisNama"
            value={kuisNama}
            onChange={(e) => setKuisNama(e.target.value)}
            placeholder="Contoh: Kuis Pengetahuan Umum PK2MABA"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="kuisDeskripsi" className={labelClasses}>
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="kuisDeskripsi"
            value={kuisDeskripsi}
            onChange={(e) => setKuisDeskripsi(e.target.value)}
            placeholder="Jelaskan detail dan ketentuan kuis..."
            rows={3}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="tenggat" className={labelClasses}>
              Tenggat <span className="text-red-500">*</span>
            </label>
            <CalendarPicker
              value={tenggat}
              onChange={(e) => setTenggat(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="durasi" className={labelClasses}>
              Durasi (menit) <span className="text-red-500">*</span>
            </label>
            <Input
              id="durasi"
              type="number"
              value={durasiKuis}
              onChange={(e) => setDurasiKuis(e.target.value)}
              placeholder="Contoh: 60"
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="kesempatan" className={labelClasses}>
              Kesempatan <span className="text-red-500">*</span>
            </label>
            <Input
              id="kesempatan"
              type="number"
              value={kesempatan}
              onChange={(e) => setKesempatan(Number(e.target.value))}
              placeholder="Contoh: 3"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="w-full pt-4">
          <Button
            type="submit"
            variant="admin"
            disabled={isSubmitting || !isFormValid}
            className="w-full"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Menyimpan..." : "Simpan Kuis"}
          </Button>
        </div>
      </form>
    </div>
  );
};
