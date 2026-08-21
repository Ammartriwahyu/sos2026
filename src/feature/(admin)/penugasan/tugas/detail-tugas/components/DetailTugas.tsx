"use client";

import { TugasSummary } from "@/api/services/admin/tugas";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Calendar, Clock, Eye, EyeOff, Target } from "lucide-react";
import React from "react";

interface DetailTugasProps {
  tugas: TugasSummary | null;
  onEdit: () => void;
  isSQC: boolean;
}

const DetailTugas = ({ tugas, onEdit, isSQC }: DetailTugasProps) => {
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

  const { date, time } = formatTenggat(tugas?.tenggat);

  return (
    <div className="w-full">
      <h4 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-black">
        Tugas {tugas?.judul || "Judul Tugas Tidak Ditemukan"}
      </h4>

      <p
        className="mt-8 md:mt-12 text-justify text-base md:text-lg lg:text-base text-gray-800 whitespace-pre-line"
        data-testid="tugas-description"
      >
        {tugas?.deskripsi || "Deskripsi tidak tersedia."}
      </p>

      <div className="mt-12 md:mt-16">
        <div className="space-y-2">
          <label htmlFor="drive-link" className="block text-sm md:text-base">
            Link Drive File Pendukung
          </label>
          <Input
            id="drive-link"
            value={tugas?.file_link || ""}
            className="w-full"
            disabled
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">
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
            <span className="w-fit">{tugas?.rangkaian?.Name}</span>
          </div>

          <div className="flex flex-col space-y-2 text-gray-700">
            <span className="text-primary-normal font-medium">
              Visibilitas:
            </span>
            <div className="flex items-center space-x-2">
              {tugas?.is_visible !== "false" ? (
                <>
                  <Eye className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Terlihat</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">Tersembunyi</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-gray-700">
            <span className="text-primary-normal font-medium">Target:</span>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>{tugas?.target || "Tidak ada target"}</span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {isSQC && (
            <Button onClick={onEdit} variant={"admin"}>
              Edit Tugas
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailTugas;
