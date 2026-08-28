"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";

import { DataTable } from "@/shared/components/table/DataTable";
import { AnggotaKelompok, columns } from "../type/anggotaKelompokColumns";
import { getSortedRowModel } from "@tanstack/react-table";

interface AnggotaKelompokTableProps {
  kelompokName: string;
  anggotaList: AnggotaKelompok[];
  globalFilter: string;
  isLoading: boolean;
}

const AnggotaKelompokTable = ({
  kelompokName,
  anggotaList,
  globalFilter,
  isLoading,
}: AnggotaKelompokTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });

  const table = useReactTable({
    data: anggotaList ?? [],
    columns,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataTable<AnggotaKelompok>
      table={table}
      isLoading={isLoading}
      error={null}
      refresh={() => {}}
      title={`Anggota ${kelompokName}`}
      searchPlaceholder=""
      hideSearchInput={true}
    />
  );
};

export default AnggotaKelompokTable;
