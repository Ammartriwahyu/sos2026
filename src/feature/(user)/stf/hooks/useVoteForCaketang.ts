import { useState, useCallback } from "react";
import { stfService, BackendResponse } from "@/api/services/user/stf";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useVoteForCaketang = () => {
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteSuccess, setVoteSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const vote = useCallback(
    async (id: string) => {
      setIsVoting(true);
      setVoteSuccess(false);
      try {
        const response: BackendResponse<null> =
          await stfService.voteForCaketang(id);
        if (response.status_code === 200) {
          setVoteSuccess(true);
          toast.success("Pilihan berhasil disimpan!");
          queryClient.invalidateQueries({ queryKey: ["stfData"] });
          return true;
        } else {
          toast.error(response.message || "Gagal menyimpan pilihan.");
          return false;
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          const status = err.response.status;

          if (status === 400 || status === 409) {
            toast.error(
              "Status pemilihan telah berubah, menyinkronkan data...",
            );
            queryClient.invalidateQueries({ queryKey: ["stfData"] });
          } else if (status === 403) {
            toast.error("Anda tidak memiliki hak suara.");
            queryClient.invalidateQueries({ queryKey: ["stfData"] });
          } else if (status === 429) {
            toast.error(
              "Terlalu banyak permintaan. Silakan tunggu beberapa saat.",
            );
          } else {
            toast.error(
              err.response.data?.message || "Terjadi kesalahan pada server.",
            );
          }
        } else {
          toast.error("Terjadi kesalahan saat melakukan voting.");
        }
        return false;
      } finally {
        setIsVoting(false);
      }
    },
    [queryClient],
  );

  return {
    vote,
    isVoting,
    voteSuccess,
  };
};
