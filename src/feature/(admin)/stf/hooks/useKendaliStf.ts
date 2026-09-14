import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { stfService } from "@/api/services/admin/stf";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useKendaliStf = () => {
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["sesiPapan"],
    queryFn: () => stfService.getSesiPapan(),
    refetchInterval: 5000, // auto-refresh setiap 5 detik agar admin bisa mantau suara
  });

  const papanData = response?.status_code === 200 ? response.data : null;
  const errorMsg = error ? error.message : null;

  const handleSuccess = (message: string) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: ["sesiPapan"] });
  };

  const handleError = (error: unknown, fallbackMessage: string) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || fallbackMessage);
    } else {
      toast.error(fallbackMessage);
    }
  };

  const ubahTahapMutation = useMutation({
    mutationFn: (tahap: string) => stfService.setTahap(tahap),
    onSuccess: (res) => handleSuccess(res.message || "Tahap berhasil diubah"),
    onError: (err) => handleError(err, "Gagal mengubah tahap"),
  });

  const siapkanSesiMutation = useMutation({
    mutationFn: () => stfService.siapkanPutaranPertama(),
    onSuccess: (res) => handleSuccess(res.message || "Sesi berhasil disiapkan"),
    onError: (err) => handleError(err, "Gagal menyiapkan sesi putaran pertama"),
  });

  const bukaSesiMutation = useMutation({
    mutationFn: (idSesi: string) => stfService.bukaSesi(idSesi),
    onSuccess: (res) => handleSuccess(res.message || "Sesi berhasil dibuka"),
    onError: (err) => handleError(err, "Gagal membuka sesi"),
  });

  interface TutupSesiResponseData {
    id_sesi: string;
    perolehan: Array<{
      id_caketang: string;
      nama: string;
      prodi: string;
      foto: string;
      jumlah_suara: number;
      peringkat: number;
      seri: boolean;
    }>;
    ada_seri: boolean;
    pesan?: string;
  }

  const tutupSesiMutation = useMutation({
    mutationFn: (idSesi: string) => stfService.tutupSesi(idSesi),
    onSuccess: (res) => {
      const data = res.data as TutupSesiResponseData | undefined;
      handleSuccess(data?.pesan || res.message || "Sesi berhasil ditutup");
    },
    onError: (err) => handleError(err, "Gagal menutup sesi"),
  });

  const siapkanSesiKadepMutation = useMutation({
    mutationFn: () => stfService.siapkanSesiKadep(),
    onSuccess: (res) =>
      handleSuccess(res.message || "Sesi Kadep berhasil disiapkan"),
    onError: (err) => handleError(err, "Gagal menyiapkan sesi kadep"),
  });

  const finalisasiMutation = useMutation({
    mutationFn: () => stfService.finalisasi(),
    onSuccess: (res) => handleSuccess(res.message || "Finalisasi berhasil"),
    onError: (err) => handleError(err, "Gagal melakukan finalisasi"),
  });

  return {
    papanData,
    isLoading,
    error: errorMsg,
    refresh: refetch,
    ubahTahap: (tahap: string) => ubahTahapMutation.mutate(tahap),
    isUbahTahapLoading: ubahTahapMutation.isPending,
    siapkanPutaranPertama: () => siapkanSesiMutation.mutate(),
    bukaSesi: (id: string) => bukaSesiMutation.mutate(id),
    tutupSesi: (id: string) => tutupSesiMutation.mutate(id),
    siapkanSesiKadep: () => siapkanSesiKadepMutation.mutate(),
    finalisasi: () => finalisasiMutation.mutate(),
  };
};
