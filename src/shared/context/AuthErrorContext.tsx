"use client";

import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";
import { AxiosError } from "axios";
import { createContext, ReactNode, useRef, useEffect } from "react";
import { useToast } from "../hooks/useToast";

interface AuthErrorContextType {
  handleAuthError: (error: AuthError | AxiosError) => void;
  checkAndHandleAuthError: (
    response: ApiResponse<unknown> | AuthError,
  ) => boolean;
  handleRoleError: () => void;
}

interface AuthError extends Error {
  response?: {
    status: number;
    data?: unknown;
  };
  status?: number;
  code?: number;
}

export const AuthErrorContext = createContext<AuthErrorContextType | undefined>(
  undefined,
);

interface AuthErrorProviderProps {
  children: ReactNode;
  protectedRoutes?: string[];
}

export const AuthErrorProvider = ({
  children,
  protectedRoutes,
}: AuthErrorProviderProps) => {
  const { showToast } = useToast();

  // Anti-spam references
  const hasShownAuthToastRef = useRef(false);
  const hasShownNetworkToastRef = useRef(false);
  const hasShownRoleToastRef = useRef(false);
  const lastAuthErrorTimeRef = useRef(0);
  const lastNetworkErrorTimeRef = useRef(0);
  const lastRoleErrorTimeRef = useRef(0);
  const isRedirectingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const AUTH_ERROR_DEBOUNCE = 5000; // 5 seconds
  const NETWORK_ERROR_DEBOUNCE = 3000; // 3 seconds
  const ROLE_ERROR_DEBOUNCE = 5000; // 5 seconds

  const clearAuthSession = (): void => {
    if (typeof window !== "undefined") {
      // Clear auth_session cookie with different combinations to match the existing cookie
      const cookiesToClear = [
        // Standard combinations
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;",
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
          window.location.hostname +
          ";",
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." +
          window.location.hostname +
          ";",
        // With SameSite=Strict (matching the cookie attributes)
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict;",
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost; SameSite=Strict;",
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
          window.location.hostname +
          "; SameSite=Strict;",
        // Without path/domain
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC;",
        "auth_session=; Max-Age=0; path=/;",
        "auth_session=; Max-Age=0; path=/; domain=localhost;",
        "auth_session=; Max-Age=0; path=/; domain=" +
          window.location.hostname +
          ";",
      ];

      // Try all combinations to ensure cookie is deleted
      cookiesToClear.forEach((cookie) => {
        document.cookie = cookie;
      });

      // Also try to set empty value first, then delete
      document.cookie =
        "auth_session=; path=/; domain=" + window.location.hostname + ";";
      document.cookie = "auth_session=; path=/;";

      // Clear common auth tokens from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  };

  const isAuthError = (
    error: AuthError | AxiosError | ApiResponse<unknown>,
  ): boolean => {
    return (
      ("response" in error && error.response?.status === 401) ||
      ("status" in error && error.status === 401) ||
      ("code" in error && error.code === 401) ||
      ("message" in error &&
        error.message &&
        (error.message.includes("401") ||
          error.message.toLowerCase().includes("unauthorized"))) ||
      (typeof error === "string" && (error as string).includes("401"))
    );
  };

  const isRoleError = (
    error: AuthError | AxiosError | ApiResponse<unknown>,
  ): boolean => {
    return (
      ("response" in error && error.response?.status === 403) ||
      ("status" in error && error.status === 403) ||
      ("code" in error && error.code === 403) ||
      ("message" in error &&
        error.message &&
        (error.message.includes("403") ||
          error.message.toLowerCase().includes("forbidden") ||
          error.message.toLowerCase().includes("role"))) ||
      (typeof error === "string" && (error as string).includes("403"))
    );
  };

  const checkInternetConnection = async (): Promise<boolean> => {
    if (!navigator.onLine) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      await fetch("https://www.google.com/favicon.ico", {
        method: "HEAD",
        cache: "no-cache",
        mode: "no-cors",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return true;
    } catch {
      return false;
    }
  };

  const handleNetworkError = async (): Promise<void> => {
    const now = Date.now();

    // Prevent spam - only show network error toast if enough time has passed
    if (
      hasShownNetworkToastRef.current &&
      now - lastNetworkErrorTimeRef.current < NETWORK_ERROR_DEBOUNCE
    ) {
      return;
    }

    hasShownNetworkToastRef.current = true;
    lastNetworkErrorTimeRef.current = now;

    const hasInternet = await checkInternetConnection();

    if (!hasInternet) {
      showToast({
        type: "error",
        title: "Koneksi Internet Gagal",
        message:
          "Anda tidak terhubung ke internet. Mohon periksa koneksi Anda.",
        duration: 10000,
      });
    } else {
      showToast({
        type: "error",
        title: "Server Bermasalah",
        message:
          "Server sedang mengalami gangguan. Mohon coba beberapa saat lagi.",
        duration: 8000,
      });
    }

    // Reset network error flag after debounce period
    setTimeout(() => {
      hasShownNetworkToastRef.current = false;
    }, NETWORK_ERROR_DEBOUNCE);
  };

  const showSessionExpiredToast = (): void => {
    const now = Date.now();

    // Prevent spam - only show auth error toast if enough time has passed
    if (
      hasShownAuthToastRef.current &&
      now - lastAuthErrorTimeRef.current < AUTH_ERROR_DEBOUNCE
    ) {
      return;
    }

    // Prevent multiple redirects
    if (isRedirectingRef.current) {
      return;
    }

    hasShownAuthToastRef.current = true;
    lastAuthErrorTimeRef.current = now;
    isRedirectingRef.current = true;

    showToast({
      type: "error",
      title: "401 Unauthorized",
      message: "Sesi anda telah berakhir atau token tidak valid",
      duration: 4000,
    });

    // Clear auth cookie and localStorage
    if (typeof window !== "undefined") {
      document.cookie =
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Clear common auth tokens from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  const handleRoleError = (): void => {
    const now = Date.now();
    if (
      hasShownRoleToastRef.current &&
      now - lastRoleErrorTimeRef.current < ROLE_ERROR_DEBOUNCE
    ) {
      return;
    }

    hasShownRoleToastRef.current = true;
    lastRoleErrorTimeRef.current = now;

    showToast({
      type: "error",
      title: "Akses Ditolak",
      message: "Kamu bukan maba DSI yaa?",
      duration: 5000,
    });

    // Reset role error flag after debounce period
    setTimeout(() => {
      hasShownRoleToastRef.current = false;
    }, ROLE_ERROR_DEBOUNCE);
  };

  const handleAuthError = async (
    error: AuthError | AxiosError,
  ): Promise<void> => {
    // Handle network errors
    if (error.code === "ERR_NETWORK") {
      await handleNetworkError();
      return;
    }

    // Handle role/permission errors (403)
    if (isRoleError(error)) {
      handleRoleError();
      return;
    }

    // Handle auth errors (401)
    if (isAuthError(error)) {
      showSessionExpiredToast();
    }
  };

  const checkAndHandleAuthError = (
    response: ApiResponse<unknown> | AuthError,
  ): boolean => {
    if (isRoleError(response)) {
      handleRoleError();
      return true;
    }

    if (isAuthError(response)) {
      clearAuthSession();
      showSessionExpiredToast();
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (apiClient && typeof apiClient.setAuthErrorHandler === "function") {
      apiClient.setAuthErrorHandler(handleAuthError);
    }

    if (apiClient && apiClient.interceptors) {
      const responseInterceptor = apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error?.response?.status === 401) {
            await handleAuthError(error);
          }

          return Promise.reject(error);
        },
      );

      return () => {
        if (apiClient.interceptors?.response) {
          apiClient.interceptors.response.eject(responseInterceptor);
        }
      };
    }

    if (protectedRoutes && protectedRoutes.length > 0) {
      if (typeof apiClient.setProtectedRoutes === "function") {
        apiClient.setProtectedRoutes(protectedRoutes);
      }
    } else {
      if (typeof apiClient.disableRouteProtection === "function") {
        apiClient.disableRouteProtection();
      }
    }

    const resetFlags = () => {
      if (!isRedirectingRef.current) {
        hasShownAuthToastRef.current = false;
        hasShownNetworkToastRef.current = false;
        hasShownRoleToastRef.current = false;
        lastAuthErrorTimeRef.current = 0;
        lastNetworkErrorTimeRef.current = 0;
        lastRoleErrorTimeRef.current = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isRedirectingRef.current) {
        resetFlags();
      }
    };

    const handleOnline = () => {
      hasShownNetworkToastRef.current = false;

      if (!isRedirectingRef.current) {
        showToast({
          type: "success",
          title: "Koneksi Pulih",
          message: "Koneksi internet telah pulih",
          duration: 3000,
        });
      }
    };

    const handleOffline = () => {
      if (!isRedirectingRef.current) {
        showToast({
          type: "error",
          title: "Koneksi Terputus",
          message: "Koneksi internet terputus",
          duration: 5000,
        });
      }
    };

    const handleBeforeUnload = () => {
      hasShownAuthToastRef.current = true;
      hasShownNetworkToastRef.current = true;
      hasShownRoleToastRef.current = true;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [protectedRoutes, showToast]);

  const contextValue: AuthErrorContextType = {
    handleAuthError,
    checkAndHandleAuthError,
    handleRoleError,
  };

  return (
    <AuthErrorContext.Provider value={contextValue}>
      {children}
    </AuthErrorContext.Provider>
  );
};
