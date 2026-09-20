"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { useStf } from "../hooks/useStf";
import { useDeleteStf } from "../hooks/useDeleteStf";
import { StfSummary } from "../type";
import { columns } from "../type/caketangColumns";
import { DataTable } from "@/shared/components/table/DataTable";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import Link from "next/link";
import { ChevronLeft, Search, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Input } from "@/shared/components/ui/Input";

const StfContainer = () => {
  const router = useRouter();
  const { data, isLoading, error, refresh } = useStf();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultMessage, setResultMessage] = useState({
    title: "",
    desc: "",
    type: "success",
  });
  const [candidateToDelete, setCandidateToDelete] = useState<StfSummary | null>(
    null,
  );

  const handleDeleteSuccess = () => {
    refresh();
    setIsDeleteModalOpen(false);
    setResultMessage({
      title: "Berhasil",
      desc: "Caketang berhasil dihapus.",
      type: "success",
    });
    setIsResultModalOpen(true);
  };

  const handleDeleteError = (msg: string) => {
    setIsDeleteModalOpen(false);
    setResultMessage({ title: "Gagal", desc: msg, type: "error" });
    setIsResultModalOpen(true);
  };

  const { deleteCaketang, isDeleting } = useDeleteStf(
    handleDeleteSuccess,
    handleDeleteError,
  );

  const handleEdit = (caketang: StfSummary) => {
    router.push(`/admin/stf/edit/${caketang.id_caketang}`);
  };

  const handleDeleteClick = (caketang: StfSummary) => {
    setCandidateToDelete(caketang);
    setIsDeleteModalOpen(true);
  };

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "jumlah_vote",
      desc: true,
    },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [prodiFilter, setProdiFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      prodiFilter ? item.prodi === prodiFilter : true,
    );
  }, [data, prodiFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      handleEdit: (data) => handleEdit(data as StfSummary),
      handleDelete: (data) => handleDeleteClick(data as StfSummary),
    },
  });

  return (
    <div className="p-8 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-7">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1/2 text-primary-normal hover:text-primary-normal-hover transition-colors w-fit"
        >
          <ChevronLeft size={24} />
          <span className="text-xl">Kembali</span>
        </Link>
        <h1 className="text-4xl font-semibold text-default-dark">
          Shaping The Future
        </h1>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="flex items-center gap-6">
          <Select
            value={prodiFilter}
            onValueChange={(value) => {
              setProdiFilter(value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Prodi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Prodi</SelectItem>
              <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
              <SelectItem value="Teknologi Informasi">
                Teknologi Informasi
              </SelectItem>
              <SelectItem value="Pendidikan Teknologi Informasi">
                Pendidikan Teknologi Informasi
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full max-w-lg">
            <Input
              className="pl-10"
              placeholder="Cari Nama Mahasiswa Baru"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-700" />
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/admin/stf/kendali">
            <Button variant="admin-outline">Papan Kendali Pemilihan</Button>
          </Link>
          <Link href="/admin/stf/create">
            <Button variant="admin">Tambah Calon</Button>
          </Link>
        </div>
      </div>

      <DataTable<StfSummary>
        table={table}
        isLoading={isLoading}
        error={error}
        refresh={refresh}
        title="Daftar Calon Ketua Angkatan"
        hideSearchInput={true}
        hideMeta={true}
        hidePagination={true}
      />

      {/* Modal Konfirmasi Hapus */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Hapus Calon"
      >
        <div className="mt-4 flex flex-col gap-4">
          <p className="text-sm text-neutral-600">
            Apakah Anda yakin ingin menghapus calon &quot;
            <b>{candidateToDelete?.nama}</b>&quot;?
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="admin-outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="admin"
              className="bg-red-600 hover:bg-red-700 text-white border-none"
              onClick={() => {
                if (candidateToDelete) {
                  deleteCaketang(candidateToDelete.id_caketang);
                }
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Hasil Hapus */}
      <Modal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
      >
        <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-8 gap-8">
          {resultMessage.type === "success" ? (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Check
                className="w-12 h-12 md:w-16 md:h-16 text-green-600"
                strokeWidth={3}
              />
            </div>
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <X
                className="w-12 h-12 md:w-16 md:h-16 text-red-600"
                strokeWidth={3}
              />
            </div>
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
              onClick={() => setIsResultModalOpen(false)}
            >
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StfContainer;
