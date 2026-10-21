import DdmStfContainer from "@/feature/(user)/stf/container/DdmStfContainer";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Display Hasil STF 2026 | DDM Display",
  description:
    "Layar proyeksi pengumuman hasil akhir pemilihan STF 2026 Departemen Sistem Informasi.",
};

const DdmPage = () => {
  return <DdmStfContainer />;
};

export default DdmPage;
