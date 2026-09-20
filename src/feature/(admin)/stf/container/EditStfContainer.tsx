"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader2, CheckCircle, XCircle } from "lucide-react";
import StfForm from "../components/StfForm";
import { useEditStf } from "../hooks/useEditStf";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";

const EditStfContainer = ({ id_caketang }: { id_caketang: string }) => {
  const router = useRouter();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    title: "",
    desc: "",
    type: "success",
  });
  const {
    nama,
    setNama,
    prodi,
    setProdi,
    visi,
    setVisi,
    misi,
    setMisi,
    setFoto,
    initialDataLoading,
    isSubmitting,
    handleSubmit,
    fotoUrl,
  } = useEditStf(id_caketang);

  const handleSuccess = () => {
    setResultMessage({
      title: "Berhasil",
      desc: "Data berhasil diperbarui!",
      type: "success",
    });
    setIsResultModalOpen(true);
  };

  const handleError = (msg: string) => {
    setResultMessage({ title: "Gagal", desc: msg, type: "error" });
    setIsResultModalOpen(true);
  };

  const handleModalClose = () => {
    setIsResultModalOpen(false);
    if (resultMessage.type === "success") {
      router.push("/admin/stf");
    }
  };

  return (
    <div className="px-8 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-1/2">
          <Link
            href="/admin/stf"
            className="flex items-center gap-1/2 text-primary-normal hover:text-primary-normal-hover transition-colors w-fit"
          >
            <ChevronLeft size={24} />
            <span className="text-xl">Kembali</span>
          </Link>
        </div>
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-semibold text-default-dark">
            Edit Calon Ketua Angkatan
          </h1>
          <p className="text-default-dark/50 text-lg">
            Isi form di bawah ini untuk edit data calon ketua angkatan
          </p>
        </div>
      </div>

      {initialDataLoading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-10 w-10 animate-spin text-primary-normal" />
        </div>
      ) : (
        <StfForm
          fotoUrl={fotoUrl}
          mode="edit"
          nama={nama}
          setNama={setNama}
          prodi={prodi}
          setProdi={setProdi}
          visi={visi}
          setVisi={setVisi}
          misi={misi}
          setMisi={setMisi}
          setFoto={setFoto}
          isLoading={isSubmitting}
          handleSubmit={(e) => handleSubmit(e, handleSuccess, handleError)}
        />
      )}

      {/* Modal Hasil */}
      <Modal isOpen={isResultModalOpen} onClose={handleModalClose}>
        <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-8 gap-8">
          {resultMessage.type === "success" ? (
            <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-green-500 mx-auto" />
          ) : (
            <XCircle className="w-24 h-24 md:w-32 md:h-32 text-red-500 mx-auto" />
          )}
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col justify-center items-center gap-3">
              <h5 className="text-xl md:text-3xl font-bold text-center text-default-dark">
                {resultMessage.title}
              </h5>
              <p className="text-center text-sm text-gray-500">
                {resultMessage.desc}
              </p>
            </div>
            <Button
              variant="admin"
              className="px-8 md:px-14"
              onClick={handleModalClose}
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditStfContainer;
