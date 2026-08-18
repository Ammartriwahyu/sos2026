import Image from "next/image";
import type { Kegiatan } from "../../data/kegiatan";

interface KegiatanCardProps {
  item: Kegiatan;
}

const KegiatanCard = ({ item }: KegiatanCardProps) => {
  return (
    <article className="bg-[#142645]/55 p-6 flex flex-col gap-4 shadow-2xl overflow-hidden rounded-xl backdrop-blur-lg">
      <div className="relative w-full rounded-md overflow-hidden">
        <Image
          src={item.img}
          alt={item.title}
          className="w-full h-52 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#510001]/30" />
      </div>
      <h3 className="text-putih text-2xl font-semibold text-center">
        {item.title}
      </h3>
      <p className="text-putih text-xs leading-relaxed text-justify">
        {item.description}
      </p>
    </article>
  );
};

export default KegiatanCard;
