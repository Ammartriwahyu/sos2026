import { FileDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";

export default function PanduanCard({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article
      className={cn(
        "w-full max-w-3xl bg-[#16193C]/20 p-6 flex flex-col gap-3.5 rounded-2xl backdrop-blur-md border border-white/10 z-20 pointer-events-auto",
        className,
      )}
      style={style}
    >
      <h3 className="text-putih text-xl font-bold">
        Biar Nggak Bingung, Yuk Unduh Buku Panduannya
      </h3>
      <p className="text-putih text-xs font-medium text-justify">
        Buku Panduan SOS & STF Berisi Informasi Dan Panduan Bagi Mahasiswa Baru
        Untuk Lebih Mengenal Departemen Sistem Informasi. Buku Panduan Ini
        Berisi Informasi Seputar Ospek, Tata Tertib, Dan Pelanggaran. Yuk,
        Segera Unduh Buku Panduan SOS & STF!
      </p>
      <button
        type="button"
        className="w-fit px-6 py-2.5 bg-[#61598B] hover:bg-[#7269A0] transition-colors rounded-xl text-putih font-bold text-sm flex items-center justify-center gap-2 mt-2"
      >
        <FileDown className="w-5 h-5" />
        Unduh Sekarang
      </button>
    </article>
  );
}
