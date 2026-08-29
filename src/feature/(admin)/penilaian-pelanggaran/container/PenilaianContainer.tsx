"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { usePenilaianPage } from "../hooks/usePenilaianPage";
import { PenilaianHeader } from "../components/PenilaianHeader";
import { PenilaianTable } from "../components/PenilaianTable";
import { EditPenilaianModal } from "../components/EditPenilaianModal";

const PenilaianContainer = () => {
  const {
    rangkaian,
    distrik,
    kelompok,
    selectedRangkaian,
    setSelectedRangkaian,
    selectedDistrik,
    setSelectedDistrik,
    selectedKelompok,
    setSelectedKelompok,
    table,
    isLoading,
    isEditButtonDisabled,
    isModalOpen,
    selectedNim,
    handleEditClick,
    handleCloseModal,
    refetchData,
    globalFilter, // Use from hook
    setGlobalFilter, // Use from hook
  } = usePenilaianPage();

  const handleSuccess = () => {
    refetchData();
    handleCloseModal();
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-7 mb-6">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1 text-primary-normal hover:text-primary-normal-hover transition-colors w-fit"
        >
          <ChevronLeft size={24} />
          <span className="text-xl font-medium">Kembali</span>
        </Link>
        <h1 className="text-4xl font-semibold text-default-dark">
          Rekap Penilaian & Pelanggaran
        </h1>
      </div>

      <PenilaianHeader
        rangkaianOptions={rangkaian.data}
        distrikOptions={distrik.data}
        kelompokOptions={kelompok}
        selectedRangkaian={selectedRangkaian}
        onRangkaianChange={setSelectedRangkaian}
        selectedDistrik={selectedDistrik}
        onDistrikChange={setSelectedDistrik}
        selectedKelompok={selectedKelompok}
        onKelompokChange={setSelectedKelompok}
        isEditButtonDisabled={isEditButtonDisabled}
        onEditClick={handleEditClick}
        isRangkaianLoading={rangkaian.isLoading}
        isDistrikLoading={distrik.isLoading}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />

      <div className="mt-8">
        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary-normal" />
          </div>
        ) : (
          <PenilaianTable
            globalFilter={globalFilter}
            table={table}
            refresh={() => {}}
          />
        )}
      </div>
      <EditPenilaianModal
        isOpen={isModalOpen}
        onSuccess={handleSuccess}
        onClose={handleCloseModal}
        nim={selectedNim}
        rangkaianId={selectedRangkaian}
      />
    </div>
  );
};

export default PenilaianContainer;
