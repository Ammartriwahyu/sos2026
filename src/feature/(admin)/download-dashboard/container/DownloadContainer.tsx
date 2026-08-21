"use client";
import React, { useState } from "react";
import {
  Download,
  FileText,
  BarChart3,
  Users,
  AlertCircle,
  CheckCircle2,
  Loader2,
  LucideIcon,
  X,
  Clock,
  XCircle,
  ChevronLeft,
} from "lucide-react";
import useDownload from "../hooks/useDownload";
import FileNameModal from "../components/FileNameModal";
import Link from "next/link";

type DownloadType = "penilaian" | "penugasan" | "mahasiswa";

interface DownloadCard {
  id: DownloadType;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  defaultFilename?: string;
}

interface DownloadProgress {
  id: string;
  type: DownloadType;
  title: string;
  filename: string;
  status: "downloading" | "completed" | "failed";
  startTime: Date;
  error?: string;
}

const DownloadContainer = () => {
  const [downloadQueue, setDownloadQueue] = useState<DownloadProgress[]>([]);

  const downloadCards: DownloadCard[] = [
    {
      id: "penugasan",
      title: "Penugasan",
      description: "Download data penugasan siswa",
      icon: FileText,
      color: "from-violet-normal to-violet-dark",
      hoverColor: "hover:from-violet-normal-hover hover:to-violet-dark-hover",
    },
    {
      id: "penilaian",
      title: "Penilaian",
      description: "Download laporan penilaian",
      icon: BarChart3,
      color: "from-violet-normal to-violet-dark",
      hoverColor: "hover:from-violet-normal-hover hover:to-violet-dark-hover",
    },
    {
      id: "mahasiswa",
      title: "Mahasiswa",
      description: "Download data mahasiswa",
      icon: Users,
      color: "from-violet-normal to-violet-dark",
      hoverColor: "hover:from-violet-normal-hover hover:to-violet-dark-hover",
    },
  ];

  const addToQueue = (type: DownloadType, title: string, filename: string) => {
    const downloadId = `${type}-${Date.now()}`;
    const newDownload: DownloadProgress = {
      id: downloadId,
      type,
      title,
      filename,
      status: "downloading",
      startTime: new Date(),
    };
    setDownloadQueue((prev) => [...prev, newDownload]);
    return downloadId;
  };

  const updateQueueStatus = (
    id: string,
    status: "completed" | "failed",
    error?: string,
  ) => {
    setDownloadQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, error } : item)),
    );
  };

  const removeFromQueue = (id: string) => {
    setDownloadQueue((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllCompleted = () => {
    setDownloadQueue((prev) =>
      prev.filter((item) => item.status === "downloading"),
    );
  };

  const getElapsedTime = (startTime: Date) => {
    const elapsed = Math.floor(
      (new Date().getTime() - startTime.getTime()) / 1000,
    );
    if (elapsed < 60) return `${elapsed}s`;
    return `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;
  };

  const DownloadCard = ({ card }: { card: DownloadCard }) => {
    const { isLoading, error, download } = useDownload(card.id);
    const [success, setSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
      if (!isLoading) {
        setIsModalOpen(true);
      }
    };

    const handleConfirmDownload = async (customFilename: string) => {
      try {
        const today = new Date();
        const dateSuffix = `${String(today.getDate()).padStart(
          2,
          "0",
        )}_${String(today.getMonth() + 1).padStart(
          2,
          "0",
        )}_${today.getFullYear()}`;
        const filenameWithDate = `${customFilename}[${dateSuffix}]`;

        const downloadId = addToQueue(card.id, card.title, filenameWithDate);

        await download(filenameWithDate);

        updateQueueStatus(downloadId, "completed");

        setSuccess(true);
        setIsModalOpen(false);
        setTimeout(() => setSuccess(false), 3000);

        // Auto remove completed downloads after 10 seconds
        setTimeout(() => removeFromQueue(downloadId), 10000);
      } catch (err) {
        // Update status to failed
        const downloadId = downloadQueue.find(
          (d) => d.type === card.id && d.status === "downloading",
        )?.id;
        if (downloadId) {
          updateQueueStatus(
            downloadId,
            "failed",
            err instanceof Error ? err.message : "Download failed",
          );
        }
      }
    };

    const IconComponent = card.icon;

    return (
      <>
        <div
          key={card.id}
          className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border overflow-hidden ${
            error
              ? "border-red-300"
              : success
                ? "border-green-300"
                : "border-surface-divider"
          }`}
          onClick={handleCardClick}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.color} ${card.hoverColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          />

          {/* Card content */}
          <div className="relative p-6 flex flex-col items-center text-center space-y-4">
            {/* Icon container */}
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                card.color
              } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              ) : success ? (
                <CheckCircle2 className="w-8 h-8 text-white" />
              ) : error ? (
                <AlertCircle className="w-8 h-8 text-white" />
              ) : (
                <IconComponent className="w-8 h-8 text-white" />
              )}
            </div>

            <h3
              className={`text-xl font-semibold font-poppins transition-colors duration-300 ${
                error
                  ? "text-red-600"
                  : success
                    ? "text-green-600"
                    : "text-default-dark group-hover:text-violet-dark"
              }`}
            >
              {card.title}
            </h3>

            <p className="text-sm text-default-dark-50 font-poppins leading-relaxed">
              {card.description}
            </p>

            <div
              className={`flex items-center space-x-2 transition-colors duration-300 mt-4 ${
                error
                  ? "text-red-500"
                  : success
                    ? "text-green-500"
                    : "text-violet-normal group-hover:text-violet-dark"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium font-poppins">
                    Downloading...
                  </span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium font-poppins">
                    Downloaded!
                  </span>
                </>
              ) : error ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium font-poppins">
                    Failed
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium font-poppins">
                    Download
                  </span>
                </>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Hover effect border */}
          <div
            className={`absolute inset-0 border-2 border-transparent rounded-xl transition-all duration-300 ${
              error
                ? "group-hover:border-red-200"
                : success
                  ? "group-hover:border-green-200"
                  : "group-hover:border-violet-light-active"
            }`}
          />
        </div>
        <FileNameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleConfirmDownload}
          defaultFileName={card.defaultFilename || ""}
          isLoading={isLoading}
          title={card.title}
        />
      </>
    );
  };

  return (
    <main className="font-poppins p-6 md:p-10 bg-[#F3F2F7] min-h-screen w-full">
      <Link
        href="/admin/dashboard"
        className="flex items-center gap-2 text-admin-500 hover:text-admin-800 transition-colors w-fit font-semibold mb-6"
      >
        <ChevronLeft size={24} />
        <span className="text-xl">Kembali</span>
      </Link>

      <div className="pb-4 border-b-2 border-[#161A3D] mb-8">
        <h2 className="text-[#161A3D] font-bold text-3xl mb-2">
          Download Data
        </h2>
        <p className="text-gray-600 font-poppins">
          Pilih jenis data yang ingin Anda download
        </p>
      </div>

      {/* Download Progress Section */}
      {downloadQueue.length > 0 && (
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-surface-divider p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-default-dark font-poppins flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Download Progress ({downloadQueue.length})
            </h3>
            {downloadQueue.some((d) => d.status !== "downloading") && (
              <button
                onClick={clearAllCompleted}
                className="text-sm text-gray-500 hover:text-gray-700 font-poppins"
              >
                Clear Completed
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {downloadQueue.map((download) => {
              return (
                <div
                  key={download.id}
                  className={`flex w-full flex-col sm:flex-row md:items-center md:justify-between p-3 rounded-lg border transition-all duration-200 gap-3 ${
                    download.status === "downloading"
                      ? "bg-blue-50 border-blue-200"
                      : download.status === "completed"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        download.status === "downloading"
                          ? "bg-blue-500"
                          : download.status === "completed"
                            ? "bg-green-500"
                            : "bg-red-500"
                      }`}
                    >
                      {download.status === "downloading" ? (
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      ) : download.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <XCircle className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="font-medium text-default-dark font-poppins text-sm truncate">
                        {download.filename}.xlsx
                      </div>
                      <div className="text-xs text-default-dark-50 truncate">
                        {download.title} • {getElapsedTime(download.startTime)}
                        {download.status === "failed" && download.error && (
                          <span className="text-red-500 ml-2">
                            • {download.error}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-2 ml-11 sm:ml-0">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                        download.status === "downloading"
                          ? "bg-blue-100 text-blue-700"
                          : download.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {download.status === "downloading"
                        ? "Downloading"
                        : download.status === "completed"
                          ? "Completed"
                          : "Failed"}
                    </span>

                    {download.status !== "downloading" && (
                      <button
                        onClick={() => removeFromQueue(download.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {downloadCards.map((card) => (
          <DownloadCard key={card.id} card={card} />
        ))}
      </div>

      {/* Additional info section */}
      <div className="mt-12 bg-secondary-100 rounded-xl p-6 border border-secondary-300">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 rounded-full bg-violet-normal flex items-center justify-center flex-shrink-0 mt-1">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-default-dark font-poppins mb-2">
              Informasi Download
            </h4>
            <ul className="text-sm text-default-dark font-poppins space-y-1">
              <li>• File akan didownload dalam format Excel (.xlsx)</li>
              <li>• Pastikan koneksi internet stabil saat download</li>
              <li>• Klik pada kartu untuk memulai download</li>
              <li>• Progress download akan ditampilkan di atas</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DownloadContainer;
