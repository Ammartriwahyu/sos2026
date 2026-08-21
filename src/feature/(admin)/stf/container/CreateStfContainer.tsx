"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import StfForm from "../components/StfForm";
import { useCreateStf } from "../hooks/useCreateStf";

const CreateStfContainer = () => {
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
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateStfContainer;
