"use client";

import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";
import { Calendar, Clock, HelpCircle } from "lucide-react";

export interface QuizCard26Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  deadline: string;
  duration: string;
  totalQuestions: string;
  score?: string | number;
  status?: "Sudah dikerjakan" | "Mulai" | "Kuis sudah terlewat";
  onStartClick?: () => void;
}

const QuizCard26 = forwardRef<HTMLDivElement, QuizCard26Props>(
  (
    {
      className,
      title,
      description,
      deadline,
      duration,
      totalQuestions,
      score = "-",
      status,
      onStartClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        // Wrapper Utama
        className={cn(
          "group relative flex w-full sm:w-fit h-auto px-5 sm:px-[40px] py-5 sm:py-[20px] rounded-[20px] transition-all duration-300 ease-in-out",
          "backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]",
          "bg-gradient-to-br from-white/[0.18] to-white/[0.06]",
          "border border-white/20",
          "shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25),0_8px_32px_0_rgba(0,0,0,0.2)]",
          className,
        )}
        {...props}
      >
        {/* Parent Inner Wrapper */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-[60px] w-full">
          {/* Konten Kiri */}
          <div className="flex flex-col justify-between w-full sm:w-[395px] gap-2.5">
            <div className="flex flex-col gap-1 w-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wide line-clamp-1">
                {title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/80 line-clamp-1">
                {description}
              </p>
            </div>
            {/* Tanggal Tenggat */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/90 py-1 w-full">
              <div className="flex items-center gap-2">
                <Calendar
                  size={18}
                  className="text-white shrink-0 sm:w-5 sm:h-5"
                />
                <span className="text-xs sm:text-sm font-medium">
                  {deadline}
                </span>
              </div>

              {/* Waktu Pengerjaan*/}
              <div className="flex items-center gap-2">
                <Clock
                  size={18}
                  className="text-white shrink-0 sm:w-5 sm:h-5"
                />
                <span className="text-xs sm:text-sm font-medium">
                  {duration}
                </span>
              </div>

              {/* Jumlah Soal */}
              <div className="flex items-center gap-2">
                <HelpCircle
                  size={18}
                  className="text-white shrink-0 sm:w-5 sm:h-5"
                />
                <span className="text-xs sm:text-sm font-medium">
                  {totalQuestions}
                </span>
              </div>
            </div>

            {/* Action Button */}
            {status === "Sudah dikerjakan" ? (
              <div
                className="w-full py-2.5 rounded-[12px] font-semibold text-white text-center text-base mt-1 cursor-default select-none transition-all duration-300"
                style={{
                  background: "#4A9D55",
                  boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)",
                }}
              >
                Sudah Dikerjakan
              </div>
            ) : status === "Kuis sudah terlewat" ? (
              <div
                className="w-full py-2.5 rounded-[12px] font-semibold text-white text-center text-base mt-1 cursor-default select-none transition-all duration-300"
                style={{
                  background: "rgba(222, 214, 249, 0.5)",
                  boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)",
                }}
              >
                Kuis Sudah Terlewat
              </div>
            ) : (
              <button
                type="button"
                onClick={onStartClick}
                className="w-full py-2.5 rounded-[12px] font-semibold text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98] mt-1"
                style={{
                  background: "rgba(110, 102, 165, 0.85)",
                  boxShadow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.25)",
                }}
              >
                Mulai
              </button>
            )}
          </div>

          {/* Konten Sisi Kanan (Box Skor) */}
          <div
            className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-[120px] py-3 sm:py-4 px-6 sm:px-4 rounded-[16px] shrink-0 self-stretch"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow:
                "inset 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 4px 16px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <span className="text-xs sm:text-sm font-medium text-purple-200/95 tracking-wide">
              Skor Kamu
            </span>
            <div className="flex items-baseline sm:flex-col sm:items-center">
              <span className="text-2xl sm:text-4xl font-bold text-white sm:my-1">
                {score === null || score === undefined || score === ""
                  ? "-"
                  : score}
              </span>
              <span className="text-xs sm:text-sm font-medium text-purple-200/90 ml-1 sm:ml-0">
                /100
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

QuizCard26.displayName = "QuizCard26";

export { QuizCard26 };
