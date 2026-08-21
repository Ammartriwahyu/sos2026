import React from "react";
import { TugasStatus } from "@/api/services/admin/tugas";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Link2, Loader2 } from "lucide-react";
import { useFormEditTugas } from "../hooks/useFormEditTugas";
import { useToast } from "@/shared/hooks/useToast";

interface FormEditTugasProps {
  submissionData: TugasStatus;
  onSuccess: () => void;
}

const FormEditNilai: React.FC<FormEditTugasProps> = ({
  submissionData,
  onSuccess,
}) => {
  const { showToast } = useToast();

  const { nilai, setNilai, isSubmitting, performSubmit } = useFormEditTugas({
    submissionData,
    onSuccess,
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (nilai < 0 || nilai > 100) {
        throw new Error("Nilai harus berada di antara 0 dan 100");
      }
      await performSubmit();
      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Nilai berhasil diperbarui.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal!",
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  };

  return (
    <form className="px-20" onSubmit={handleFormSubmit}>
      <div className=" space-y-2">
        <div className="space-x-6 flex">
          <p className="text-admin-600 min-w-42">Nama Mahasiswa</p>
          <span className="">: {submissionData.student_name}</span>
        </div>
        <div className="space-x-6 flex">
          <p className="text-admin-600 min-w-42">NIM</p>
          <span className="">: {submissionData.nim}</span>
        </div>
        <div className="space-x-6 flex">
          <p className="text-admin-600 min-w-42">Status Pengumpulan </p>
          <span className="">: {submissionData.status}</span>
        </div>
      </div>
      <div className="mt-10">
        {submissionData.drive_link ? (
          <Button
            type="button"
            variant={"outline"}
            size={"small"}
            className="font-semibold space-x-1"
            onClick={() => window.open(submissionData.drive_link, "_blank")}
          >
            <Link2 className="-rotate-30" size={24} />
            <span>Lihat tugas yang dikumpulkan</span>
          </Button>
        ) : (
          <p className="text-gray-500 italic">
            Belum ada tugas yang dikumpulkan
          </p>
        )}
      </div>
      <div className="my-10 ">
        <label className="text-admin-500 font-semibold" htmlFor="nilai">
          Nilai (0-100)
        </label>
        <Input
          className="mt-2"
          id="nilai"
          type="number"
          min={0}
          max={100}
          value={nilai ?? ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value <= 100) {
              setNilai(value);
            }
          }}
          disabled={isSubmitting}
          placeholder="Masukkan nilai 0-100"
          // Disable spinner arrows on number input
          style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
        />
      </div>
      <div className="flex justify-center">
        <Button size={"large"} type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default FormEditNilai;
