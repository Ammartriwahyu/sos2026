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
import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";
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

  const handleDeleteSuccess = () => {
    refresh();
  };

  const { deleteCaketang } = useDeleteStf(handleDeleteSuccess);

  const handleEdit = (caketang: StfSummary) => {
    router.push(`/admin/stf/edit/${caketang.id_caketang}`);
  };

  const handleDelete = (caketang: StfSummary) => {
    deleteCaketang(caketang.id_caketang, caketang.nama);
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
      handleDelete: (data) => handleDelete(data as StfSummary),
    },
  });

  return (
    <div className="p-8 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-7">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-1/2 text-admin-500 hover:text-admin-600 transition-colors w-fit"
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

        <div className="flex">
          <Link href="/admin/stf/create">
            <Button>Tambah Calon</Button>
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
    </div>
  );
};

export default StfContainer;
