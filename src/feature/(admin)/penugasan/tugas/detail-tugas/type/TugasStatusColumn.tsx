"use client";

import { TugasStatus } from "@/api/services/admin/tugas";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit3Icon } from "lucide-react";
import Link from "next/link";

const tugasStatusColumnHelper = createColumnHelper<TugasStatus>();

export const tugasStatusColumns = [
  tugasStatusColumnHelper.accessor("student_name", {
    header: "Nama Mahasiswa",
    cell: (info) => info.getValue(),
    size: 250,
  }),

  tugasStatusColumnHelper.accessor("nim", {
    header: "NIM",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  tugasStatusColumnHelper.accessor("distrik", {
    header: "Distrik",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  tugasStatusColumnHelper.accessor("kelompok", {
    header: "Kelompok",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  tugasStatusColumnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  tugasStatusColumnHelper.accessor("drive_link", {
    header: "Link Pengumpulan",
    cell: ({ row }) => {
      const link = row.original.drive_link;

      if (link) {
        return (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-normal underline hover:text-primary-normal-hover"
          >
            Lihat Pengumpulan
          </Link>
        );
      }

      // Tampilkan strip jika tidak ada link
      return <span className="text-gray-400">-</span>;
    },
    size: 200,
  }),

  tugasStatusColumnHelper.accessor("nilai", {
    header: "Nilai",
    cell: (info) => info.getValue(),
    size: 10,
  }),
  tugasStatusColumnHelper.display({
    id: "aksi",
    header: "Action",
    cell: ({ row, table }) => (
      <button
        type="button"
        onClick={() => table.options.meta?.openEditModal?.(row.original)}
        className="p-2 rounded-full hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light-active focus:ring-offset-2 transition-colors"
        aria-label="Edit Data"
        title="Edit Data"
      >
        <Edit3Icon className="text-primary-normal h-5 w-5" />
      </button>
    ),
    size: 120,
  }),
];
