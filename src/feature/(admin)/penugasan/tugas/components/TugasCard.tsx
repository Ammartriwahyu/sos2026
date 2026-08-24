import { TugasSummary } from "@/api/services/admin/tugas";
import { Ellipsis } from "lucide-react";
import React from "react";
interface TugasCardProps {
  tugas: TugasSummary;
  idx: number;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const TugasCard: React.FC<TugasCardProps> = ({ tugas, idx }) => {
  return (
    <div className="bg-admin-card hover:cursor-pointer  flex justify-between items-center rounded-lg p-4">
      <div className="text-2xl  items-center text-default-dark flex gap-2">
        <span className="font-medium">Tugas {idx}</span>
        <span>:</span>
        <span className="text-xl">({tugas.judul})</span>
      </div>
      <div>
        <Ellipsis className="rotate-90" />
      </div>
    </div>
  );
};
