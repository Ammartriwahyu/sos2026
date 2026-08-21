"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import PresensiCard from "../components/PresensiCard";
import { Modal } from "@/shared/components/ui/Modal";
import { useGetAllPresensi } from "../hooks/useGetAllPresensi";
import PresensiForm from "../components/PresensiForm";
import { useRole } from "@/shared/hooks/useRole";
const PresensiContainer = () => {
  const router = useRouter();
  const { data: allPresensi, isLoading, error, refresh } = useGetAllPresensi();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { isSqc } = useRole();

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    refresh();
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full flex justify-center items-center">
          <p className="text-default-dark text-xl">Wait yh loading...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
    }

    return (
      <div className="flex flex-col gap-y-5">
        {allPresensi && allPresensi.length > 0 ? (
          allPresensi.map((presensi) => (
            <PresensiCard key={presensi.kode_id} presensi={presensi} />
          ))
        ) : (
          <p className="text-center text-gray-500">Tidak ada data presensi</p>
        )}
      </div>
    );
  };

  return (
    <main className="bg-white p-10 lg:p-20 min-h-screen h-fit rounded-xl shadow-lg">
      <button
        type="button"
        className="flex items-center gap-2 text-primary-normal hover:text-primary-normal-hover transition-colors mb-6"
        onClick={() => router.back()}
      >
        <ChevronLeft /> Kembali
      </button>

      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <h4 className="text-4xl font-semibold text-primary-normal">
          Kode Presensi
        </h4>
        {isSqc && (
          <Button
            variant="admin"
            className="mt-4 md:mt-0"
            onClick={handleModal}
          >
            Tambah Presensi
          </Button>
        )}
      </div>

      {renderContent()}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModal}
        title="Tambah Kode Presensi"
        desc="Isi form di bawah ini untuk menambahkan kode presensi baru"
      >
        <PresensiForm onSuccess={handleCreateSuccess} />
      </Modal>
    </main>
  );
};

export default PresensiContainer;
