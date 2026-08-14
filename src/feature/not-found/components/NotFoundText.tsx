import Link from "next/link";
import React from "react";

const CHARS = ["4", "0", "4"];

const NotFoundText = () => {
  return (
    <div className="nf404-content">
      <div className="nf404-content-float">
        <h1 className="nf404-title" aria-label="404">
          {CHARS.map((char, i) => (
            <span
              key={i}
              className="nf404-char"
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="nf404-tagline">
          Sepertinya kamu melayang terlalu jauh — halaman ini hilang di luar
          angkasa.
        </p>
        <Link href="/" className="nf404-cta">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default NotFoundText;
