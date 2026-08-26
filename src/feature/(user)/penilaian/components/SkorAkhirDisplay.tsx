import { cn } from "@/shared/utils/cn";

interface SkorAkhirDisplayProps {
  skor: number;
  status: "lulus" | "tidak_lulus" | string;
}

export const SkorAkhirDisplay = ({ skor, status }: SkorAkhirDisplayProps) => {
  const isLulus = status.toLowerCase() === "lulus";

  // Menggunakan style liquid glass yang sama persis seperti header tabel
  const headerGlassStyle = {
    background: "linear-gradient(135deg, rgba(42, 31, 92, 0.5) 0%, rgba(42, 31, 92, 0.25) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Frame Skor Akhir */}
        <div
          className={cn(
            "flex justify-between items-center w-full flex-grow",
            "p-3 px-4 md:px-6 md:py-4 rounded-xl text-white",
          )}
          style={headerGlassStyle}
        >
          <h3 className="text-base md:text-2xl font-bold">Skor Akhir</h3>
          <span className="text-lg md:text-3xl font-bold">{skor}</span>
        </div>

        {/* Frame Badge Status dengan kustomisasi warna dan teks 2xl */}
        <div
          className={cn(
            "flex items-center justify-center whitespace-nowrap rounded-xl shadow-lg",
            "px-4 py-3 md:px-8 md:py-4",
            "text-xl md:text-2xl font-bold text-white",
          )}
          style={{
            backgroundColor: isLulus ? "#4CAF50" : "#CF2A4A",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
          }}
        >
          {isLulus ? "LULUS" : "TIDAK LULUS"}
        </div>
      </div>

      <p className="text-[10px] md:text-sm text-white mt-2">
        *Skor akhir adalah akumulasi dari penugasan, kehadiran, keaktifan dan
        pelanggaran
      </p>
    </div>
  );
};