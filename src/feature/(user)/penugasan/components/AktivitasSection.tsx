import { TaskCard26, TaskStatus } from "@/shared/components/ui/TaskCardSos26";
import { QuizCard26 } from "@/shared/components/ui/QuizCardSos26";
import { Kuis, Tugas } from "../types";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/Button";
import { getIconForTask } from "../data/tugasIconData";
import Link from "next/link";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import MaskotEmptyState from "@/shared/components/ui/MaskotEmptyState";

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

      {/* Tab Tugas */}
      {activeTab === "tugas" && (
        <div
          className={cn(
            "w-full",
            (tugas || []).length > 0
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-5xl mx-auto"
              : "flex justify-center",
          )}
        >
          {(tugas || []).length > 0 ? (
            tugas.map((item, index) => {
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
                <AnimatedDiv
                  key={item.id_penugasan}
                  className="w-full flex justify-center"
                  delay={0.05 + index * 0.05}
                >
                  <Link
                    href={`/aktivitas/penugasan/${item.id_penugasan}`}
                    className="w-full flex justify-center"
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
                </AnimatedDiv>
              );
            })
          ) : (
            <AnimatedDiv className="col-span-full w-full" delay={0.1}>
              <MaskotEmptyState message="Sabar yaa, tugasnya akan segera datang!" />
            </AnimatedDiv>
          )}
        </div>
      )}

      {/* COMMENT: [Tab Kuis Wrapper] Mengubah layout menjadi flex vertikal dengan animasi AnimatedDiv untuk transisi smooth saat tab kuis dibuka */}
      {activeTab === "kuis" && (
        <AnimatedDiv
          key="subpage-kuis-container"
          className="flex flex-col items-center w-full gap-[30px]"
          delay={0.1}
        >
          {(kuis || []).length > 0 ? (
            kuis.map((item, index) => {
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

              return (
                <AnimatedDiv
                  key={item.id_kuis}
                  className="w-full flex justify-center"
                  delay={0.15 + index * 0.08}
                >
                  {isActive ? (
                    <Link
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
                    <div className="w-full flex justify-center cursor-default">
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
                  )}
                </AnimatedDiv>
              );
            })
          ) : (
            <AnimatedDiv className="w-full" delay={0.1}>
              <MaskotEmptyState message="Sabar yaa, kuisnya akan segera datang!" />
            </AnimatedDiv>
          )}
        </AnimatedDiv>
      )}
    </div>
  );
};
