import React from "react";

const CtaSection = () => {
  return (
    <section className="bg-transparent w-full relative z-30">
      <div className="mx-auto lg:px-8 md:px-12 px-4 xl:px-24 text-default-white flex flex-col justify-center items-center py-32 md:py-48 gap-6">
        <h2 className="w-11/12 md:w-3/4 lg:w-2/3 text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
          Are you ready for Shaping The Future 2026?
        </h2>
        <p className="text-base text-center md:text-xl lg:text-2xl text-white/80 max-w-3xl">
          Yuk tunjukkan suaramu dan dukunganmu untuk menciptakan angkatan yang
          solid.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
