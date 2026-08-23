import { TaskCard26, TaskStatus } from "@/shared/components/ui/TaskCardSos26";
import { QuizCard26 } from "@/shared/components/ui/QuizCardSos26";
import { Kuis, Tugas } from "../types";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/Button";
import { getIconForTask } from "../data/tugasIconData";
import Image from "next/image";
import maskot from "@/assets/user/maskot-sabar.svg";
import Link from "next/link";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";

interface AktivitasSectionProps {
  tugas: Tugas[];
  kuis: Kuis[];
  activeTab: "tugas" | "kuis";
  onTabChange: (tab: "tugas" | "kuis") => void;
}

export const AktivitasSection = ({
  tugas,
  kuis,
  activeTab,
  onTabChange,
}: AktivitasSectionProps) => {
  const getTugasStatus = (tugasItem: Tugas): TaskStatus => {
    const statusLower = tugasItem.status?.toLowerCase().trim() || "";
    if (statusLower === "selesai") {
      return "completed";
    }
    if (statusLower === "terlewat") {
      return "overdue";
    }
    const deadlineDate = new Date(tugasItem.tenggat);
    if (!isNaN(deadlineDate.getTime()) && new Date() > deadlineDate) {
      return "overdue";
    }
    return "default";
  };

  const getQuizBadgeStatus = (
    statusKuis?: string,
    tenggat?: string,
  ): "Sudah dikerjakan" | "Mulai" | "Kuis sudah terlewat" => {
    const statusLower = statusKuis?.toLowerCase().trim() || "";
    if (statusLower === "selesai") {
      return "Sudah dikerjakan";
    }
    if (statusLower === "terlewat" || statusLower === "terlambat") {
      return "Kuis sudah terlewat";
    }
    // Fallback: cek tenggat waktu secara lokal jika status backend belum sinkron
    if (tenggat && new Date() > new Date(tenggat)) {
      return "Kuis sudah terlewat";
    }
    return "Mulai";
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-10 mb-[300px]">
      {activeTab !== "kuis" && (
        <div className="flex flex-wrap justify-center gap-4">
          <AktivitasButton
            onClick={() => {
              onTabChange("tugas");
            }}
            variant={activeTab === "tugas" ? "primary" : "outline"}
            className="w-auto px-10 md:px-14 text-sm md:text-base"
          >
            Tugas
          </AktivitasButton>

          <AktivitasButton
            onClick={() => {
              onTabChange("kuis");
            }}
            variant={(activeTab as string) === "kuis" ? "primary" : "outline"}
            className="w-auto px-10 md:px-14 text-sm md:text-base"
          >
            Kuis
          </AktivitasButton>
        </div>
      )}

      {/* COMMENT: [Tab Tugas Wrapper] Menggunakan grid untuk daftar tugas */}
      {activeTab === "tugas" && (
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-4 lg:gap-x-[40px] lg:gap-y-8 justify-items-center w-full",
          )}
        >
          {(tugas || []).length > 0 ? (
            tugas.map((item) => {
              const Icon = getIconForTask(item.judul, "tugas");
              const deadlineDate = new Date(item.tenggat);
              const formattedDeadline = isNaN(deadlineDate.getTime())
                ? item.tenggat
                : `${deadlineDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })} • ${deadlineDate.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} WIB`;

              const status = getTugasStatus(item);

              return (
                <Link
                  key={item.id_penugasan}
                  href={`/aktivitas/penugasan/${item.id_penugasan}`}
                  className="contents"
                >
                  <TaskCard26
                    taskName={item.judul}
                    deadline={formattedDeadline}
                    icon={
                      <Icon className="w-12 h-12 md:w-16 md:h-16 text-default-light group-hover:text-primary-500" />
                    }
                    status={status}
                  />
                </Link>
              );
            })
          ) : (
            <div className="col-span-full md:flex md:flex-col items-center gap-4 px-2">
              <Image
                src={maskot}
                alt="Description of the image"
                width={500}
                height={300}
              />
              <p className="text-center text-default-dark font-bold text-xl md:text-3xl">
                Sabar yaa tugas nya akan datang, tunggu yaaa!
              </p>
            </div>
          )}
        </div>
      )}

      {/* COMMENT: [Tab Kuis Wrapper] Mengubah layout menjadi flex vertikal dengan jarak antar card sebesar 30px dan responsif di berbagai device */}
      {activeTab === "kuis" && (
        <div className="flex flex-col items-center w-full gap-[30px]">
          {(kuis || []).length > 0 ? (
            kuis.map((item) => {
              const deadlineDate = new Date(item.tenggat_kuis);
              const formattedDeadline = isNaN(deadlineDate.getTime())
                ? item.tenggat_kuis
                : `${deadlineDate.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })} • ${deadlineDate.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} WIB`;

              const status = getQuizBadgeStatus(
                item.status_kuis,
                item.tenggat_kuis,
              );

              const isActive = status === "Mulai";

              return isActive ? (
                <Link
                  key={item.id_kuis}
                  href={`/aktivitas/kuis/start/${item.id_kuis}`}
                  className="w-full flex justify-center"
                >
                  <QuizCard26
                    title={item.nama_kuis}
                    description={
                      item.deskripsi_kuis ||
                      "Silakan kerjakan kuis ini untuk menguji pemahaman Anda."
                    }
                    deadline={formattedDeadline}
                    duration={item.durasi_kuis || "30 Menit"}
                    totalQuestions={`${item.jumlah_soal || 10} Soal`}
                    status={status}
                    score={item.skor}
                  />
                </Link>
              ) : (
                <div
                  key={item.id_kuis}
                  className="w-full flex justify-center cursor-default"
                >
                  <QuizCard26
                    title={item.nama_kuis}
                    description={
                      item.deskripsi_kuis ||
                      "Silakan kerjakan kuis ini untuk menguji pemahaman Anda."
                    }
                    deadline={formattedDeadline}
                    duration={item.durasi_kuis || "30 Menit"}
                    totalQuestions={`${item.jumlah_soal || 10} Soal`}
                    status={status}
                    score={item.skor}
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-4 px-2">
              <Image
                src={maskot}
                alt="Description of the image"
                width={500}
                height={300}
              />
              <p className="text-center text-default-dark font-bold text-xl md:text-3xl">
                Sabar yaa kuis nya akan datang, tunggu yaaa!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
