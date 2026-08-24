import { Quiz } from "@/api/services/user/quiz";
import React from "react";
import QuizStage from "./QuizStage";
import QuizBefore from "./QuizBefore";
import { QuizResultView } from "./QuizResultView";

const QuizStatusSection = ({ Quiz }: { Quiz: Quiz | null }) => {
  const getStatusStyle = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "selesai":
        return "border-transparent bg-badgeSuccess text-white px-3 py-2 rounded-full";
      case "belum mulai":
        return "border-transparent bg-default-dark/20 text-white px-3 py-2 rounded-full";
      case "terlewat":
      case "terlambat":
        return "border-transparent bg-badgeOverdue text-white px-3 py-2 rounded-full";
      default:
        return "border-transparent bg-default-dark/20 text-white px-3 py-2 rounded-full";
    }
  };
  return (
    <div className="bg-white shadow-2xl rounded-2xl mx-auto max-w-4xl w-full  lg:px-24 lg:py-22 px-8 py-8">
      <div className="flex flex-col space-y-4 lg:flex-row justify-center   lg:justify-between">
        <div className="space-y-4">
          <h4 className="text-3xl text-center lg:text-left font-semibold text-primary-600">
            {Quiz?.nama_kuis}
          </h4>
          <p className="text-center lg:text-left">
            Deadline :{" "}
            <span>
              {new Date(Quiz?.tenggat_kuis || "").toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>
        <div
          className={`${getStatusStyle(
            Quiz?.status_kuis,
          )} flex justify-center w-2/3 mx-auto lg:w-fit items-center text-sm h-fit lg:mx-0 `}
        >
          {Quiz?.status_kuis}
        </div>
      </div>
      <div>
        <QuizStage status={Quiz?.status_kuis || ""} />
      </div>
      <div className="mt-20">
        {Quiz?.status_kuis === "Selesai" ? (
          <QuizResultView quiz={Quiz} />
        ) : Quiz?.status_kuis === "Terlewat" ||
          Quiz?.status_kuis === "Terlambat" ? (
          <div className="w-full space-y-4 px-8 py-6 rounded-2xl mt-20 min-h-[15rem] bg-[#F5E6E9]">
            <h4 className="font-bold text-black">Kuis Sudah Berakhir</h4>
            <p className="text-justify">
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
