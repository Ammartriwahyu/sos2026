import { TaskCard26, TaskStatus } from "@/shared/components/ui/TaskCardSos26";
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

  const getKuisStatus = (kuisItem: Kuis): TaskStatus => {
    if (kuisItem.status_kuis?.toLowerCase() === "selesai") {
      return "completed";
    }
    if (
      kuisItem.status_kuis?.toLowerCase() === "terlewat" ||
      new Date() > new Date(kuisItem.tenggat_kuis)
    ) {
      return "overdue";
    }
    return "default";
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-10 mb-[300px]">
      <div className="flex flex-wrap justify-center gap-4">
        <AktivitasButton
          onClick={() => {
            console.log("saya ingin hands on slicing");
            onTabChange("tugas");
          }}
          variant={activeTab === "tugas" ? "primary" : "outline"}
          className="w-auto px-10 md:px-14 text-sm md:text-base"
        >
          Tugas
        </AktivitasButton>

        <AktivitasButton
          onClick={() => {
            console.log("saya ingin hands on slicing");
            onTabChange("kuis");
          }}
          variant={activeTab === "kuis" ? "primary" : "outline"}
          className="w-auto px-10 md:px-14 text-sm md:text-base"
        >
          Kuis
        </AktivitasButton>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-x-4 lg:gap-x-[40px] lg:gap-y-8 justify-items-center",
        )}
      >
        {activeTab === "tugas" &&
          ((tugas || []).length > 0 ? (
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
            <div className="col-span-full md:flex md:flex-col items-center gap-4 px-2 ">
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
          ))}

        {activeTab === "kuis" &&
          ((kuis || []).length > 0 ? (
            kuis.map((item) => {
              const Icon = getIconForTask(item.nama_kuis, "kuis");
              const deadlineDate = new Date(item.tenggat_kuis);
              const formattedDeadline = `${deadlineDate.toLocaleDateString(
                "id-ID",
                { day: "numeric", month: "long", year: "numeric" },
              )} • ${deadlineDate.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })} WIB`;

              const status = getKuisStatus(item);

              return (
                <Link
                  key={item.id_kuis}
                  href={`/aktivitas/kuis/${item.id_kuis}`}
                  className="contents"
                >
                  <TaskCard26
                    taskName={item.nama_kuis}
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
            <div className="col-span-full md:flex md:flex-col items-center gap-4 px-2 ">
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
          ))}
      </div>
    </div>
  );
};
