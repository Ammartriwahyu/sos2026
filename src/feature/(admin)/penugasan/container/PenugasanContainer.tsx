"use client";
import React, { useState } from "react";
import TugasContainer from "../tugas/container/TugasContainer";
import QuizContainer from "../quiz/container/QuizContainer";

const PenugasanContainer = () => {
  const [activeTab, setActiveTab] = useState<"tugas" | "quiz">("tugas");

  return (
    <div className="w-full bg-default-white rounded-xl p-5 sm:p-8 lg:p-14">
      <h4 className="text-center font-bold text-xl sm:text-2xl lg:text-3xl text-default-dark">
        Penugasan
      </h4>
      <section className="w-full flex justify-center mt-6 sm:mt-9">
        <div className="relative w-64 h-10 bg-white rounded-full border-2 border-primary-normal mb-6">
          <div
            className={`absolute w-1/2 h-full rounded-full bg-primary-normal transition-transform duration-300 ease-in-out`}
            style={{
              transform:
                activeTab === "tugas" ? "translateX(0%)" : "translateX(100%)",
            }}
          />
          <div className="relative mx-auto z-10 grid grid-cols-2 h-full">
            <button
              className={`w-full rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === "tugas" ? "text-white" : "text-primary-dark"
              }`}
              onClick={() => setActiveTab("tugas")}
            >
              Tugas
            </button>
            <button
              className={`w-full rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === "quiz" ? "text-white" : "text-primary-dark"
              }`}
              onClick={() => setActiveTab("quiz")}
            >
              Kuis
            </button>
          </div>
        </div>
      </section>

      <div className="w-full">
        {activeTab === "tugas" ? <TugasContainer /> : <QuizContainer />}
      </div>
    </div>
  );
};

export default PenugasanContainer;
