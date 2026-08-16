import Image from "next/image";
import Link from "next/link";
import type { Content } from "../../data/memori";

export const MemoriCard = ({
  title,
  content,
  link,
}: {
  title: string;
  content: Content;
  link: string;
}) => (
  <Link
    href={link}
    className="snap-center shrink-0 w-60 bg-[#363B6F]/20 border border-white/10 rounded-xl p-5 flex flex-col overflow-hidden gap-2"
  >
    <div className="relative w-50 aspect-square rounded-lg flex items-center justify-center bg-black/40">
      {typeof content === "string" && !content.startsWith("http") ? (
        <p className="text-white font-bold text-xl text-center px-4">
          {content}
        </p>
      ) : (
        <Image
          src={content}
          alt={title}
          fill
          className="object-cover origin-[top_5rem] hover:scale-150 rounded-lg transition-transform duration-400 z-20 select-none"
          draggable={false}
        />
      )}
    </div>
    <h3 className="text-center text-white font-semibold z-0">{title}</h3>
  </Link>
);
