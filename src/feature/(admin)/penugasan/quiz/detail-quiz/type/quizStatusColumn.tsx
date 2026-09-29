"use client";

import { QuizSubmission } from "@/api/services/admin/quiz"; // 1. Ganti tipe data ke QuizSubmission
import { createColumnHelper } from "@tanstack/react-table";
import { Edit3Icon } from "lucide-react";

// 2. Buat column helper dengan tipe data QuizSubmission
const quizStatusColumnHelper = createColumnHelper<QuizSubmission>();

export const quizStatusColumns = [
  // 3. Sesuaikan accessor dengan properti di QuizSubmission
  quizStatusColumnHelper.accessor("nama", {
    header: "Nama Mahasiswa",
    cell: (info) => info.getValue(),
    size: 250,
  }),

  quizStatusColumnHelper.accessor("nim", {
    header: "NIM",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  // Kolom distrik dan kelompok dihapus karena tidak ada di data kuis

  quizStatusColumnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  // Kolom link_pengumpulan dihapus

  quizStatusColumnHelper.accessor("score", {
    header: "Skor", // Header diubah dari "Nilai" menjadi "Skor"
    cell: (info) => info.getValue(),
    size: 100,
  }),

  quizStatusColumnHelper.accessor("waktu_jawab", {
    header: "Waktu Pengerjaan",
    cell: (info) => {
      // Format tanggal agar lebih mudah dibaca
      const date = new Date(info.getValue());
      if (isNaN(date.getTime()) || info.getValue() === "0001-01-01T00:00:00Z") {
        return <span className="text-gray-400">-</span>;
      }
      return date.toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    size: 200,
  }),
  quizStatusColumnHelper.display({
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
