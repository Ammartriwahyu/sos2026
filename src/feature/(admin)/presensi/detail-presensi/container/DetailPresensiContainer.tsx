"use client";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import DateTimeDisplay from "../components/DateTimeDisplay";
import { Button } from "@/shared/components/ui/Button";
import { usePresensiDetailPage } from "../../hooks/usePresensiDetailPage";
import {
  PresensiMahasiswaDetail,
  PresensiMahasiswaSummary,
} from "@/api/services/admin/presensi";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  getFilteredRowModel,
  PaginationState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { distrikService } from "@/api/services/admin/distrik";
import { Distrik } from "@/feature/(admin)/distrik/type";
import PresensiTable from "../components/PresensiTable";
import PetaKoordinat from "../components/PetaKoordinat";
import { Modal } from "@/shared/components/ui/Modal";
import PresensiForm from "../../components/PresensiForm";
import PresensiMahasiswaForm from "../components/PresensiMahasiswaForm";
import { useRole } from "@/shared/hooks/useRole";
import { Edit3Icon } from "lucide-react";

interface DetailPresensiContainerProps {
  id: string;
}

const DetailPresensiContainer: React.FC<DetailPresensiContainerProps> = ({
  id,
}) => {
  const router = useRouter();
  const { isSqc } = useRole();

  const [selectedDistrik, setSelectedDistrik] = useState<string | null>(null);
  const [selectedKelompok, setSelectedKelompok] = useState<string | null>(null);
  const [uiSearchText, setUiSearchText] = useState<string>("");

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [distrikList, setDistrikList] = useState<Distrik[]>([]);
  const [filterNimSet, setFilterNimSet] = useState<Set<string> | null>(null);

  useEffect(() => {
    distrikService
      .getAllDistricts()
      .then((res) => setDistrikList(res.data ?? []))
      .catch((err) => {
        console.error("Gagal memuat distrik:", err);
        setDistrikList([]);
      });
  }, []);

  const distrikOptions = useMemo(
    () =>
      distrikList.map((d) => ({ value: d.id_distrik, label: d.nama_distrik })),
    [distrikList],
  );

  const kelompokOptions = useMemo(() => {
    const distrik = distrikList.find((d) => d.id_distrik === selectedDistrik);
    return (distrik?.list_kelompok ?? []).map((k) => ({
      value: k.id_kelompok,
      label: k.nama_kelompok,
    }));
  }, [distrikList, selectedDistrik]);

  useEffect(() => {
    setSelectedKelompok(null);
  }, [selectedDistrik]);

  useEffect(() => {
    if (!selectedDistrik) {
      setFilterNimSet(null);
      return;
    }
    let aktif = true;
    distrikService
      .getAnggotaByDistrictId(selectedDistrik, {
        page: 1,
        limit: 9999,
        id_kelompok: selectedKelompok ?? undefined,
      })
      .then((res) => {
        if (!aktif) return;
        const records = res.data?.records ?? [];
        setFilterNimSet(new Set(records.map((maba) => maba.nim)));
      })
      .catch((err) => {
        if (!aktif) return;
        console.error("Gagal memuat anggota distrik:", err);
        setFilterNimSet(new Set());
      });
    return () => {
      aktif = false;
    };
  }, [selectedDistrik, selectedKelompok]);

  useEffect(() => {
    setPaginationState((prev) =>
      prev.pageIndex === 0 ? prev : { ...prev, pageIndex: 0 },
    );
  }, [uiSearchText, selectedDistrik, selectedKelompok]);

  const [selectedMahasiswa, setSelectedMahasiswa] =
    useState<PresensiMahasiswaSummary>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalMahasiswaOpen, setIsModalMahasiswaOpen] = React.useState(false);

  const handleSelectedMahasiswa = React.useCallback(
    (e: PresensiMahasiswaSummary) => {
      setSelectedMahasiswa(e);
      setIsModalMahasiswaOpen(true);
    },
    [],
  );

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    refreshInfo();
  };

  const HandleUpdateSuccess = () => {
    setIsModalMahasiswaOpen(false);
    refreshList();
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalMahasiswa = () => {
    setIsModalMahasiswaOpen(!isModalMahasiswaOpen);
  };

  const {
    presensiInfo,
    mahasiswaList,
    isLoadingInfo,
    isLoadingList,
    errorInfo,
    errorList,
    refreshInfo,
    refreshList,
  } = usePresensiDetailPage(id);

  const filteredList = useMemo(() => {
    const list = mahasiswaList ?? [];
    if (!filterNimSet) return list;
    return list.filter((m) => filterNimSet.has(m.nim));
  }, [mahasiswaList, filterNimSet]);

  const columns: ColumnDef<PresensiMahasiswaDetail>[] = useMemo(() => {
    const baseColumns: ColumnDef<PresensiMahasiswaDetail>[] = [
      {
        accessorKey: "index",
        header: "No.",
        cell: ({ row, table }) => {
          const { pageIndex, pageSize } = table.getState().pagination;
          return pageIndex * pageSize + row.index + 1;
        },
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "nim",
        header: "NIM",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "nama",
        header: "Nama",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "presensi_at",
        header: "Waktu Presensi",
        cell: ({ getValue }) => {
          const timestamp = getValue() as string;
          return timestamp && timestamp !== "0001-01-01T00:00:00Z"
            ? new Date(timestamp).toLocaleString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "-";
        },
      },
    ];

    if (isSqc) {
      const actionColumn: ColumnDef<PresensiMahasiswaDetail> = {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={() => {
              const summary: PresensiMahasiswaSummary = {
                nama: row.original.nama,
                nim: row.original.nim,
                status: row.original.status as "hadir" | "izin" | "tidak-hadir",
              };
              handleSelectedMahasiswa(summary);
            }}
            className="p-2 rounded-full hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-2 transition-colors"
            aria-label="Edit Data"
            title="Edit Data"
          >
            <Edit3Icon className="text-orange-500 h-5 w-5" />
          </button>
        ),
        enableSorting: false,
        size: 80,
      };
      baseColumns.push(actionColumn);
    }

    return baseColumns;
  }, [isSqc, handleSelectedMahasiswa]);

  const table = useReactTable({
    data: filteredList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    state: {
      pagination: paginationState,
      globalFilter: uiSearchText,
    },
    onPaginationChange: (updater) => {
      const newPaginationState =
        typeof updater === "function" ? updater(paginationState) : updater;
      setPaginationState(newPaginationState);
    },
    onGlobalFilterChange: (updater) => {
      const newGlobalFilter =
        typeof updater === "function" ? updater(uiSearchText) : updater;
      setUiSearchText(newGlobalFilter as string);
    },
  });

  const formatDateTimeForDisplay = (
    isoString: string | undefined,
  ): { date: string; time: string } => {
    if (!isoString) return { date: "N/A", time: "N/A" };
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime()))
        return { date: "Invalid Date", time: "Invalid Time" };

      const formattedDate = date
        .toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");
      const formattedTime = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return { date: formattedDate, time: formattedTime };
    } catch (e) {
      console.error("Error formatting date-time:", isoString, e);
      return { date: "Error", time: "Error" };
    }
  };

  if (isLoadingInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Loading presensi details...</p>
      </div>
    );
  }

  if (errorInfo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-10 bg-white rounded-xl shadow-lg">
        <p className="text-red-500 text-xl mb-4">Error: {errorInfo}</p>
        <Button onClick={refreshInfo} className="mt-4 px-6 py-3">
          Coba Lagi
        </Button>
      </div>
    );
  }

  if (!presensiInfo) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-500 text-lg">
          Detail presensi tidak ditemukan.
        </p>
        <Button onClick={refreshInfo} className="mt-4">
          Refresh
        </Button>
      </div>
    );
  }

  const { kode, rangkaian_nama, sesi, start_at, end_at, status } = presensiInfo;

  const { date: startDate, time: startTime } =
    formatDateTimeForDisplay(start_at);
  const { date: endDate, time: endTime } = formatDateTimeForDisplay(end_at);

  return (
    <main className="flex flex-col gap-y-16 p-8 md:p-16 lg:p-20 bg-white rounded-xl shadow-lg min-h-screen">
      <div className="flex flex-col gap-y-11">
        <button
          className="flex items-center gap-2 text-primary-normal hover:text-primary-normal-hover transition-colors"
          onClick={() => router.back()}
          type="button"
        >
          <ChevronLeft /> Kembali
        </button>
        <div className="flex flex-col gap-y-9">
          <div className="flex flex-col text-default-dark gap-y-4">
            <h4 className="text-4xl font-normal">{kode || "N/A"}</h4>
            <p className="text-lg">
              {rangkaian_nama || "N/A"} (Sesi: {sesi || "N/A"}) -{" "}
              <span
                className={`${
                  status === "aktif" ? "text-green-600" : "text-red-600"
                } font-semibold`}
              >
                {status?.charAt(0).toUpperCase() + status?.slice(1) || "N/A"}
              </span>
            </p>
          </div>
          <div className="text-default-dark flex flex-col md:flex-row gap-8 md:gap-x-12 items-start md:items-center">
            <div className="flex flex-col gap-y-2">
              <h6 className="text-lg font-semibold">Mulai Rangkaian</h6>
              <div className="flex items-center gap-x-4">
                <DateTimeDisplay variant="date" value={startDate} />
                <div className="w-[1px] h-6 bg-default-dark hidden md:block"></div>{" "}
                <DateTimeDisplay variant="clock" value={startTime} />
              </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <h6 className="text-lg font-semibold">Berakhir Rangkaian</h6>{" "}
              <div className="flex items-center gap-x-4">
                <DateTimeDisplay variant="date" value={endDate} />
                <div className="w-[1px] h-6 bg-default-dark hidden md:block"></div>{" "}
                <DateTimeDisplay variant="clock" value={endTime} />
              </div>
            </div>
          </div>
          {isSqc && (
            <Button variant="admin" onClick={handleModal} className="w-fit">
              Edit Presensi
            </Button>
          )}
        </div>
      </div>
      <div className="w-full h-[1px] bg-surface-divider"></div>
      <PetaKoordinat mahasiswaList={filteredList} isLoading={isLoadingList} />
      <PresensiTable
        table={table}
        isSubmissionLoading={isLoadingList}
        statusError={errorList}
        refresh={refreshList}
        selectedDistrik={selectedDistrik}
        onDistrikChange={setSelectedDistrik}
        selectedKelompok={selectedKelompok}
        onKelompokChange={setSelectedKelompok}
        distrikOptions={distrikOptions}
        kelompokOptions={kelompokOptions}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModal}
        title="Edit Kode Presensi"
        desc="Isi form di bawah ini untuk edit  kode presensi "
      >
        <PresensiForm
          onSuccess={handleCreateSuccess}
          initialData={presensiInfo}
        />
      </Modal>
      <Modal
        isOpen={isModalMahasiswaOpen}
        onClose={handleModalMahasiswa}
        title="Edit Kode Presensi"
        desc="Isi form di bawah ini untuk edit  kode presensi "
      >
        <PresensiMahasiswaForm
          onSuccess={HandleUpdateSuccess}
          initialData={selectedMahasiswa}
          presensi_id={presensiInfo.presensi_id}
        />
      </Modal>
    </main>
  );
};

export default DetailPresensiContainer;
