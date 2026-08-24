"use client";

import Link from "next/link";
import QuizStatusSection from "../components/QuizStatusSection";
import { useGetDetailQuiz } from "../hooks/useGetQuiz";
import { ChevronLeft } from "lucide-react";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

const QuizContainer = ({ id_kuis }: { id_kuis: string }) => {
  const { data: detailQuiz } = useGetDetailQuiz(id_kuis);
  return (
    <SpaceBackground className="relative flex flex-col min-h-screen w-full overflow-x-hidden">
      <CircleGLow />

      <BgBawah gradientHeight="h-[200px]" />

      <div className="relative z-10 mycontainer py-8 md:py-12 flex flex-col items-center gap-6 pb-[250px] md:pb-[400px]">
        <AnimatedDiv className="w-full flex justify-start">
          <div className="w-full px-4 md:px-10 mt-2">
            <Link
              href="/aktivitas/penugasan"
              className="inline-flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0" />
              <span>Kembali</span>
            </Link>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.1} className="w-full">
          <QuizStatusSection Quiz={detailQuiz} />
        </AnimatedDiv>
      </div>
    </SpaceBackground>
  );
};

export default QuizContainer;
