import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel, // Add this import
  ColumnDef,
} from "@tanstack/react-table";
import { penilaianService } from "@/api/services/admin/penilaian";
import { Rangkaian, Distrik, RekapPenilaianItem } from "../types";

type PenilaianTableRow = RekapPenilaianItem;

export const usePenilaianPage = () => {
  const [rangkaian, setRangkaian] = useState<{
    data: Rangkaian[];
    isLoading: boolean;
  }>({ data: [], isLoading: true });
  const [distrik, setDistrik] = useState<{
    data: Distrik[];
    isLoading: boolean;
  }>({ data: [], isLoading: true });
  const [selectedRangkaian, setSelectedRangkaian] = useState<string>("");
  const [selectedDistrik, setSelectedDistrik] = useState<string>("");
  const [selectedKelompok, setSelectedKelompok] = useState<string>("");
  const [masterRekapData, setMasterRekapData] = useState<PenilaianTableRow[]>(
    [],
  );
  const [tableData, setTableData] = useState<PenilaianTableRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNim, setSelectedNim] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<string>(""); // Add global filter state

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [rangkaianRes, distrikRes] = await Promise.all([
          penilaianService.getRangkaian(),
          penilaianService.getDistrik(),
        ]);
        setRangkaian({ data: rangkaianRes.data, isLoading: false });
        setDistrik({ data: distrikRes.data, isLoading: false });
        const praRangkaian = rangkaianRes.data.find(
          (r) => r.Name === "Pra-Rangkaian",
        );
        if (praRangkaian) {
          setSelectedRangkaian(praRangkaian.ID);
        }
      } catch (error) {
        console.error("Gagal memuat data filter:", error);
        setRangkaian({ data: [], isLoading: false });
        setDistrik({ data: [], isLoading: false });
      }
    };
    fetchInitialData();
  }, []);

  const refetchData = useCallback(async () => {
    if (!selectedRangkaian) return;
    setIsLoading(true);
    try {
      const response =
        await penilaianService.getRekapPenilaian(selectedRangkaian);
      const sortedData = (response.data || []).sort((a, b) => {
        if (b.nilai_akhir !== a.nilai_akhir)
          return b.nilai_akhir - a.nilai_akhir;
        return a.nama.localeCompare(b.nama);
      });
      setMasterRekapData(sortedData);
    } catch (error) {
      console.error("Gagal refetch data rekap:", error);
      setMasterRekapData([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedRangkaian]);

  useEffect(() => {
    refetchData();
  }, [refetchData]);

  useEffect(() => {
    if (!selectedDistrik) {
      setTableData(masterRekapData);
      return;
    }
    const filterData = async () => {
      setIsLoading(true);
      try {
        const mabaRes = await penilaianService.getMabaByFilter(
          selectedDistrik,
          selectedKelompok,
          1,
          9999,
        );
        const records = mabaRes?.data?.records ?? [];
        const filteredMabaNims = new Set(records.map((maba) => maba.nim));
        const filteredData = masterRekapData.filter((rekap) =>
          filteredMabaNims.has(rekap.nim),
        );
        setTableData(filteredData);
      } catch (error) {
        console.error("Gagal memfilter data:", error);
        setTableData([]);
      } finally {
        setIsLoading(false);
      }
    };
    filterData();
  }, [selectedDistrik, selectedKelompok, masterRekapData]);

  useEffect(() => {
    setSelectedKelompok("");
  }, [selectedDistrik]);

  const kelompok = useMemo(() => {
    if (!selectedDistrik) return [];
    const selected = distrik.data.find((d) => d.id_distrik === selectedDistrik);
    return selected?.list_kelompok ?? [];
  }, [selectedDistrik, distrik.data]);

  const columns = useMemo<ColumnDef<PenilaianTableRow>[]>(
    () => [
      {
        accessorKey: "nama",
        header: "Nama",
        enableGlobalFilter: true, // Enable global filter for this column
      },
      {
        accessorKey: "nim",
        header: "NIM",
        enableGlobalFilter: true, // Enable global filter for this column
      },
      {
        accessorKey: "pelanggaran",
        header: "Pelanggaran",
        enableGlobalFilter: true, // Enable global filter for this column
      },
      {
        accessorKey: "nilai_akhir",
        header: "Skor Akhir",
        enableGlobalFilter: true, // Enable global filter for this column
      },
      {
        accessorKey: "status",
        header: "Status",
        enableGlobalFilter: true, // Enable global filter for this column
        cell: ({ row }) => {
          const status = row.original.status;
          const formattedStatus = status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

          return formattedStatus;
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    enableMultiRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Add filtered row model
    enableRowSelection: true,
    enableGlobalFilter: true, // Enable global filtering
    globalFilterFn: "includesString", // Set global filter function
    state: {
      globalFilter, // Include global filter in state
    },
    onGlobalFilterChange: setGlobalFilter, // Handle global filter changes
  });

  const isEditButtonDisabled = table.getSelectedRowModel().rows.length !== 1;
  const handleEditClick = () => {
    if (isEditButtonDisabled) return;
    const nim = table.getSelectedRowModel().rows[0].original.nim;
    setSelectedNim(nim);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNim(null);
    table.resetRowSelection();
  };

  return {
    rangkaian,
    distrik,
    kelompok,
    selectedRangkaian,
    setSelectedRangkaian,
    selectedDistrik,
    setSelectedDistrik,
    selectedKelompok,
    setSelectedKelompok,
    table,
    isLoading,
    isEditButtonDisabled,
    isModalOpen,
    selectedNim,
    handleEditClick,
    handleCloseModal,
    refetchData,
    globalFilter,
    setGlobalFilter,
  };
};
