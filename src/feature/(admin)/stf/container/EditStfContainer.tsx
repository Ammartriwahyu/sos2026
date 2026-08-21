"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import StfForm from "../components/StfForm";
import { useEditStf } from "../hooks/useEditStf";

const EditStfContainer = ({ id_caketang }: { id_caketang: string }) => {
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

  return (
    <div className="px-8 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-1/2">
          <Link
            href="/admin/stf"
            className="flex items-center gap-1/2 text-admin-500 hover:text-admin-600 transition-colors w-fit"
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
          <Loader2 className="h-10 w-10 animate-spin text-admin-500" />
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
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default EditStfContainer;
