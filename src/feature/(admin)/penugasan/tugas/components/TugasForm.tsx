import { TugasSummary } from "@/api/services/admin/tugas";
import { useSelectOptions } from "@/shared/hooks/useSelectOptions";
import { useToast } from "@/shared/hooks/useToast";
import React from "react";
import { RANGKAIAN_TANGGAL_CUSTOM, useTugasForm } from "../hooks/useTugasForm";
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
import { CalendarPicker } from "@/shared/components/ui/CalendarPicker";
import { Textarea } from "@/shared/components/ui/Textarea";

interface TugasFormProps {
  initialData?: TugasSummary;
  onSuccess: () => void;
}

export const TugasForm: React.FC<TugasFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const { showToast } = useToast();
  const { options: rangkaian, isLoading: isLoadingRangkaian } =
    useSelectOptions("rangkaian");

  const handleSuccess = () => {
    showToast({
      type: "success",
      title: "Berhasil!",
      message: isEditMode
        ? "Tugas berhasil diperbarui"
        : "Tugas Baru berhasil dibuat",
    });
    onSuccess();
  };

  const {
    target,
    setTarget,
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
    handleSubmit: performSubmit,
  } = useTugasForm({
    initialData,
    onSuccess: handleSuccess,
  });

  const handleRangkaianChange = (value: string) => {
    setIdRangkaian(value);
    if (value !== RANGKAIAN_TANGGAL_CUSTOM) {
      setTanggalMulai("");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = isEditMode
      ? [judul, deskripsi, tenggat, fileLink]
      : [
          judul,
          deskripsi,
          tenggat,
          fileLink,
          idRangkaian,
          ...(isTanggalCustom ? [tanggalMulai] : []),
        ];

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

  const labelClasses = "mb-1 block text-sm font-medium text-gray-800";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {!isEditMode && (
          <div className="space-y-1">
            <label htmlFor="rangkaian" className={labelClasses}>
              Rangkaian Acara <span className="text-red-500">*</span>
            </label>
            <Select onValueChange={handleRangkaianChange} value={idRangkaian}>
              <SelectTrigger disabled={isLoadingRangkaian || isSubmitting}>
                <SelectValue
                  placeholder={
                    isLoadingRangkaian ? "Memuat..." : "-- Pilih Rangkaian --"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {rangkaian.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
                <SelectItem value={RANGKAIAN_TANGGAL_CUSTOM}>
                  Tanggal Custom
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {!isEditMode && isTanggalCustom && (
          <div className="space-y-1">
            <label htmlFor="tanggal-mulai" className={labelClasses}>
              Tanggal Mulai <span className="text-red-500">*</span>
            </label>
            <CalendarPicker
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        )}
        <div className="space-y-1">
          <label htmlFor="judul" className={labelClasses}>
            Judul Tugas <span className="text-red-500">*</span>
          </label>
          <Input
            id="judul"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Contoh: Unggah Twibbon Synergy On Frame"
            disabled={isSubmitting}
            required
            className="text-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="deskripsi" className={labelClasses}>
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Jelaskan detail dan ketentuan Tugas..."
            rows={3}
            disabled={isSubmitting}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label htmlFor="file" className={labelClasses}>
              Link File <span className="text-red-500">*</span>
            </label>
            <Input
              id="file"
              type="url"
              value={fileLink}
              onChange={(e) => setFileLink(e.target.value)}
              placeholder="https://contoh.com/file"
              disabled={isSubmitting}
              required
              className="text-sm py-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="target" className={labelClasses}>
              Target Peserta <span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={setTarget}
              value={target}
              disabled={isSubmitting || isEditMode}
            >
              <SelectTrigger id="target" className="col-span-1">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maba">Mahasiswa Baru</SelectItem>
                <SelectItem value="pemutihan">Pemutihan</SelectItem>
                <SelectItem value="izin">Izin</SelectItem>
                <SelectItem value="semua">Semua</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label htmlFor="visibility" className={labelClasses}>
              Visibilitas <span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) => setIs_visible(value === "true")}
              value={is_visible.toString()}
              disabled={isSubmitting}
            >
              <SelectTrigger id="visibility" className="col-span-1">
                <SelectValue placeholder="Tampilkan Penugasan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Tampilkan</SelectItem>
                <SelectItem value="false">Sembunyikan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full mt-10">
          <Button
            type="submit"
            variant="admin"
            disabled={isSubmitting || !isFormValid}
            className="w-full"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting
              ? "Menyimpan..."
              : isEditMode
                ? "Simpan Perubahan"
                : "Simpan Tugas"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TugasForm;
