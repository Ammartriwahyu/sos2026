import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface VisibilitasHasilData {
  tampilkan_semua: boolean;
  prodi: {
    SI: boolean;
    TI: boolean;
    PTI: boolean;
  };
}

export const useGetVisibilitasHasil = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery<VisibilitasHasilData>({
    queryKey: ["stfVisibilitasHasil"],
    queryFn: async () => {
      try {
        const res = await axios.get("/api/stf/visibilitas-hasil");
        return (
          res.data?.data || {
            tampilkan_semua: false,
            prodi: { SI: false, TI: false, PTI: false },
          }
        );
      } catch {
        return {
          tampilkan_semua: false,
          prodi: { SI: false, TI: false, PTI: false },
        };
      }
    },
    refetchInterval: 5000, // Polling setiap 5 detik agar sinkron real-time
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: {
      tampilkan_semua?: boolean;
      prodi?: string;
      visible?: boolean;
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

  const visibilitas: VisibilitasHasilData = data || {
    tampilkan_semua: false,
    prodi: { SI: false, TI: false, PTI: false },
  };

  const isProdiVisible = (prodiKey?: string | null): boolean => {
    if (visibilitas.tampilkan_semua) return true;
    if (!prodiKey) {
      return Object.values(visibilitas.prodi).some(Boolean);
    }
    const key = prodiKey.toUpperCase() as keyof typeof visibilitas.prodi;
    return Boolean(visibilitas.prodi[key]);
  };

  return {
    visibilitas,
    isLoading,
    refresh: refetch,
    updateVisibilitas: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isProdiVisible,
  };
};
