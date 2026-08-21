"use client";

import React from "react";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Loader2, Info, X, Plus } from "lucide-react";
import { usePenilaianModal } from "../hooks/usePenilaianModal";
import { cn } from "@/shared/utils/cn";
import { useRole } from "@/shared/hooks/useRole";

interface EditPenilaianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  nim: string | null;
  rangkaianId: string;
  rangkaianName: string;
}

export const EditPenilaianModal = ({
  isOpen,
  onClose,
  onSuccess,
  nim,
  rangkaianId,
  rangkaianName,
}: EditPenilaianModalProps) => {
  const {
    isLoading,
    detailMaba,
    keaktifan,
    setKeaktifan,
    pelanggaranList,
    setPelanggaranList,
    handleSubmit,
  } = usePenilaianModal(nim, rangkaianId, isOpen);
  const { isSqc } = useRole();
  const handleAddPelanggaran = () => {
    setPelanggaranList((prev) => [
      ...prev,
      { id: `new-${Date.now()}`, nama: "", kategori: "" },
    ]);
  };

  const handleRemovePelanggaran = (id: string | number) => {
    setPelanggaranList((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePelanggaranChange = (
    id: string | number,
    field: "nama" | "kategori",
    value: string,
  ) => {
    setPelanggaranList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const renderNilaiSection = () => {
    if (!detailMaba?.penilaian) return null;

    const fields: React.ReactNode[] = detailMaba.penilaian.map(
      (tugas, index) => (
        <Input
          key={`tugas-${tugas.nama_penilaian}-${index}`}
          label={tugas.nama_penilaian}
          value={tugas.nilai}
          disabled
        />
      ),
    );

    if (
      rangkaianName.includes("Rangkaian 1") ||
      rangkaianName.includes("Rangkaian 2")
    ) {
      fields.unshift(
        <Input
          key="keaktifan"
          label="Keaktifan"
          type="number"
          value={keaktifan}
          onChange={(e) => setKeaktifan(Number(e.target.value))}
        />,
      );
    }

    return (
      <div className="mt-6">
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-4",
            fields.length === 0 && "hidden",
          )}
        >
          {fields}
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} containerClassName="max-w-4xl">
      {isLoading || !detailMaba ? (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-admin-500" />
        </div>
      ) : (
        <div className="flex flex-col h-full max-h-[80vh]">
          <div className="flex-shrink-0 px-4 pt-4 text-center">
            <h2 className="text-3xl font-bold text-default-dark">
              Penilaian {detailMaba.nama_mahasiswa}
            </h2>
            <p className="text-default-dark/50 text-lg mt-1">
              Isi form di bawah ini untuk memberikan penilaian mahasiswa
            </p>
          </div>
          <div className="flex-grow overflow-y-auto mt-6 px-4 pr-6">
            <div className="space-y-4">
              {pelanggaranList.map((p, index) => (
                <div
                  key={p.id || `pelanggaran-${index}`}
                  className="p-4 border rounded-lg border-default-dark/50 relative"
                >
                  {isSqc && (
                    <button
                      onClick={() => handleRemovePelanggaran(p.id)}
                      className="absolute top-2 right-2 text-default-dark hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  )}
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nama Pelanggaran"
                      placeholder="Masukkan nama pelanggaran"
                      value={p.nama}
                      onChange={(e) =>
                        handlePelanggaranChange(p.id, "nama", e.target.value)
                      }
                      disabled={!isSqc}
                    />
                    <div className="flex flex-col">
                      <label className="block text-lg font-semibold mb-2 text-admin-500">
                        Keterangan
                      </label>
                      <Select
                        value={p.kategori}
                        onValueChange={(value) =>
                          handlePelanggaranChange(p.id, "kategori", value)
                        }
                        disabled={!isSqc}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkat pelanggaran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ringan">Tingkat Rendah</SelectItem>
                          <SelectItem value="sedang">Tingkat Sedang</SelectItem>
                          <SelectItem value="berat">Tingkat Berat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              disabled={!isSqc}
              onClick={handleAddPelanggaran}
              className="mt-4 font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pelanggaran
            </Button>

            <div className="mt-6 flex items-center gap-4 p-4 bg-infoNotif text-blue-800 border border-borderNotif rounded-xl">
              <Info className="h-6 w-6 flex-shrink-0" />
              <p className="text-base text-default-dark">
                Input dan edit nilai tugas hanya dapat dilakukan di menu
                Penugasan.
              </p>
            </div>
            {renderNilaiSection()}
          </div>
          <div className="flex-shrink-0 mt-8 px-4 pb-4">
            <Button
              onClick={() => handleSubmit(onSuccess)}
              className="w-full"
              size="large"
            >
              Simpan Perubahan
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
