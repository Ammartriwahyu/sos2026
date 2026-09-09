import { useState, useCallback } from "react";
import { stfService, BackendResponse } from "@/api/services/user/stf";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const useVoteForCaketang = () => {
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [voteSuccess, setVoteSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const vote = useCallback(
    async (id: string) => {
      setIsVoting(true);
      setVoteError(null);
      setVoteSuccess(false);
      try {
        const response: BackendResponse<null> =
          await stfService.voteForCaketang(id);
        if (response.status_code === 200) {
          setVoteSuccess(true);
          queryClient.invalidateQueries({ queryKey: ["stfData"] });
        } else {
          setVoteError(response.message || "Failed to submit vote.");
        }
      } catch (err: unknown) {
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.data.message
        ) {
          setVoteError(err.response.data.message);
        } else {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat melakukan voting.";
          setVoteError(errorMessage);
        }
      } finally {
        setIsVoting(false);
      }
    },
    [queryClient],
  );

  return {
    vote,
    isVoting,
    voteError,
    voteSuccess,
  };
};
