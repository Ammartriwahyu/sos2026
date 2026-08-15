import React from "react";

const HeaderPresensiCard = () => {
  return (
    <div
      className="w-[1050px] h-[72px] mx-auto flex items-center rounded-t-[12px] rounded-b-none px-12 text-white font-bold gap-4 text-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(42, 31, 92, 0.35) 0%, rgba(42, 31, 92, 0.15) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow:
          "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)",
      }}
    >
      <div className="w-3/12">
        <span>Rangkaian</span>
      </div>
      <div className="w-2/12">
        <span>Sesi</span>
      </div>
      <div className="w-3/12">
        <span>Waktu</span>
      </div>
      <div className="w-4/12">
        <span>Tanggal</span>
      </div>
    </div>
  );
};

export default HeaderPresensiCard;
