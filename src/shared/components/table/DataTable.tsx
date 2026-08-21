"use client";

import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { Input } from "@/shared/components/ui/Input";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Loader2,
  Search,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

interface DataTableProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  title: string;
  searchPlaceholder?: string;
  hideSearchInput?: boolean;
  headerClassName?: string;
  hideMeta?: boolean;
  hidePagination?: boolean;
  whenOnClick?: boolean;
  filterComponent?: React.ReactNode;
  onRowClick?: (rowData: TData) => void;
}

export const DataTable = <TData extends object>({
  table,
  isLoading,
  error,
  title,
  searchPlaceholder,
  hideSearchInput = false,
  headerClassName,
  hideMeta = false,
  whenOnClick = false,
  filterComponent,
  onRowClick,
}: DataTableProps<TData>) => {
  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-admin-500" />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const firstRowIndex = pageIndex * pageSize + 1;
  const lastRowIndex = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="mt-4 lg:mt-2">
      <div className="mt-6 lg:mt-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center mb-5 lg:mb-8">
          <div className="flex gap-4 items-center w-full md:w-auto">
            {filterComponent}
          </div>
          {!hideSearchInput && (
            <div className="relative flex items-center w-full lg:w-1/3 h-11 lg:h-12">
              <Input
                className="text-sm w-full pl-10 h-full"
                variant="default"
                value={(table.getState().globalFilter as string) ?? ""}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                placeholder={searchPlaceholder}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
        <div className="bg-white w-full rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b-2 px-4 lg:px-6 py-3 lg:py-4 border-gray-400">
            <h4 className="text-lg lg:text-xl font-bold text-[#161A3D]">
              {title}
            </h4>
            {!hideMeta && (
              <span className="text-sm font-medium text-gray-500">
                {firstRowIndex} - {lastRowIndex} of {totalRows}
              </span>
            )}
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm text-left text-[#161A3D] table-auto">
              <thead
                className={cn("text-[#161A3D] text-base", headerClassName)}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="py-2 px-4 lg:py-3 lg:px-6 font-semibold"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={cn(
                              "flex items-center gap-2",
                              header.column.getCanSort() &&
                                "cursor-pointer select-none",
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === "asc"
                                  ? "Sort ascending"
                                  : header.column.getNextSortingOrder() ===
                                      "desc"
                                    ? "Sort descending"
                                    : "Clear sort"
                                : undefined
                            }
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: (
                                <ChevronUp className="h-4 w-4 text-[#161A3D]" />
                              ),
                              desc: (
                                <ChevronDown className="h-4 w-4 text-[#161A3D]" />
                              ),
                            }[header.column.getIsSorted() as string] ??
                              (header.column.getCanSort() ? (
                                <ChevronsUpDown className="h-4 w-4 text-[#161A3D]" />
                              ) : null)}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "h-14 lg:h-16 transition-colors",
                      whenOnClick && "cursor-pointer",
                      row.getIsSelected()
                        ? "bg-[#161A3D]/20 text-[#161A3D]"
                        : index % 2 === 1
                          ? "bg-white"
                          : "bg-[#161A3D]/5",
                    )}
                    onClick={
                      whenOnClick
                        ? (e) => {
                            if (onRowClick) {
                              onRowClick(row.original);
                            }
                            row.getToggleSelectedHandler()(e);
                          }
                        : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="py-2 px-4 lg:py-3 lg:px-6 font-medium"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pagination-controls mt-6 flex justify-end gap-4">
          <Button
            arrow="left"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="pagination-arrow"
          ></Button>
          <Button
            arrow="right"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="pagination-arrow"
          ></Button>
        </div>
      </div>
    </div>
  );
};
