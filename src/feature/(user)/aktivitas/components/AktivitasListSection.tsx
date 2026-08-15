import React from "react";
import { daftarAktivitas } from "../data/aktivitasData";
import AktivitasList from "./AktivitasList";

const AktivitasListSection = () => {
  return (
    <div className="w-full relative py-12 lg:py-20">
      <div className="w-full content-container flex items-center justify-center relative">
        <div className="grid grid-cols-1 md:grid-cols-3 w-auto gap-[100px] mx-auto px-4 z-20 place-items-center">
          {daftarAktivitas.map((aktivitas, idx) => (
            <AktivitasList key={idx} aktivitas={aktivitas} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AktivitasListSection;
