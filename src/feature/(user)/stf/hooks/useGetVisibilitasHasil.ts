import { useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface VisibilitasHasilData {
  tampilkan_semua: boolean;
  prodi: {
    SI: boolean;
    TI: boolean;
    PTI: boolean;
  };
  kadep?: boolean;
}

export interface UseGetVisibilitasHasilOptions {
  enabled?: boolean;
}

export const useGetVisibilitasHasil = (
  options?: UseGetVisibilitasHasilOptions,
) => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery<VisibilitasHasilData>({
    queryKey: ["stfVisibilitasHasil"],
    queryFn: async ({ signal }) => {
      try {
        const res = await axios.get("/api/stf/visibilitas-hasil", { signal });
        return (
          res.data?.data || {
            tampilkan_semua: false,
            prodi: { SI: false, TI: false, PTI: false },
            kadep: false,
          }
        );
      } catch (err: unknown) {
        if (axios.isCancel(err)) throw err;
        return {
          tampilkan_semua: false,
          prodi: { SI: false, TI: false, PTI: false },
          kadep: false,
        };
      }
    },
    refetchInterval: (query) => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "hidden"
      ) {
        return false;
      }
      if (query.state.error && axios.isAxiosError(query.state.error)) {
        if (query.state.error.response?.status === 429) {
          return false;
        }
        return 30000;
      }
      return 8000 + Math.floor(Math.random() * 2000);
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 4000,
    enabled: options?.enabled ?? true,
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: {
      tampilkan_semua?: boolean;
      prodi?: string;
      visible?: boolean;
      kadep?: boolean;
      action?: string;
    }) => {
      const res = await axios.post("/api/stf/visibilitas-hasil", payload);
      return res.data?.data;
    },
    onSuccess: (newData) => {
      if (newData) {
        queryClient.setQueryData(["stfVisibilitasHasil"], newData);
      }
      queryClient.invalidateQueries({ queryKey: ["stfVisibilitasHasil"] });
    },
  });

  const visibilitas: VisibilitasHasilData = useMemo(() => {
    return (
      data || {
        tampilkan_semua: false,
        prodi: { SI: false, TI: false, PTI: false },
        kadep: false,
      }
    );
  }, [data]);

  const isProdiVisible = useCallback(
    (prodiKey?: string | null): boolean => {
      if (visibilitas.tampilkan_semua) return true;
      if (!prodiKey) {
        return Object.values(visibilitas.prodi).some(Boolean);
      }
      const key = prodiKey.toUpperCase() as keyof typeof visibilitas.prodi;
      return Boolean(visibilitas.prodi[key]);
    },
    [visibilitas],
  );

  const isKadepVisible = useCallback((): boolean => {
    return Boolean(visibilitas.kadep);
  }, [visibilitas]);

  return {
    visibilitas,
    isLoading,
    refresh: refetch,
    updateVisibilitas: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isProdiVisible,
    isKadepVisible,
  };
};
