import { useQuery } from "@tanstack/react-query";
import { stfService, StfData, BackendResponse } from "@/api/services/user/stf";
import axios from "axios";
export interface UseGetStfDataOptions {
  enabled?: boolean;
}

export const useGetStfData = (options?: UseGetStfDataOptions) => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery<BackendResponse<StfData>, Error>({
    queryKey: ["stfData"],
    queryFn: ({ signal }) => stfService.getStfData(signal),
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
      const data =
        query.state.data?.status_code === 200 ? query.state.data.data : null;
      if (data) {
        if (data.tahap === "hasil") {
          return false;
        }
        if (data.tahap === "tertutup") {
          return 25000 + Math.floor(Math.random() * 5000);
        }
        if (data.tahap === "voting" && data.sudah_memilih) {
          return 20000 + Math.floor(Math.random() * 4000);
        }
      }
      return 10000 + Math.floor(Math.random() * 3000);
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
    enabled: options?.enabled ?? true,
  });

  const stfData = response?.status_code === 200 ? response.data : null;
  const errorMsg = error
    ? error.message
    : response && response.status_code !== 200
      ? response.message
      : null;

  return {
    stfData,
    isLoading,
    error: errorMsg,
    refresh: refetch,
  };
};
