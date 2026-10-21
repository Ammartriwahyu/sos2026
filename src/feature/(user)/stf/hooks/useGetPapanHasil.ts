import { useQuery } from "@tanstack/react-query";
import {
  stfService,
  PapanHasilData,
  BackendResponse,
} from "@/api/services/user/stf";
import axios from "axios";

export const useGetPapanHasil = (enabled = true) => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery<BackendResponse<PapanHasilData>, Error>({
    queryKey: ["stfPapanHasil"],
    queryFn: ({ signal }) => stfService.getPapanHasil(signal),
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
      return 10000;
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000,
    retry: (failureCount, err) => {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status && status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 1;
    },
    enabled,
  });

  const papanHasil = response?.status_code === 200 ? response.data : null;
  const errorMsg = error
    ? error.message
    : response && response.status_code !== 200
      ? response.message
      : null;

  return {
    papanHasil,
    isLoading,
    error: errorMsg,
    refresh: refetch,
  };
};
