import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type BlobResponse = AxiosResponse<Blob>;

interface AuthError extends Error {
  response?: {
    status: number;
    data?: unknown;
  };
  status?: number;
  code?: number;
}

type AuthErrorHandler = (error: AuthError | AxiosError) => void;

class ApiCore {
  private client: AxiosInstance;
  private static instance: ApiCore;
  private authErrorHandler: AuthErrorHandler | null = null;
  private protectedRoutes: string[] = [];
  private isRouteProtectionEnabled = false;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 400000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }

  public static getInstance(): ApiCore {
    if (!ApiCore.instance) {
      ApiCore.instance = new ApiCore();
    }
    return ApiCore.instance;
  }

  public setProtectedRoutes(routes: string[]): void {
    this.protectedRoutes = routes;
    this.isRouteProtectionEnabled = true;
  }

  public disableRouteProtection(): void {
    this.isRouteProtectionEnabled = false;
  }

  private isCurrentRouteProtected(): boolean {
    if (!this.isRouteProtectionEnabled) return true;

    if (typeof window === "undefined") return false;

    const currentPath = window.location.pathname;

    return this.protectedRoutes.some((route) => {
      if (route.endsWith("/*")) {
        const basePath = route.slice(0, -2);
        return (
          currentPath !== basePath && currentPath.startsWith(basePath + "/")
        );
      }
      return currentPath === route;
    });
  }

  public setAuthErrorHandler(handler: AuthErrorHandler): void {
    this.authErrorHandler = handler;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        if (config.data instanceof FormData) {
          delete config.headers["Content-Type"];
        }

        if (typeof window !== "undefined") {
          const getCookie = (name: string): string | undefined => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
          };

          const token = getCookie("auth_session");

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        if (error.code === "ERR_NETWORK") {
          if (this.authErrorHandler) {
            await this.authErrorHandler(error);
          }
        }

        if (error.response?.status === 401) {
          if (this.authErrorHandler) {
            await this.authErrorHandler(error);
          }
        }

        if (error.response?.status === 403) {
          if (this.authErrorHandler) {
            await this.authErrorHandler(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      if (
        (error as AxiosError).response?.status === 401 ||
        (error as AxiosError).response?.status === 403
      ) {
        throw error;
      }
      throw error;
    }
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<ApiResponse<T>>(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getBlob(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Blob>> {
    try {
      return await this.client.get<Blob>(url, {
        ...config,
        responseType: "blob",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ...config?.headers,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public get interceptors() {
    return this.client.interceptors;
  }
}

export const apiClient = ApiCore.getInstance();
