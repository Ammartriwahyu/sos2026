"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type SortingState,
  type PaginationState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import DetailTugas from "../components/DetailTugas";
import SubmissionTable from "../components/SubmissionTable";
import { Modal } from "@/shared/components/ui/Modal";
import TugasForm from "../../components/TugasForm";
import { useGetDetailTugasById } from "../hooks/useGetDetailTugasById";
import { useGetTugasSubmissions } from "../hooks/useGetTugasSubmissions";
import { useSelectOptions } from "@/shared/hooks/useSelectOptions";
import { TugasStatus, TugasSummary } from "@/api/services/admin/tugas";
import { tugasStatusColumns } from "../type/TugasStatusColumn";
import FormEditNilai from "../components/FormEditNilai";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRole } from "@/shared/hooks/useRole";

interface DetailTugasContainerProps {
  id_penugasan: string;
}

const DetailTugasContainer: React.FC<DetailTugasContainerProps> = ({
  id_penugasan,
}) => {
  const [selectedKelompok, setSelectedKelompok] = useState<string | null>(null);
  const [selectedDistrik, setSelectedDistrik] = useState<string | null>(null);
  const { options: kelompokOptions } = useSelectOptions("kelompok");
  const { options: distrikOptions } = useSelectOptions("distrik");

  const [editingTugas, setEditingTugas] = useState<TugasSummary | null>(null);
  const handleTugasEditSuccess = () => {
    setEditingTugas(null);
    refreshDetailTugas();
  };

  const [editingSubmission, setEditingSubmission] =
    useState<TugasStatus | null>(null);
  const handleSubmissionEditSuccess = () => {
    setEditingSubmission(null);
    refreshSubmission();
  };

  const {
    data: detailTugas,
    error: statusError,
    refresh: refreshDetailTugas,
  } = useGetDetailTugasById(id_penugasan);

  const {
    data: tugasSubmissions,
    isLoading: isSubmissionLoading,
    refresh: refreshSubmission,
  } = useGetTugasSubmissions(id_penugasan, selectedKelompok, selectedDistrik);

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const tableData = tugasSubmissions ?? [];

  const table = useReactTable({
    data: tableData,
    columns: tugasStatusColumns,
    state: { sorting, pagination, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      openEditModal: (submission: TugasStatus) =>
        setEditingSubmission(submission),
    },
  });
  const { isSqc } = useRole();
  return (
    <section>
      <Link
        href="/admin/penugasan"
        className="flex items-center mb-6 gap-1/2 text-primary-normal hover:text-primary-normal-hover transition-colors w-fit"
      >
        <ChevronLeft size={24} />
        <span className="text-xl">Kembali</span>
      </Link>

      <DetailTugas
        isSQC={isSqc}
        tugas={detailTugas}
        onEdit={() => setEditingTugas(detailTugas)}
      />

      <SubmissionTable
        table={table}
        isSubmissionLoading={isSubmissionLoading}
        statusError={statusError}
        refresh={refreshSubmission}
        kelompokOptions={kelompokOptions}
        selectedKelompok={selectedKelompok}
        onKelompokChange={setSelectedKelompok}
        distrikOptions={distrikOptions}
        selectedDistrik={selectedDistrik}
        onDistrikChange={setSelectedDistrik}
      />

      {editingTugas && (
        <Modal
          isOpen={!!editingTugas}
          onClose={() => setEditingTugas(null)}
          title="Edit Detail Tugas"
        >
          <TugasForm
            initialData={editingTugas}
            onSuccess={handleTugasEditSuccess}
          />
        </Modal>
      )}

      {editingSubmission && (
        <Modal
          isOpen={!!editingSubmission}
          onClose={() => setEditingSubmission(null)}
          title="Edit Status Pengumpulan"
          desc="Ubah nilai atau status pengumpulan tugas mahasiswa."
        >
          <FormEditNilai
            submissionData={editingSubmission}
            onSuccess={handleSubmissionEditSuccess}
          />
        </Modal>
      )}
    </section>
  );
};

export default DetailTugasContainer;
