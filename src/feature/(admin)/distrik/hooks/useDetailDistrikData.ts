"use client";

import { useState, useEffect, useCallback } from "react";
import { distrikService } from "@/api/services/admin/distrik";
import { Distrik, AnggotaMaba } from "../type";

export const useDetailDistrikData = (distrikId: string) => {
  const [distrik, setDistrik] = useState<Distrik | null>(null);
  const [anggota, setAnggota] = useState<AnggotaMaba[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!distrikId) return;
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch distrik first
      const distrikResponse = await distrikService.getDistrictById(distrikId);
      const distrikData = distrikResponse?.data;
      if (!distrikData) {
        throw new Error("Gagal memuat data detail distrik.");
      }
      setDistrik(distrikData);

      // 2. Fetch mabas per kelompok so we can inject the kelompok name (since backend omit it)
      if (distrikData.list_kelompok && distrikData.list_kelompok.length > 0) {
        const mabaPromises = distrikData.list_kelompok.map(async (k) => {
          const res = await distrikService.getAnggotaByDistrictId(distrikId, {
            page: 1,
            limit: 1000,
            id_kelompok: k.id_kelompok,
          });
          const records =
            res?.data?.records || (Array.isArray(res?.data) ? res.data : []);
          // Inject kelompok manually
          return records.map((maba: AnggotaMaba) => ({
            ...maba,
            kelompok: k.nama_kelompok,
          }));
        });

        const mabasArrays = await Promise.all(mabaPromises);
        const allMabas = mabasArrays.flat();
        setAnggota(allMabas);
      } else {
        setAnggota([]);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [distrikId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { distrik, anggota, isLoading, error, refresh: fetchData };
};
