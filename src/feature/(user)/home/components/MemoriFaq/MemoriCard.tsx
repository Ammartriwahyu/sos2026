import Image from "next/image";
import Link from "next/link";
import type { Content } from "../../data/memori";

export const MemoriCard = ({
  title,
  content,
  link,
  className,
  ...props
}: {
  title: string;
  content: Content;
  link: string;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "content">) => (
  <div className={`snap-center shrink-0 w-60 ${className || ""}`} {...props}>
    <Link
      href={link}
      className="bg-[#363B6F]/20 border border-white/10 rounded-xl p-5 flex flex-col overflow-hidden gap-2 animate-float-complex"
      style={{ animationDelay: "var(--anim-delay, 0s)" }}
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
  </div>
);
