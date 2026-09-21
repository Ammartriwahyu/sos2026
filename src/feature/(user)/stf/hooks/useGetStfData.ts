import { useQuery } from "@tanstack/react-query";
import { stfService, StfData, BackendResponse } from "@/api/services/user/stf";

export const useGetStfData = () => {
  const hasAuthCookie =
    typeof document !== "undefined" && document.cookie.includes("auth_session");

  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useQuery<BackendResponse<StfData>, Error>({
    queryKey: ["stfData"],
    queryFn: () => stfService.getStfData(),
    refetchInterval: 5000,
    enabled: hasAuthCookie,
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
