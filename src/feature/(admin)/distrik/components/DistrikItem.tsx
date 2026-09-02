import React from "react";
import Link from "next/link";
import { Distrik } from "../type";

interface DistrikItemProps {
  distrik: Distrik;
  index?: number;
}

const DistrikItem = ({ distrik, index }: DistrikItemProps) => {
  const displayName =
    distrik.order != null
      ? `${distrik.nama_distrik} - ${distrik.order}`
      : index != null
        ? `${distrik.nama_distrik} - ${index + 1}`
        : distrik.nama_distrik;

  return (
    <Link
      href={`/admin/distrik/${distrik.id_distrik}`}
      className="block w-full text-left p-4 rounded-2xl bg-primary-normal/10 hover:bg-primary-normal/20 transition-colors"
    >
      <p className="text-xl text-black">{displayName}</p>
    </Link>
  );
};

export default DistrikItem;
