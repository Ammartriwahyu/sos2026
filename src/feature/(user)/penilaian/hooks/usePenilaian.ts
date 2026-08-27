"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { penugasanService } from "@/api/services/user/penugasan";
import { penilaianService } from "@/api/services/user/penilaian";
import { Rangkaian } from "@/feature/(user)/penugasan/types";
import { DetailNilaiRangkaian } from "../types";

export const usePenilaian = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPenilaianAktif, setIsPenilaianAktif] = useState(false);

  const [rangkaianList, setRangkaianList] = useState<Rangkaian[]>([]);
  const [activeRangkaianId, setActiveRangkaianId] = useState<string | null>(
    null,
  );
  const [detailNilai, setDetailNilai] = useState<DetailNilaiRangkaian | null>(
    null,
  );

  const fetchInitialData = useCallback(async () => {
    try {
      const kegiatanRes = await penugasanService.getAllKegiatan();
      const penilaianKegiatan = kegiatanRes.data.find(
        (k) => k.nama.toLowerCase() === "penilaian",
      );
      setIsPenilaianAktif(penilaianKegiatan?.active || false);

      const rangkaianRes = await penugasanService.getAllRangkaian();
      setRangkaianList(rangkaianRes.data);

      if (rangkaianRes.data && rangkaianRes.data.length > 0) {
        setActiveRangkaianId(rangkaianRes.data[0].ID);
      }
    } catch {
      setError("Gagal memuat data awal. Coba refresh halaman.");
    }
  }, []);

  const fetchDetailNilai = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await penilaianService.getDetailNilaiByRangkaian(id);
      setDetailNilai(response.data);
    } catch (err) {
      setDetailNilai(null);
      if (!(axios.isAxiosError(err) && err.response?.status === 404)) {
        setError("Gagal memuat detail nilai untuk rangkaian ini.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    if (activeRangkaianId) {
      fetchDetailNilai(activeRangkaianId);
    } else {
      setIsLoading(false);
    }
  }, [activeRangkaianId, fetchDetailNilai]);

  const handleRangkaianChange = (id: string) => {
    setActiveRangkaianId(id);
  };

  return {
    isLoading,
    error,
    isPenilaianAktif,
    rangkaianList,
    activeRangkaianId,
    detailNilai,
    handleRangkaianChange,
  };
};
