"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import StfForm from "../components/StfForm";
import { useCreateStf } from "../hooks/useCreateStf";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";

const CreateStfContainer = () => {
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
    isLoading,
    handleSubmit,
  } = useCreateStf();

  const handleSuccess = () => {
    setResultMessage({
      title: "Berhasil",
      desc: "Caketang berhasil dibuat!",
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
      router.refresh();
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
            Tambah Calon
          </h1>
          <p className="text-default-dark/50 text-lg">
            Isi form di bawah ini untuk tambah calon ketua angkatan
          </p>
        </div>
      </div>

      <StfForm
        mode="create"
        nama={nama}
        setNama={setNama}
        prodi={prodi}
        setProdi={setProdi}
        visi={visi}
        setVisi={setVisi}
        misi={misi}
        setMisi={setMisi}
        setFoto={setFoto}
        isLoading={isLoading}
        handleSubmit={(e) => handleSubmit(e, handleSuccess, handleError)}
      />

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

export default CreateStfContainer;
