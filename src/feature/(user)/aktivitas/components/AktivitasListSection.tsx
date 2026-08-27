import React from "react";
import { daftarAktivitas } from "../data/aktivitasData";
import AktivitasList from "./AktivitasList";

const AktivitasListSection = () => {
  return (
    <div className="w-full relative py-8 lg:py-20">
      <div className="w-full flex items-center justify-center relative">
        <div className="grid grid-cols-3 w-full max-w-[790px] gap-4 sm:gap-10 lg:gap-20 mx-auto z-20 place-items-center">
          {daftarAktivitas.map((aktivitas, idx) => (
            <AktivitasList key={idx} aktivitas={aktivitas} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AktivitasListSection;
