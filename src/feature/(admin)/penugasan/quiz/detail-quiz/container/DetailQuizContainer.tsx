"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useGetDetailQuiz } from "../hooks/useGetDetailQuiz";
import { useGetQuizSubmissions } from "../hooks/useGetQuizSubmission";
import { useEditQuizForm } from "../hooks/useEditQuizForm";
import DetailQuiz from "../components/DetailQuiz";
import QuizSubmissionTable from "../components/SubmissionTable";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type SortingState,
  type PaginationState,
} from "@tanstack/react-table";
import { quizStatusColumns } from "../type/quizStatusColumn";
import { useSelectOptions } from "@/shared/hooks/useSelectOptions";
import { useUpdateKuis } from "../hooks/useEditQuiz";
import EditQuizForm from "../components/EditQuiz";
import { useToast } from "@/shared/hooks/useToast";
import { ConfirmDeleteModal } from "../components/DeleteConfirmation";
import { useDeleteQuiz } from "../hooks/useDeleteQuiz";
import Link from "next/link";
import { useRole } from "@/shared/hooks/useRole";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface DetailQuizContainerProps {
  id_quiz: string;
}

const DetailQuizContainer: React.FC<DetailQuizContainerProps> = ({
  id_quiz,
}) => {
  const { showToast } = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isSqc } = useRole();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedKelompok, setSelectedKelompok] = useState<string | null>(null);
  const [selectedDistrik, setSelectedDistrik] = useState<string | null>(null);
  const { options: kelompokOptions } = useSelectOptions("kelompok");
  const { options: distrikOptions } = useSelectOptions("distrik");
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const debouncedKelompok = useDebounce(selectedKelompok, 1000);
  const debouncedDistrik = useDebounce(selectedDistrik, 1000);

  const {
    data: detailQuiz,
    isLoading: detailQuizLoading,
    refresh: refreshDetailQuiz,
  } = useGetDetailQuiz(id_quiz);
  const {
    data: quizSubmissions,
    isLoading: isSubmissionLoading,
    error: submissionError,
    refresh: refreshSubmission,
  } = useGetQuizSubmissions(id_quiz, debouncedKelompok, debouncedDistrik);
  const { options: rangkaianOptions, isLoading: isLoadingRangkaian } =
    useSelectOptions("rangkaian");
  const { deleteQuiz, isLoading: isDeleting } = useDeleteQuiz({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      showToast({
        title: "Berhasil",
        message: "Kuis telah dihapus.",
        type: "success",
      });
      window.location.href = "/admin/penugasan";
    },
    onError: (error) => {
      showToast({ title: "Gagal", message: error, type: "error" });
    },
  });
  const { updateQuiz, isLoading: isSubmitting } = useUpdateKuis({
    onSuccess: () => {
      showToast({
        message: "Kuis berhasil diupdate",
        title: "Berhasil",
        type: "success",
      });
      refreshDetailQuiz();
    },
    onError: (error) => {
      showToast({
        message: error,
        title: "Gagal",
        type: "error",
      });
    },
  });
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedKelompok, debouncedDistrik]);
  // -----
  const formState = useEditQuizForm(detailQuiz);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (detailQuiz && formState) {
      const payloadToSend = formState.getSubmitPayload();

      await updateQuiz(detailQuiz.id_kuis, payloadToSend);
    }
  };

  const table = useReactTable({
    data: quizSubmissions ?? [],
    columns: quizStatusColumns,
    state: { sorting, globalFilter, pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  if (detailQuizLoading || isLoadingRangkaian) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin mr-2" /> Memuat Data...
      </div>
    );
  }

  if (!detailQuiz) {
    return <div>Kuis tidak ditemukan.</div>;
  }

  return (
    <section>
      <Link
        href="/admin/penugasan"
        className="flex items-center mb-6 gap-1/2 text-primary-normal hover:text-primary-normal-hover transition-colors w-fit"
      >
        <ChevronLeft size={24} />
        <span className="text-xl">Kembali</span>
      </Link>
      {isEditing ? (
        <EditQuizForm
          onBack={() => setIsEditing(false)}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
          rangkaianOptions={rangkaianOptions}
          isLoadingRangkaian={isLoadingRangkaian}
          {...formState}
        />
      ) : (
        <>
          <DetailQuiz
            isSQC={isSqc}
            quiz={detailQuiz}
            onDelete={() => setIsDeleteModalOpen(true)}
            onEdit={() => setIsEditing(true)}
          />

          <QuizSubmissionTable
            table={table}
            isSubmissionLoading={isSubmissionLoading}
            statusError={submissionError}
            refresh={refreshSubmission}
            kelompokOptions={kelompokOptions}
            selectedKelompok={selectedKelompok}
            onKelompokChange={setSelectedKelompok}
            distrikOptions={distrikOptions}
            selectedDistrik={selectedDistrik}
            onDistrikChange={setSelectedDistrik}
          />
        </>
      )}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => deleteQuiz(id_quiz)}
        isLoading={isDeleting}
      />
    </section>
  );
};

export default DetailQuizContainer;
