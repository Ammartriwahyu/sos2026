import { PelanggaranItem } from "../types";
import { useMemo } from "react";

interface TabelDetailPelanggaranProps {
  pelanggaran: PelanggaranItem[];
}

export const TabelDetailPelanggaran = ({
  pelanggaran,
}: TabelDetailPelanggaranProps) => {
  const totalPoin = useMemo(() => {
    return pelanggaran.reduce((sum, item) => sum + item.nilai, 0);
  }, [pelanggaran]);

  // Styling baris data menggunakan warna FAFAFA dengan transparansi 20%
  const rowGlassStyle = {
    background:
      "linear-gradient(135deg, rgba(250, 250, 250, 0.2) 0%, rgba(250, 250, 250, 0.1) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow:
      "0 12px 40px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
  };

  const headerGlassStyle = {
    background:
      "linear-gradient(135deg, rgba(42, 31, 92, 0.5) 0%, rgba(42, 31, 92, 0.25) 100%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow:
      "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center md:text-left">
        Detail Pelanggaran
      </h2>

      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[700px] w-full">
          <table
            className="w-full border-separate"
            style={{ borderSpacing: "0.75rem 0.75rem" }}
          >
            <thead>
              <tr className="text-base md:text-lg">
                <th
                  className="px-4 w-16 h-[48px] text-center font-bold text-white rounded-tl-xl"
                  style={headerGlassStyle}
                >
                  No
                </th>
                <th
                  className="px-6 h-[48px] text-left font-bold text-white"
                  style={headerGlassStyle}
                >
                  Nama Pelanggaran
                </th>
                <th
                  className="px-6 w-28 h-[48px] text-left font-bold text-white"
                  style={headerGlassStyle}
                >
                  Poin
                </th>
                <th
                  className="px-6 h-[48px] text-left font-bold text-white rounded-tr-xl"
                  style={headerGlassStyle}
                >
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="text-base md:text-lg text-white">
              {pelanggaran.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 h-[48px] text-center text-white/70 italic rounded-2xl font-normal"
                    style={rowGlassStyle}
                  >
                    Tidak ada data pelanggaran
                  </td>
                </tr>
              ) : (
                pelanggaran.map((item, index) => (
                  <tr key={item.nama}>
                    <td
                      className="px-4 h-[48px] text-center font-normal"
                      style={rowGlassStyle}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="px-6 h-[48px] font-normal"
                      style={rowGlassStyle}
                    >
                      {item.nama}
                    </td>
                    <td
                      className="px-6 h-[48px] font-normal"
                      style={rowGlassStyle}
                    >
                      {item.nilai}
                    </td>
                    <td
                      className="px-6 h-[48px] font-normal capitalize"
                      style={rowGlassStyle}
                    >
                      {item.kategori}
                    </td>
                  </tr>
                ))
              )}

              {/* Baris Total Poin Pelanggaran (Paling Bawah) */}
              {pelanggaran.length > 0 && (
                <tr>
                  <td
                    className="px-4 h-[48px] rounded-bl-xl font-bold"
                    style={rowGlassStyle}
                  ></td>
                  <td
                    className="px-6 h-[48px] text-left font-bold"
                    style={rowGlassStyle}
                  >
                    Total Poin Pelanggaran
                  </td>
                  <td
                    className="px-6 h-[48px] text-left font-bold"
                    style={rowGlassStyle}
                  >
                    {totalPoin > 0 ? totalPoin : "-"}
                  </td>
                  <td
                    className="px-6 h-[48px] text-left font-bold rounded-br-xl"
                    style={rowGlassStyle}
                  ></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
