"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Textarea } from "@/shared/components/ui/Textarea";
import { Button } from "@/shared/components/ui/Button";
import { FileInput } from "@/shared/components/ui/FileInput";
import { Modal } from "@/shared/components/ui/Modal";
import { EyeIcon } from "lucide-react";

interface StfFormProps {
  mode: "create" | "edit";
  nama: string;
  setNama: (value: string) => void;
  prodi: string;
  setProdi: (value: string) => void;
  visi: string;
  setVisi: (value: string) => void;
  misi: string;
  setMisi: (value: string) => void;
  setFoto: (file: File | null) => void;
  isLoading: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  fotoUrl?: string | null;
}

const StfForm = ({
  mode,
  nama,
  setNama,
  prodi,
  setProdi,
  visi,
  setVisi,
  misi,
  setMisi,
  setFoto,
  isLoading,
  handleSubmit,
  fotoUrl,
}: StfFormProps) => {
  const buttonText = mode === "create" ? "Tambah" : "Simpan";
  const loadingText = mode === "create" ? "Menambahkan..." : "Menyimpan...";
  const [preview, setPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleFileChange = (file: File | null) => {
    setFoto(file);
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const hasPhoto = preview || (mode === "edit" && fotoUrl);
  const photoToShow = preview || fotoUrl;

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Input
          id="nama"
          label="Nama Lengkap Caketang"
          placeholder="Masukkan nama lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="prodi"
              className="block text-lg font-semibold text-admin-500 mb-2"
            >
              Prodi
            </label>
            <Select value={prodi} onValueChange={setProdi}>
              <SelectTrigger id="prodi">
                <SelectValue placeholder="Pilih prodi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SI">Sistem Informasi</SelectItem>
                <SelectItem value="TI">Teknologi Informasi</SelectItem>
                <SelectItem value="PTI">
                  Pendidikan Teknologi Informasi
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="foto"
              className="block text-lg font-semibold text-admin-500 mb-2"
            >
              Foto Diri Calon Ketua Angkatan
            </label>

            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <FileInput
                  id="foto"
                  onChange={handleFileChange}
                  required={mode === "create"}
                  placeholder={hasPhoto ? "Ganti Foto" : "Pilih Foto"}
                />
              </div>

              {hasPhoto && (
                <Button
                  type="button"
                  size={"icon"}
                  variant="outline"
                  onClick={() => setIsModalOpen(true)}
                  className="whitespace-nowrap"
                >
                  <EyeIcon />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="visi"
            className="block text-lg font-semibold text-admin-500 mb-2"
          >
            Visi
          </label>
          <Textarea
            id="visi"
            placeholder="Masukkan visi"
            value={visi}
            onChange={(e) => setVisi(e.target.value)}
            required
            className="h-[280px]"
          />
        </div>

        <div>
          <label
            htmlFor="misi"
            className="block text-lg font-semibold text-admin-500 mb-2"
          >
            Misi
          </label>
          <Textarea
            id="misi"
            placeholder="Masukkan misi"
            value={misi}
            onChange={(e) => setMisi(e.target.value)}
            required
            className="h-[280px]"
          />
        </div>

        <div className="flex mt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? loadingText : buttonText}
          </Button>
        </div>
      </form>

      {hasPhoto && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={preview ? "Preview Foto Baru" : "Foto Saat Ini"}
          containerClassName="max-w-sm"
        >
          <div className="mt-4 flex justify-center">
            <div className="w-60  overflow-hidden rounded-xl border-2 border-gray-200 shadow-lg">
              <img
                src={photoToShow!}
                alt={preview ? "Preview foto baru" : "Foto saat ini"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default StfForm;
