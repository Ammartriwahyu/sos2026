import { SelectOption, selectService } from "@/api/services/select/select";
import { distrikService } from "@/api/services/admin/distrik";
import { useEffect, useState } from "react";

// Hook ini sekarang menerima 'type' sebagai argumen
export const useSelectOptions = (
  type: "kelompok" | "distrik" | "mahasiswa" | "rangkaian",
) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keluar jika tipe tidak valid untuk mencegah panggilan API yang tidak perlu
    if (!type) {
      setIsLoading(false);
      return;
    }

    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        if (type === "distrik") {
          // Untuk distrik, fetch dari endpoint admin agar dapat field `order`
          // sehingga label bisa ditampilkan sebagai "NamaDistrik - order"
          const response = await distrikService.getAllDistricts();
          if (response?.data) {
            const sorted = [...response.data].sort(
              (a, b) => (a.order ?? 0) - (b.order ?? 0),
            );
            const transformed: SelectOption[] = sorted.map(
              (distrik, index) => ({
                value: distrik.id_distrik,
                label: `${distrik.order ?? index + 1} - ${distrik.nama_distrik}`,
              }),
            );
            setOptions(transformed);
          }
        } else {
          const response = await selectService.getOptions(type);
          setOptions(response.data);
        }
      } catch (error) {
        console.error(`Gagal mengambil data ${type}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [type]); // Tambahkan `type` ke dependency array agar hook berjalan ulang jika tipe berubah

  // Kembalikan nama properti yang lebih generik
  return { options, isLoading };
};
