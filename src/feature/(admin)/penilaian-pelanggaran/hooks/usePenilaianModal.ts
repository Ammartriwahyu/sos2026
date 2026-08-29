import { useState, useEffect, useCallback, useContext } from "react";
import { penilaianService } from "@/api/services/admin/penilaian";
import { DetailPenilaianMaba, PelanggaranItem } from "../types";
import { ToastContext } from "@/shared/context/ToastContext";

export type PelanggaranUI = PelanggaranItem & {
  id: string | number;
  isNew?: boolean;
};

type PelanggaranFromAPI = PelanggaranItem & { id_pelanggaran: string };

export const usePenilaianModal = (
  nim: string | null,
  rangkaianId: string,
  isOpen: boolean,
) => {
  const toastContext = useContext(ToastContext);
  const [detailMaba, setDetailMaba] = useState<DetailPenilaianMaba | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const [keaktifan, setKeaktifan] = useState<string>("");
  const [adaKeaktifan, setAdaKeaktifan] = useState(false);
  const [pelanggaranList, setPelanggaranList] = useState<PelanggaranUI[]>([]);

  useEffect(() => {
    if (isOpen && nim && rangkaianId) {
      const fetchDetail = async () => {
        setIsLoading(true);
        try {
          const response = await penilaianService.getDetailPenilaianMaba(
            nim,
            rangkaianId,
          );
          setDetailMaba(response);
          const nilaiKeaktifan = response.keaktifan;
          const punyaKeaktifan =
            typeof nilaiKeaktifan === "number" && nilaiKeaktifan > 0;
          setAdaKeaktifan(punyaKeaktifan);
          setKeaktifan(punyaKeaktifan ? String(nilaiKeaktifan) : "");
          const pelanggaranFromAPI =
            response.pelanggaran?.map(
              (p: PelanggaranFromAPI, index: number) => ({
                id: p.id_pelanggaran || `api-item-${index}`,
                nama: p.nama,
                kategori: p.kategori,
                isNew: false,
              }),
            ) || [];
          setPelanggaranList(pelanggaranFromAPI);
        } catch (error) {
          console.error("Gagal memuat detail mahasiswa:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetail();
    }
  }, [isOpen, nim, rangkaianId]);

  const handleSubmit = useCallback(
    async (onSuccess: () => void) => {
      if (!nim || !rangkaianId || !toastContext || !detailMaba) return;

      try {
        const promises = [];
        const angkaKeaktifan = adaKeaktifan ? Number(keaktifan || 0) : 0;
        const keaktifanChanged = detailMaba.keaktifan !== angkaKeaktifan;

        const originalPelanggaran =
          detailMaba.pelanggaran?.map(({ nama, kategori }) => ({
            nama,
            kategori,
          })) || [];
        const currentPelanggaran = pelanggaranList.map(
          ({ nama, kategori }) => ({ nama, kategori }),
        );
        const pelanggaranChanged =
          JSON.stringify(originalPelanggaran) !==
          JSON.stringify(currentPelanggaran);

        if (keaktifanChanged) {
          promises.push(
            penilaianService.postKeaktifan(nim, rangkaianId, {
              keaktifan: angkaKeaktifan,
            }),
          );
        }

        if (pelanggaranChanged) {
          promises.push(
            penilaianService.postPelanggaran({
              nim,
              rangkaian_id: rangkaianId,
              pelanggaran: currentPelanggaran,
            }),
          );
        }

        if (promises.length === 0) {
          toastContext.showToast({
            type: "info",
            title: "Info",
            message: "Tidak ada perubahan untuk disimpan.",
          });
          onSuccess();
          return;
        }

        await Promise.all(promises);

        toastContext.showToast({
          type: "success",
          title: "Sukses!",
          message: `Data penilaian berhasil diperbarui.`,
        });
        onSuccess();
      } catch (error) {
        console.error(
          "Gagal menyimpan perubahan (tapi data sudah sukses terhapus di db):",
          error,
        );
        toastContext.showToast({
          type: "error",
          title: "Gagal Menyimpan",
          message: "Terjadi kesalahan saat menyimpan data.",
        });
      }
    },
    [
      nim,
      rangkaianId,
      keaktifan,
      adaKeaktifan,
      pelanggaranList,
      toastContext,
      detailMaba,
    ],
  );

  return {
    isLoading,
    detailMaba,
    keaktifan,
    setKeaktifan,
    adaKeaktifan,
    setAdaKeaktifan,
    pelanggaranList,
    setPelanggaranList,
    handleSubmit,
  };
};
