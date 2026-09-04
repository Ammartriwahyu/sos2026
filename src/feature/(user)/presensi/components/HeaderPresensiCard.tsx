import React from "react";

const kolom = [
  { label: "Rangkaian", width: "w-3/12" },
  { label: "Sesi", width: "w-2/12" },
  { label: "Waktu", width: "w-3/12" },
  { label: "Tanggal", width: "w-4/12" },
];

const HeaderPresensiCard = () => {
  return (
    <div
      className="mx-auto flex w-full min-h-[56px] items-center gap-2 rounded-t-[12px] rounded-b-none px-3 py-2 text-[11px] font-bold text-white sm:text-xs md:h-[72px] md:gap-4 md:px-12 md:py-0 md:text-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(42, 31, 92, 0.35) 0%, rgba(42, 31, 92, 0.15) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow:
          "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
      }}
    >
      {kolom.map(({ label, width }) => (
        <div key={label} className={`${width} min-w-0 text-center`}>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default HeaderPresensiCard;
