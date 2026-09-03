import { useState, useEffect, useRef } from "react"; // 1. Impor useRef
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import axios from "axios";
import { authService } from "@/api/services/auth";
import { useToast } from "@/shared/hooks/useToast";
import { useAuthContext } from "@/shared/hooks/useAuthContext";

export function useLoginForm() {
  const [emailornim, setEmailornim] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { showToast } = useToast();
  const { refetch } = useAuthContext();

  const processedErrorRef = useRef<string | null>(null);

  useEffect(() => {
    const errorType = searchParams.get("error");

    if (!errorType || processedErrorRef.current === errorType) {
      return;
    }

    if (errorType === "bukan_maba_lu") {
      showToast({
        type: "error",
        title: "Akses Ditolak",
        message: "Kamu bukan maba DSI yaa?",
        duration: 8000,
      });
    } else if (errorType === "unauthorized") {
      showToast({
        type: "warning",
        title: "Sesi Dibutuhkan",
        message: "Anda harus login untuk mengakses halaman tersebut.",
        duration: 5000,
      });
    }

    processedErrorRef.current = errorType;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("error");
    const newUrl = newSearchParams.toString()
      ? `${pathname}?${newSearchParams.toString()}`
      : pathname;

    router.replace(newUrl, { scroll: false });
  }, [searchParams, router, pathname, showToast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ emailornim, password });

      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Login berhasil! Selamat datang kembali.",
      });

      const tujuan = searchParams.get("redirect");
      const tujuanAman =
        tujuan && tujuan.startsWith("/") && !tujuan.startsWith("//");
      const redirectUrl = response.redirectUrl;
      await refetch();
      if (tujuanAman && tujuan) {
        router.push(tujuan);
      } else if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      let message = "Terjadi Keselahan, Coba Lagi Nanti";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }

      setError(message);

      showToast({
        type: "error",
        title: "Login Gagal!",
        message: message,
        duration: 10000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    emailornim,
    setEmailornim,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  };
}
