import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";

const CtaSection = () => {
  return (
    <section className="bg-transparent w-full relative z-30">
      <div className="mx-auto lg:px-8 md:px-12 px-4 xl:px-24 text-default-white flex flex-col justify-center items-center py-32 md:py-48 gap-6">
        <h2 className="w-11/12 md:w-3/4 lg:w-2/3 text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
          Are you ready for Shaping The Future 2026?
        </h2>
        <p className="text-sm text-center md:text-base text-white/80 max-w-3xl">
          Yuk tunjukkan suaramu dan dukunganmu untuk menciptakan angkatan yang
          solid.
        </p>
        <Link href="/login" className="mt-2">
          <Button
            variant="none"
            className="bg-primary-light hover:bg-primary-light-hover text-black font-bold px-8 py-3.5 rounded-full text-base transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            Masuk untuk Memilih
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CtaSection;
