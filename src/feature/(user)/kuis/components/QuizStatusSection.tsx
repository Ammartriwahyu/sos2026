import { Quiz } from "@/api/services/user/quiz";
import React from "react";
import QuizStage from "./QuizStage";
import QuizBefore from "./QuizBefore";
import { QuizResultView } from "./QuizResultView";
import { CalendarDays } from "lucide-react";

const QuizStatusSection = ({ Quiz }: { Quiz: Quiz | null }) => {
  const getStatusStyle = (status: string | undefined): React.CSSProperties => {
    switch (status?.toLowerCase()) {
      case "selesai":
        return {
          background: "rgba(76, 175, 80, 0.25)",
          border: "1px solid rgba(76, 175, 80, 0.5)",
          color: "#4CAF50",
        };
      case "terlewat":
      case "terlambat":
        return {
          background: "rgba(207, 42, 74, 0.25)",
          border: "1px solid rgba(207, 42, 74, 0.5)",
          color: "#CF2A4A",
        };
      default:
        return {
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "rgba(255,255,255,0.8)",
        };
    }
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(42, 31, 92, 0.5) 0%, rgba(42, 31, 92, 0.25) 100%)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header kuis */}
      <div className="px-8 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h4 className="text-2xl sm:text-3xl font-bold text-white">
            {Quiz?.nama_kuis}
          </h4>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <CalendarDays className="w-4 h-4 shrink-0" />
            <span>
              Deadline:{" "}
              {new Date(Quiz?.tenggat_kuis || "").toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Status badge */}
        <div
          className="self-start sm:self-auto px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
          style={getStatusStyle(Quiz?.status_kuis)}
        >
          {Quiz?.status_kuis}
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mx-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Progress stage */}
      <div className="px-8 py-6">
        <QuizStage status={Quiz?.status_kuis || ""} />
      </div>

      {/* Divider */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Konten bawah */}
      <div className="px-8 py-8">
        {Quiz?.status_kuis === "Selesai" ? (
          <QuizResultView quiz={Quiz} />
        ) : Quiz?.status_kuis === "Terlewat" ||
          Quiz?.status_kuis === "Terlambat" ? (
          <div
            className="w-full px-6 py-6 rounded-xl"
            style={{
              background: "rgba(207,42,74,0.1)",
              border: "1px solid rgba(207,42,74,0.25)",
            }}
          >
            <h4 className="font-bold text-white mb-2">Kuis Sudah Berakhir</h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Maaf, kuis ini sudah melewati batas waktu pengerjaan. Kamu tidak
              bisa mengerjakan kuis ini lagi.
            </p>
          </div>
        ) : (
          <QuizBefore quiz={Quiz} />
        )}
      </div>
    </div>
  );
};

export default QuizStatusSection;
