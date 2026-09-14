import { useState, useEffect, useCallback } from "react";
import {
  presensiService,
  PresensiDetailData,
  PresensiMahasiswaDetail,
} from "@/api/services/admin/presensi";
import { ApiResponse } from "@/api/core/AxiosInstance";

export const usePresensiDetailPage = (kodeId: string) => {
  const [presensiInfo, setPresensiInfo] = useState<
    PresensiDetailData["presensi_info"] | null
  >(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const [mahasiswaList, setMahasiswaList] = useState<
    PresensiMahasiswaDetail[] | null
  >(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [errorList, setErrorList] = useState<string | null>(null);

  const fetchPresensiInfo = useCallback(async () => {
    if (!kodeId) {
      setErrorInfo("Presensi Kode ID is required for info.");
      setIsLoadingInfo(false);
      return;
    }
    setIsLoadingInfo(true);
    setErrorInfo(null);
    try {
      const response: ApiResponse<PresensiDetailData> =
        await presensiService.getPresensiDetail(kodeId);
      if (response.success && response.data) {
        setPresensiInfo(response.data.presensi_info);
      } else {
        setErrorInfo(response.message || "Failed to load presensi info.");
        setPresensiInfo(null);
      }
    } catch (err: unknown) {
      const apiError = err as ApiResponse<null>;
      setErrorInfo(
        apiError?.message || "An unexpected error occurred fetching info.",
      );
      setPresensiInfo(null);
      console.error("Error in fetchPresensiInfo:", err);
    } finally {
      setIsLoadingInfo(false);
    }
  }, [kodeId]);

  const fetchMahasiswaList = useCallback(async () => {
    if (!kodeId) {
      setErrorList("Presensi Kode ID is required for student list.");
      setIsLoadingList(false);
      return;
    }
    setIsLoadingList(true);
    setErrorList(null);
    try {
      const response = await presensiService.getPresensiMahasiswaList(kodeId, {
        page: 1,
        pageSize: 10000,
      });

      if (response.success && response.data) {
        setMahasiswaList(response.data.mahasiswa_list ?? []);
      } else {
        setErrorList(response.message || "Failed to load student list.");
        setMahasiswaList(null);
      }
    } catch (err: unknown) {
      const apiError = err as ApiResponse<null>;
      setErrorList(
        apiError?.message || "An unexpected error occurred fetching list.",
      );
      setMahasiswaList(null);
      console.error("Error in fetchMahasiswaList:", err);
    } finally {
      setIsLoadingList(false);
    }
  }, [kodeId]);

  useEffect(() => {
    fetchPresensiInfo();
  }, [fetchPresensiInfo]);

  useEffect(() => {
    fetchMahasiswaList();
  }, [fetchMahasiswaList]);

  return {
    presensiInfo,
    mahasiswaList,
    isLoadingInfo,
    isLoadingList,
    errorInfo,
    errorList,
    refreshInfo: fetchPresensiInfo,
    refreshList: fetchMahasiswaList,
    refreshAll: useCallback(() => {
      fetchPresensiInfo();
      fetchMahasiswaList();
    }, [fetchPresensiInfo, fetchMahasiswaList]),
  };
};
