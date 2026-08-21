"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { useMahasiswa } from "../hooks/useMahasiswa";
import { MahasiswaDetail } from "@/api/services/admin/mahasiswa";
import { DataTable } from "@/shared/components/table/DataTable";
import { columns } from "../type/mahasiswaColumns";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const CariMahasiswaContainer = () => {
  const MahasiswaData = useMahasiswa();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: MahasiswaData.data ?? [],
    columns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <main>
      <div className="flex items-center gap-1/2 mb-4">
        <Link
          href="/admin/cari-mahasiswa"
          className="flex items-center gap-1/2 text-admin-500 hover:text-admin-600 transition-colors w-fit"
        >
          <ChevronLeft size={24} />
          <span className="text-xl">Kembali</span>
        </Link>
      </div>
      <h4 className="text-4xl md:text-3xl font-semibold text-black">
        Cari Mahasiswa
      </h4>
      <DataTable<MahasiswaDetail>
        table={table}
        isLoading={MahasiswaData.isLoading}
        error={MahasiswaData.error}
        refresh={MahasiswaData.refresh}
        title="Data Mahasiswa Baru"
        searchPlaceholder="Cari Mahasiswa..."
      />
    </main>
  );
};

export default CariMahasiswaContainer;
