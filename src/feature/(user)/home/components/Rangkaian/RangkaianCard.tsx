import Image from "next/image";
import type { Rangkaian } from "../../data/rangkaian";

export default function RangkaianCard({
  item,
  index,
}: {
  item: Rangkaian;
  index: number;
}) {
  return (
    <article
      className="bg-[#363B6F]/20 px-6 py-10 flex flex-col gap-4  overflow-hidden rounded-sm backdrop-blur-sm border border-white/10 w-full animate-float-complex"
      style={{ animationDelay: `${index * 1.5}s` }}
    >
      <div className="relative w-full rounded-md overflow-hidden">
        <Image
          src={item.img}
          alt={item.title}
          className="w-full h-40 object-cover select-none"
          draggable="false"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between gap-2">
        <div className="flex flex-col gap-3">
          <h3 className="text-putih text-xl font-bold text-center">
            {item.title}
          </h3>
          <p className="text-putih text-sm leading-relaxed text-justify">
            {item.description}
          </p>
        </div>
        <button
          type="button"
          className="w-full py-2.5 mt-3 bg-[#61598B] hover:bg-[#7269A0] transition-colors rounded-xl text-putih font-bold text-sm flex items-center justify-center gap-1"
        >
          Selengkapnya
          <span className="text-lg leading-none">&rsaquo;</span>
        </button>
      </div>
    </article>
  );
}
