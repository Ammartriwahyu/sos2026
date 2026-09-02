import React from "react";
import DistrikItem from "./DistrikItem";
import { Distrik } from "../type";

interface DistrikListProps {
  districts: Distrik[];
}

const DistrikList = ({ districts }: DistrikListProps) => {
  const sorted = [...districts].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div className="w-full h-full overflow-y-auto pr-4 space-y-4">
      {sorted.map((distrik, index) => (
        <DistrikItem key={distrik.id_distrik} distrik={distrik} index={index} />
      ))}
    </div>
  );
};

export default DistrikList;
