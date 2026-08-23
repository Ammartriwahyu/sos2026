"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { AuthProfile, authService } from "@/api/services/auth";

interface AuthContextType {
  user: AuthProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const CACHE_DURATION = 5 * 60 * 1000;
const MIN_REFETCH_INTERVAL = 2000;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getAuthCookie = (): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; auth_session=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const stateRef = useRef<{
    authPromise: Promise<AuthProfile | null> | null;
    authCache: { data: AuthProfile | null; timestamp: number } | null;
    lastRefetchTime: number;
    requestInProgress: boolean;
  }>({
    authPromise: null,
    authCache: null,
    lastRefetchTime: 0,
    requestInProgress: false,
  });

  const mountedRef = useRef(true);
  const pathname = usePathname();

  const fetchCurrentUser = useCallback(
    async (forceRefresh = false): Promise<void> => {
      const token = getAuthCookie();
      if (!token) {
        if (mountedRef.current) {
          setUser(null);
          setIsLoading(false);
        }
        stateRef.current.authCache = { data: null, timestamp: Date.now() };
        return;
      }
      if (
        !mountedRef.current ||
        (stateRef.current.requestInProgress && !forceRefresh)
      ) {
        return;
      }

      const now = Date.now();
      if (
        !forceRefresh &&
        now - stateRef.current.lastRefetchTime < MIN_REFETCH_INTERVAL
      ) {
        return;
      }

      const { authCache } = stateRef.current;
      if (
        !forceRefresh &&
        authCache &&
        now - authCache.timestamp < CACHE_DURATION
      ) {
        setUser(authCache.data);
        setIsLoading(false);
        return;
      }

      if (stateRef.current.authPromise && !forceRefresh) {
        try {
          const result = await stateRef.current.authPromise;
          if (mountedRef.current) setUser(result);
        } catch {
          if (mountedRef.current) setUser(null);
        } finally {
          if (mountedRef.current) setIsLoading(false);
        }
        return;
      }

      stateRef.current.requestInProgress = true;
      stateRef.current.lastRefetchTime = now;

      const fetchPromise = (async (): Promise<AuthProfile | null> => {
        let attempts = 0;
        while (attempts < MAX_RETRY_ATTEMPTS) {
          try {
            const response = await authService.getMe();
            const userData: AuthProfile = response?.data;
            stateRef.current.authCache = {
              data: userData,
              timestamp: Date.now(),
            };
            return userData;
          } catch {
            attempts++;
            if (attempts >= MAX_RETRY_ATTEMPTS) {
              stateRef.current.authCache = {
                data: null,
                timestamp: Date.now(),
              };
              return null;
            }
            await delay(RETRY_DELAY * attempts);
          }
        }
        return null;
      })();

      stateRef.current.authPromise = fetchPromise;

      try {
        const result = await fetchPromise;
        if (mountedRef.current) {
          setUser(result);
        }
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
        stateRef.current.authPromise = null;
        stateRef.current.requestInProgress = false;
      }
    },
    [],
  );

  useEffect(() => {
    mountedRef.current = true;
    const publicPaths = ["/login", "/register"];

    const isPublic = publicPaths.some(
      (path) =>
        pathname === path || (path !== "/" && pathname.startsWith(path + "/")),
    );

    if (isPublic) {
      setIsLoading(false);
      setUser(null);
      return;
    }

    fetchCurrentUser();

    return () => {
      mountedRef.current = false;
    };
  }, [pathname, fetchCurrentUser]);

  const refetch = useCallback(async (): Promise<void> => {
    if (!mountedRef.current) return;

    setIsLoading(true);
    stateRef.current.authCache = null;
    stateRef.current.authPromise = null;

    await fetchCurrentUser(true);
  }, [fetchCurrentUser]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    refetch,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
