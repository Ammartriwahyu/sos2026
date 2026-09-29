import React from "react";
import { QuizSubmission } from "@/api/services/admin/quiz";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Loader2 } from "lucide-react";
import { useFormEditNilaiKuis } from "../hooks/useFormEditNilaiKuis";
import { useToast } from "@/shared/hooks/useToast";
import { AxiosError } from "axios";

interface FormEditNilaiKuisProps {
  submissionData: QuizSubmission;
  kuisId: string;
  totalSoal: number;
  onSuccess: () => void;
}

const FormEditNilaiKuis: React.FC<FormEditNilaiKuisProps> = ({
  submissionData,
  kuisId,
  totalSoal,
  onSuccess,
}) => {
  const { showToast } = useToast();

  const { jawabanBenar, setJawabanBenar, isSubmitting, performSubmit } =
    useFormEditNilaiKuis({
      submissionData,
      kuisId,
      totalSoal,
      onSuccess,
    });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (jawabanBenar.trim() === "") {
        throw new Error("Jumlah jawaban benar wajib diisi");
      }
      const angka = Number(jawabanBenar);
      if (Number.isNaN(angka) || angka < 0 || angka > totalSoal) {
        throw new Error(
          `Jawaban benar harus berada di antara 0 dan ${totalSoal}`,
        );
      }
      await performSubmit();
      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Nilai berhasil diperbarui.",
      });
    } catch (error) {
      let msg = error instanceof Error ? error.message : "Terjadi kesalahan";
      if (error instanceof AxiosError) {
        const backendMsg = (
          error.response?.data as { message?: string } | undefined
        )?.message;
        if (backendMsg) msg = backendMsg;
        const status = error.response?.status;
        if (status === 409)
          msg = backendMsg || "Mahasiswa sudah mengerjakan kuis ini lewat web!";
        if (status === 404) msg = backendMsg || "Data tidak ditemukan";
        if (status === 400)
          msg =
            backendMsg ||
            `Jumlah jawaban benar tidak boleh melebihi jumlah soal (${totalSoal})!`;
      }
      showToast({
        type: "error",
        title: "Gagal!",
        message: msg,
      });
    }
  };

  return (
    <form className="px-4 lg:px-20" onSubmit={handleFormSubmit}>
      <div className="space-y-2">
        <div className="space-x-6 flex">
          <p className="text-primary-normal-hover min-w-42">Nama Mahasiswa</p>
          <span>: {submissionData.nama}</span>
        </div>
        <div className="space-x-6 flex">
          <p className="text-primary-normal-hover min-w-42">NIM</p>
          <span>: {submissionData.nim}</span>
        </div>
        <div className="space-x-6 flex">
          <p className="text-primary-normal-hover min-w-42">Status</p>
          <span>: {submissionData.status}</span>
        </div>
        <div className="space-x-6 flex">
          <p className="text-primary-normal-hover min-w-42">Skor Saat Ini</p>
          <span>: {submissionData.score}</span>
        </div>
        <div className="space-x-6 flex">
          <p className="text-primary-normal-hover min-w-42">Total Soal</p>
          <span>: {totalSoal}</span>
        </div>
      </div>

      <div className="my-10">
        <label
          className="text-primary-normal font-semibold"
          htmlFor="jawaban_benar"
        >
          Jawaban Benar (0 - {totalSoal})
        </label>
        <Input
          className="mt-2"
          id="jawaban_benar"
          type="number"
          min={0}
          max={totalSoal}
          value={jawabanBenar}
          onChange={(e) => {
            const masukan = e.target.value;
            if (masukan === "") {
              setJawabanBenar("");
              return;
            }
            if (!/^\d+$/.test(masukan)) return;
            const angka = Number(masukan);
            if (angka > totalSoal) return;
            setJawabanBenar(masukan.replace(/^0+(?=\d)/, ""));
          }}
          disabled={isSubmitting}
          placeholder={`Masukkan 0 - ${totalSoal}`}
          style={
            {
              WebkitAppearance: "none",
              MozAppearance: "textfield",
            } as React.CSSProperties
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          Skor akan dihitung otomatis: (jawaban_benar / {totalSoal}) * 100
        </p>
      </div>

      <div className="flex justify-center">
        <Button
          size="large"
          variant="admin"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default FormEditNilaiKuis;
