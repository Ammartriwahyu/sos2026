import { PenilaianItem } from "../types";
import { useMemo } from "react";

interface TabelDetailPenilaianProps {
  penilaian: PenilaianItem[];
  keaktifan: number;
  activeRangkaianName: string | null;
}

export const TabelDetailPenilaian = ({
  penilaian,
  keaktifan,
  activeRangkaianName,
}: TabelDetailPenilaianProps) => {
  const isKeaktifanIncluded = !activeRangkaianName
    ?.toLowerCase()
    .includes("pra");

  const { rataRata } = useMemo(() => {
    const nilaiUntukRataRata = [...penilaian.map((p) => p.nilai)];
    if (isKeaktifanIncluded) {
      nilaiUntukRataRata.push(keaktifan);
    }

    const totalNilai = nilaiUntukRataRata.reduce(
      (sum, nilai) => sum + nilai,
      0,
    );
    const rataRata =
      nilaiUntukRataRata.length > 0
        ? (totalNilai / nilaiUntukRataRata.length).toFixed(2)
        : "-";

    return { rataRata };
  }, [penilaian, keaktifan, isKeaktifanIncluded]);

  const specialRows = [
    {
      nama: "Keaktifan",
      nilai: keaktifan,
      show: isKeaktifanIncluded,
    },
  ];

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
        Detail Penilaian
      </h2>

      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[700px] w-full">
          <table
            className="w-full border-separate"
            style={{ borderSpacing: "0.75rem 0.75rem" }}
          >
            <thead>
              <tr className="text-base md:text-lg">
                {/* Header No: Rounded hanya di sisi kiri atas (rounded-tl-xl) */}
                <th
                  className="px-4 w-16 h-[48px] text-center font-bold text-white rounded-tl-xl"
                  style={headerGlassStyle}
                >
                  No
                </th>
                {/* Header Nama Penilaian: Tanpa rounded */}
                <th
                  className="px-6 h-[48px] text-left font-bold text-white"
                  style={headerGlassStyle}
                >
                  Nama Penilaian
                </th>
                {/* Header Nilai: Rounded hanya di sisi kanan atas (rounded-tr-xl) */}
                <th
                  className="px-6 w-36 h-[48px] text-left font-bold text-white rounded-tr-xl"
                  style={headerGlassStyle}
                >
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody className="text-base md:text-lg text-white">
              {penilaian.map((item, index) => (
                <tr key={item.nama_penilaian}>
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
                    {item.nama_penilaian}
                  </td>
                  <td
                    className="px-6 h-[48px] font-normal"
                    style={rowGlassStyle}
                  >
                    {item.nilai !== null ? item.nilai : "-"}
                  </td>
                </tr>
              ))}

              {specialRows.map(
                (row, index) =>
                  row.show && (
                    <tr key={row.nama}>
                      <td
                        className="px-4 h-[48px] text-center font-normal"
                        style={rowGlassStyle}
                      >
                        {penilaian.length + index + 1}
                      </td>
                      <td
                        className="px-6 h-[48px] font-normal"
                        style={rowGlassStyle}
                      >
                        {row.nama}
                      </td>
                      <td
                        className="px-6 h-[48px] font-normal"
                        style={rowGlassStyle}
                      >
                        {row.nilai}
                      </td>
                    </tr>
                  ),
              )}

              {/* Baris Rata-rata (Paling Bawah) */}
              <tr>
                {/* Kolom kosong pertama: Rounded di sisi kiri bawah (rounded-bl-xl) */}
                <td
                  className="px-4 h-[48px] rounded-bl-xl font-bold"
                  style={rowGlassStyle}
                ></td>
                {/* Kolom teks "Rata-rata Nilai": Siku-siku */}
                <td
                  className="px-6 h-[48px] text-left font-bold"
                  style={rowGlassStyle}
                >
                  Rata-rata Nilai
                </td>
                {/* Kolom nilai rata-rata: Rounded di sisi kanan bawah (rounded-br-xl) */}
                <td
                  className="px-6 h-[48px] text-left font-bold rounded-br-xl"
                  style={rowGlassStyle}
                >
                  {rataRata}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
