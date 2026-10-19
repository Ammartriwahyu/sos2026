import { useQuery } from "@tanstack/react-query";
import {
  stfService,
  PapanHasilData,
  BackendResponse,
} from "@/api/services/user/stf";

export const useGetPapanHasil = () => {
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery<BackendResponse<PapanHasilData>, Error>({
    queryKey: ["stfPapanHasil"],
    queryFn: () => stfService.getPapanHasil(),
    refetchInterval: 10000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000,
    retry: 1,
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
