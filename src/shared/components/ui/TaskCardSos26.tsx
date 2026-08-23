"use client";

import React, { forwardRef, ReactElement } from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const taskCard26Variants = cva(
  "group relative flex w-full flex-col items-center gap-3 py-6 px-3 text-center transition-all duration-300 ease-in-out md:max-w-xs md:gap-10 md:py-10 md:px-8 rounded-[20px] bg-transparent border border-transparent hover:bg-gradient-to-b hover:from-white/[0.25] hover:to-white/[0.1] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] active:bg-gradient-to-b active:from-white/[0.25] active:to-white/[0.1] active:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:cursor-pointer",
  {
    variants: {
      status: {
        default: "bg-transparent",
        completed: "bg-transparent",
        overdue: "bg-transparent",
      },
    },
    defaultVariants: {
      status: "default",
    },
  },
);

export type TaskStatus = "default" | "completed" | "overdue";

export interface TaskCard26Props
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof taskCard26Variants> {
  icon?: ReactElement;
  taskName: string;
  deadline: string;
  status?: TaskStatus;
}

const TaskCard26 = forwardRef<HTMLDivElement, TaskCard26Props>(
  (
    {
      className,
      icon = <X size={96} />,
      taskName,
      deadline,
      status = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(taskCard26Variants({ status }), className)}
        {...props}
      >
        <div className="relative flex h-[106px] w-[106px] items-center justify-center md:h-[150px] md:w-[150px]">
          <div className="absolute h-full w-full rounded-full bg-[#1C1D4A] group-hover:bg-white group-active:bg-white shadow-md transition-all duration-300 ease-in-out" />

          <div
            className={cn(
              "absolute flex h-[85%] w-[85%] items-center justify-center rounded-full border-[6px] border-white group-hover:border-[#1C1D4A] group-active:border-[#1C1D4A] transition-all duration-300 ease-in-out",
              "bg-[#1C1D4A] group-hover:bg-white group-active:bg-white",
            )}
          >
            {React.cloneElement(icon, {
              className: cn(
                "w-12 h-12 md:w-16 md:h-16 text-white group-hover:text-[#1C1D4A] group-active:text-[#1C1D4A] transition-colors duration-300 ease-in-out",
              ),
            })}
          </div>
        </div>

        <div className={cn("flex flex-col gap-3", "md:gap-5")}>
          <h3
            className={cn(
              "text-2xl font-semibold transition-colors duration-300 ease-in-out text-white line-clamp-2",
            )}
          >
            {taskName}
          </h3>

          <div
            className={cn(
              "text-base font-normal transition-colors duration-300 ease-in-out text-white/90",
            )}
          >
            <p>Deadline:</p>
            <p>{deadline}</p>
          </div>

          {status === "completed" && (
            <p className="text-xl font-semibold text-green-500">Selesai</p>
          )}

          {status === "overdue" && (
            <p className="text-xl font-semibold text-red-500">Terlewat</p>
          )}
        </div>
      </div>
    );
  },
);
TaskCard26.displayName = "TaskCard26";

export { TaskCard26 };
