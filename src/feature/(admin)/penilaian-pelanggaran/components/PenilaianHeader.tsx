import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Search } from "lucide-react";
import { Rangkaian, Distrik, Kelompok } from "../types";
import { SearchableSelect } from "@/shared/components/filter/SearchFilter";

interface PenilaianHeaderProps {
  rangkaianOptions: Rangkaian[];
  distrikOptions: Distrik[];
  kelompokOptions: Kelompok[];
  selectedRangkaian: string;
  onRangkaianChange: (value: string) => void;
  selectedDistrik: string;
  onDistrikChange: (value: string) => void;
  selectedKelompok: string;
  onKelompokChange: (value: string) => void;
  isEditButtonDisabled: boolean;
  onEditClick: () => void;
  isRangkaianLoading: boolean;
  isDistrikLoading: boolean;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
}

export const PenilaianHeader = ({
  rangkaianOptions,
  distrikOptions,
  kelompokOptions,
  selectedRangkaian,
  onRangkaianChange,
  selectedDistrik,
  onDistrikChange,
  selectedKelompok,
  onKelompokChange,
  isEditButtonDisabled,
  onEditClick,
  isRangkaianLoading,
  globalFilter,
  onGlobalFilterChange,
}: PenilaianHeaderProps) => {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex gap-4 flex-wrap md:flex-wrap">
        <SearchableSelect
          options={[...distrikOptions]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((distrik, index) => ({
              value: distrik.id_distrik,
              label: `${distrik.nama_distrik} - ${distrik.order ?? index + 1}`,
            }))}
          value={selectedDistrik}
          onValueChange={(value) => onDistrikChange(value ?? "")}
          placeholder="Filter Distrik"
          searchPlaceholder="Cari distrik..."
          allLabel="Semua Distrik"
        />

        <Select
          value={selectedKelompok}
          onValueChange={onKelompokChange}
          disabled={!selectedDistrik || kelompokOptions.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Kelompok" />
          </SelectTrigger>
          <SelectContent>
            {kelompokOptions.map((kelompok) => (
              <SelectItem
                key={kelompok.id_kelompok}
                value={kelompok.id_kelompok}
              >
                {kelompok.nama_kelompok}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedRangkaian}
          onValueChange={onRangkaianChange}
          disabled={isRangkaianLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Rangkaian" />
          </SelectTrigger>
          <SelectContent>
            {isRangkaianLoading ? (
              <SelectItem value="loading" disabled>
                Memuat...
              </SelectItem>
            ) : (
              rangkaianOptions.map((rangkaian) => (
                <SelectItem key={rangkaian.ID} value={rangkaian.ID}>
                  {rangkaian.Name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <div className="relative w-full max-w-sm">
          <Input
            className="pl-10"
            placeholder="Cari data Maba"
            value={globalFilter}
            onChange={(e) => onGlobalFilterChange(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary-700" />
        </div>
      </div>

      <div>
        <Button
          onClick={onEditClick}
          variant="admin"
          disabled={isEditButtonDisabled}
        >
          Edit Rekap
        </Button>
      </div>
    </div>
  );
};
