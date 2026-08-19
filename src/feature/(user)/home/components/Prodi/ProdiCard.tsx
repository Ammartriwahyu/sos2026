import Image from "next/image";
import type { Prodi } from "@/feature/(user)/akademik/data/prodiData";

export default function ProdiCard({
  item,
  index = 0,
}: {
  item: Prodi;
  index?: number;
}) {
  return (
    <article
      className="rounded-4xl bg-[#142645]/55 p-6 gap-4 flex flex-col items-center justify-center shadow-2xl h-64 w-48 md:h-90 md:w-70 z-10 relative backdrop-blur-xs animate-float-complex"
      style={{ animationDelay: `${index * -2.3}s` }}
    >
      <Image
        src={item.logo}
        alt={item.nama}
        className="w-[80%] h-auto object-contain select-none"
        draggable="false"
      />
      <h3 className="text-white text-center font-bold text-lg leading-tight w-full uppercase">
        {item.nama}
      </h3>
    </article>
  );
}
