import React from "react";

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  prefix?: string;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  value,
  prefix,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-start transition-all duration-300 ease-in-out hover:shadow-md hover:-translate-y-1 ${className}`}
    >
      <div className="flex-shrink-0 bg-[#161A3D] text-white w-14 h-14 flex items-center justify-center rounded-full">
        {icon}
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-[#161A3D]/70 mb-1">{title}</p>
        <p className="text-xl lg:text-2xl font-bold text-[#161A3D]">
          {value}{" "}
          <span className="text-base lg:text-lg font-bold text-[#161A3D]/80">
            {prefix}
          </span>
        </p>
      </div>
    </div>
  );
};
