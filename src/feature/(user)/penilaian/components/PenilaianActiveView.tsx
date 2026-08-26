import { DetailNilaiRangkaian } from "../types";
import { Rangkaian } from "@/feature/(user)/penugasan/types";
import { RangkaianTabs } from "./RangkaianTabs";
import { TabelDetailPenilaian } from "./TabelDetailPenilaian";
import { TabelDetailPelanggaran } from "./TabelDetailPelanggaran";
import { SkorAkhirDisplay } from "./SkorAkhirDisplay";
import { Loader2 } from "lucide-react";

interface PenilaianActiveViewProps {
  rangkaianList: Rangkaian[];
  activeRangkaianId: string | null;
  onRangkaianChange: (id: string) => void;
  detailNilai: DetailNilaiRangkaian | null;
  isLoading: boolean;
  activeRangkaianName: string | null;
}

export const PenilaianActiveView = ({
  rangkaianList,
  activeRangkaianId,
  onRangkaianChange,
  detailNilai,
  isLoading,
  activeRangkaianName,
}: PenilaianActiveViewProps) => {
  return (
    <div className="py-8 px-4 md:px-32">
      <RangkaianTabs
        rangkaianList={rangkaianList}
        activeRangkaianId={activeRangkaianId}
        onRangkaianChange={onRangkaianChange}
      />

      {/* Mengubah jarak vertikal antar section menjadi 40px (space-y-[40px]) */}
      <div className="mt-12 space-y-[40px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="w-16 h-16 animate-spin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        ) : (
          <>
            <TabelDetailPenilaian
              penilaian={detailNilai?.penilaian ?? []}
              keaktifan={detailNilai?.keaktifan ?? 0}
              activeRangkaianName={activeRangkaianName}
            />
            <TabelDetailPelanggaran
              pelanggaran={detailNilai?.pelanggaran ?? []}
            />
            <SkorAkhirDisplay
              skor={detailNilai?.skor_akhir ?? 0}
              status={detailNilai?.status ?? "Belum Dinilai"}
            />
          </>
        )}
      </div>
    </div>
  );
};