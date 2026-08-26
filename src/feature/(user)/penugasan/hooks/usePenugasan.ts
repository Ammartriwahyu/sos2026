import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { mahasiswaService } from "@/api/services/user/maba";
import { penugasanService } from "@/api/services/user/penugasan";
import { useQuery } from "@tanstack/react-query";
import { Tugas, Rangkaian } from "../types";

export const usePenugasan = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"tugas" | "kuis">(
    tabParam === "kuis" ? "kuis" : "tugas",
  );

  useEffect(() => {
    if (tabParam === "kuis" || tabParam === "tugas") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const { data: level } = useQuery({
    queryKey: ["mahasiswaLevel"],
    queryFn: () => mahasiswaService.getMyLevel().then((res) => res.data),
  });

  const { data: kuisList, isLoading: isKuisLoading } = useQuery({
    queryKey: ["kuisList"],
    queryFn: () => penugasanService.getAllKuis().then((res) => res.data),
  });

  const { data: allTugas, isLoading: isTugasLoading } = useQuery({
    queryKey: ["allPenugasanData"],
    queryFn: () =>
      penugasanService.getAllPenugasan().then((res) => res.data || []),
  });

  const filteredTugas = useMemo(() => {
    if (!allTugas) return [];
    const now = new Date();
    const activeRangkaianNames: string[] = [];
    const uniqueRangkaian: Rangkaian[] = [
      ...new Map(
        allTugas
          .filter((t): t is Tugas & { rangkaian: Rangkaian } => !!t.rangkaian)
          .map((t) => [t.rangkaian.ID, t.rangkaian]),
      ).values(),
    ];
    uniqueRangkaian.forEach((rangkaian) => {
      if (new Date(rangkaian.Start_Date) <= now) {
        activeRangkaianNames.push(rangkaian.Name);
      }
    });
    if (
      activeRangkaianNames.length === 0 &&
      uniqueRangkaian.some((r) => r.Name === "Pra-Rangkaian")
    ) {
      activeRangkaianNames.push("Pra-Rangkaian");
    }
    return allTugas.filter(
      (tugas) =>
        tugas.rangkaian && activeRangkaianNames.includes(tugas.rangkaian.Name),
    );
  }, [allTugas]);

  const { data: tugasWithStatus, isLoading: isStatusLoading } = useQuery({
    queryKey: ["tugasWithStatus", filteredTugas?.map((t) => t.id_penugasan)],
    queryFn: async () => {
      if (!filteredTugas || filteredTugas.length === 0) return [];
      const promises = filteredTugas.map(async (tugasItem) => {
        try {
          const detailRes = await penugasanService.getTugasDetailWithStatus(
            tugasItem.id_penugasan,
          );
          return { ...tugasItem, status: detailRes.data.status };
        } catch (e) {
          console.error(
            `Gagal fetch status untuk tugas ${tugasItem.id_penugasan}:`,
            e,
          );
          return { ...tugasItem, status: "Belum Selesai" };
        }
      });
      return Promise.all(promises);
    },
    enabled: !!filteredTugas && filteredTugas.length > 0,
  });

  const { data: kuisWithStatus, isLoading: isKuisStatusLoading } = useQuery({
    queryKey: ["kuisWithStatus", kuisList?.map((k) => k.id_kuis)],
    queryFn: async () => {
      if (!kuisList || kuisList.length === 0) return [];
      const promises = kuisList.map(async (kuisItem) => {
        try {
          const detailRes = await penugasanService.getKuisDetailWithStatus(
            kuisItem.id_kuis,
          );

          return {
            ...kuisItem,
            status_kuis: detailRes.data.status_kuis,
            deskripsi_kuis: detailRes.data.deskripsi_kuis,
            durasi_kuis: detailRes.data.durasi_kuis,
            jumlah_soal: detailRes.data.jumlah_soal,
            skor: detailRes.data.skor,
          };
        } catch (e) {
          console.error(
            `Gagal fetch status untuk kuis ${kuisItem.id_kuis}:`,
            e,
          );
          return { ...kuisItem, status_kuis: "Belum Mulai" };
        }
      });
      return Promise.all(promises);
    },
    enabled: !!kuisList && kuisList.length > 0,
  });

  return {
    level: level || null,
    tugas: tugasWithStatus || [],
    kuis: kuisWithStatus || [],
    isLoading:
      isTugasLoading || isKuisLoading || isStatusLoading || isKuisStatusLoading,
    activeTab,
    setActiveTab,
  };
};
