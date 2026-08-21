import React from "react";
import Link from "next/link";
import { Distrik } from "../type";

interface DistrikItemProps {
  distrik: Distrik;
}

const DistrikItem = ({ distrik }: DistrikItemProps) => {
  return (
    <Link
      href={`/admin/distrik/${distrik.id_distrik}`}
      className="block w-full text-left p-4 rounded-2xl bg-admin-500/10 hover:bg-admin-500/20 transition-colors"
    >
      <p className="text-xl text-black">{distrik.nama_distrik}</p>
    </Link>
  );
};

export default DistrikItem;
