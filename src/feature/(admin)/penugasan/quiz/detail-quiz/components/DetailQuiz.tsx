"use client";

import type { DetailQuiz } from "@/api/services/admin/quiz";
import { Button } from "@/shared/components/ui/Button";
import { Calendar, Clock, Trash2 } from "lucide-react";
import React from "react";

interface DetailQuizProps {
  quiz: DetailQuiz | null;
  onEdit: () => void;
  onDelete: () => void;
  isSQC: boolean;
}

const DetailQuiz = ({ quiz, onEdit, onDelete, isSQC }: DetailQuizProps) => {
  const formatTenggat = (tenggat: string | undefined) => {
    if (!tenggat) {
      return { date: "N/A", time: "N/A" };
    }
    const deadlineDate = new Date(tenggat);
    const date = deadlineDate
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\./g, " / ");

    const time = deadlineDate
      .toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\./g, " : ");

    return { date, time };
  };

  const { date, time } = formatTenggat(quiz?.tenggat_kuis);
  return (
    <div className="w-full">
      <h4 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-black">
        Quiz {quiz?.nama_kuis || "Judul Quiz Tidak Ditemukan"}
      </h4>

      <p
        className="mt-8 md:mt-12 text-justify text-base md:text-lg lg:text-base text-gray-800 whitespace-pre-line"
        data-testid="quiz-description"
      >
        {quiz?.deskripsi_kuis || "Deskripsi tidak tersedia."}
      </p>

      <div className="mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex flex-col space-y-2 text-gray-700">
            <span className="text-primary-normal font-medium">Deadline:</span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Calendar />
                <span>{date}</span>
              </div>
              <div className="h-6 border-l border-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Clock />
                <span>{time}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-gray-700">
            <span className="text-primary-normal font-medium">Rangkaian:</span>
            <span className="w-fit">{quiz?.data_rangkaian.Name}</span>
          </div>
        </div>
        {isSQC && (
          <div className="mt-12 flex  gap-10">
            <Button className="w-60" onClick={onEdit} variant={"admin"}>
              Edit Quiz
            </Button>
            <Button
              className="w-60"
              onClick={onDelete}
              variant={"admin-outline"}
            >
              <Trash2 size={16} className="mr-2" />
              Hapus Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailQuiz;
