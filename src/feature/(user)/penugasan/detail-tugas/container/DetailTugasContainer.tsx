"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useDetailTugas } from "../hooks/useDetailTugas";
import { Button } from "@/shared/components/ui/Button";
import { TaskStepper } from "../components/TaskStepper";
import { DetailHeader } from "../components/DetailHeader";
import { DetailContent } from "../components/DetailContent";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CircleGLow from "@/shared/components/background/CircleGlow";
import BgBawah from "@/shared/components/background/BgBawah";

export const DetailTugasContainer = ({
  id_penugasan,
}: {
  id_penugasan: string;
}) => {
  const { tugas, isLoading, error, isSubmitting, handleSubmitTugas } =
    useDetailTugas(id_penugasan);
  const [activeStep, setActiveStep] = useState(1);
  const [driveLink, setDriveLink] = useState("");

  useEffect(() => {
    if (tugas?.link_pengumpulan) {
      setDriveLink(tugas.link_pengumpulan);
    }
  }, [tugas]);

  if (isLoading) {
    return (
      <SpaceBackground className="min-h-screen">
        <CircleGLow />
        <div className="flex h-[80vh] items-center justify-center relative z-10">
          <Loader2 className="w-16 h-16 animate-spin text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
        </div>
      </SpaceBackground>
    );
  }

  if (error || !tugas) {
    return (
      <SpaceBackground className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative ">
        <CircleGLow />
        <p className="text-xl text-red-500 mb-4 relative z-10">
          {error || "Tugas tidak ditemukan."}
        </p>
        <Link href="/aktivitas/penugasan" className="relative z-10">
          <Button variant="outline">Kembali ke Daftar Tugas</Button>
        </Link>
      </SpaceBackground>
    );
  }

  const statusLower = tugas.status?.toLowerCase().trim() || "";
  const isSubmitted = statusLower === "selesai";

  const deadlineDate = new Date(tugas.tenggat);
  const isDeadlinePassed =
    !isNaN(deadlineDate.getTime()) && new Date() > deadlineDate;

  let statusText: string;
  let statusVariant: "not_started" | "completed" | "overdue";

  if (isSubmitted) {
    statusText = "Selesai";
    statusVariant = "completed";
  } else if (isDeadlinePassed) {
    statusText = "Terlewat";
    statusVariant = "overdue";
  } else {
    statusText = "Belum Selesai";
    statusVariant = "not_started";
  }

  const formattedDeadline = isNaN(deadlineDate.getTime())
    ? tugas.tenggat
    : `${deadlineDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })} • ${deadlineDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })} WIB`;

  const handleFormSubmit = () => {
    if (!driveLink.trim()) {
      alert("Link pengumpulan tidak boleh kosong.");
      return;
    }
    handleSubmitTugas(driveLink);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-background mt-15">
      {/*BAGIAN 1: WRAPPER KONTEN UTAMA*/}
      <SpaceBackground className="relative w-full flex flex-col items-center flex-grow pb-[350px]">
        <CircleGLow />

        <div className="relative z-10 mycontainer py-8 md:py-12 flex flex-col items-center gap-6 md:gap-8 w-full">
          <AnimatedDiv className="w-full">
            <div className="w-full px-4 md:px-10 mt-5">
              <Link
                href="/aktivitas/penugasan"
                className="self-start flex items-center gap-1 text-white font-semibold text-lg md:text-xl hover:text-white/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white shrink-0" />
                Kembali
              </Link>
            </div>
          </AnimatedDiv>

          <AnimatedDiv
            className="w-full flex flex-col items-center px-4 md:px-10 gap-8 md:gap-10 max-w-[1103px]"
            delay={0.1}
          >
            <DetailHeader
              judul={tugas.judul}
              deadline={formattedDeadline}
              statusText={statusText}
              statusVariant={statusVariant}
            />

            <TaskStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />

            <DetailContent
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              tugas={tugas}
              driveLink={driveLink}
              setDriveLink={setDriveLink}
              isSubmitted={isSubmitted}
              isOverdue={isDeadlinePassed}
              isSubmitting={isSubmitting}
              handleFormSubmit={handleFormSubmit}
            />
          </AnimatedDiv>
        </div>
      </SpaceBackground>

      {/* BAGIAN 2: FOOTER / BG BAWAH*/}
      <div className="relative z-0 w-full shrink-0 block mt-auto">
        <BgBawah gradientHeight="h-[250px]" />
      </div>
    </div>
  );
};
