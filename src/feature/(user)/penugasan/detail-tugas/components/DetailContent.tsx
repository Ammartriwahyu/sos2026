import React from "react";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";
import { Input } from "@/shared/components/ui/Input";
import { Tugas } from "@/feature/(user)/penugasan/types";
import { cn } from "@/shared/utils/cn";
import { Link as LinkIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import I from "@/assets/user/icon_i.svg";

interface DetailContentProps {
  activeStep: number;
  tugas: Tugas;
  driveLink: string;
  setDriveLink: (link: string) => void;
  isSubmitted: boolean;
  isOverdue: boolean;
  isSubmitting: boolean;
  handleFormSubmit: () => void;
  setActiveStep: (step: number) => void;
}

export const DetailContent = ({
  activeStep,
  tugas,
  driveLink,
  setDriveLink,
  // isSubmitted,
  isOverdue,
  isSubmitting,
  handleFormSubmit,
  setActiveStep,
}: DetailContentProps) => {
  const detailLink = tugas.file || "#";
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 grid-rows-1">
        {/* Konten Step 1 */}
        <div
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-300",
            activeStep === 1 ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col items-center gap-8 h-full">
            <div className="w-full flex flex-col items-center rounded-2xl overflow-hidden">
              {/* Garis Gradien Atas */}
              <div
                className="w-full h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
                }}
              />

              {/* Area Konten Deskripsi */}
              <div
                className="w-full h-auto py-8 px-6 md:py-12 md:px-16 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.15) 50%, rgba(74, 52, 136, 0) 100%)",
                }}
              >
                <div
                  className="prose max-w-none whitespace-pre-line text-white text-left text-base md:text-lg w-full"
                  dangerouslySetInnerHTML={{ __html: tugas.deskripsi }}
                />
              </div>

              {/* Garis Gradien Bawah */}
              <div
                className="w-full h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
                }}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-[62px]">
              <AktivitasButton
                variant="primary"
                onClick={() => window.open(detailLink, "_blank")}
                className="w-full md:w-auto px-8"
              >
                <LinkIcon size={20} />
                Lihat Detail Tugas
              </AktivitasButton>

              <AktivitasButton
                variant="primary"
                onClick={() => setActiveStep(2)}
                className="w-full md:w-auto px-16"
              >
                Lanjut
              </AktivitasButton>
            </div>
          </div>
        </div>

        {/* Konten Step 2 */}
        <div
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-300",
            activeStep === 2 ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col items-center gap-8 h-full">
            <div className="w-full flex flex-col items-center rounded-2xl overflow-hidden">
              {/* Garis Gradien Atas */}
              <div
                className="w-full h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
                }}
              />

              {/*Area Form Pengumpulan */}
              <div
                className="w-full h-auto py-8 px-6 md:py-12 md:px-16 flex flex-col gap-6"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(70, 127, 189, 0) 0%, rgba(70, 127, 189, 0.15) 50%, rgba(70, 127, 189, 0) 100%)",
                }}
              >
                <div className="flex-grow">
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                    Kumpulkan Tugas Kamu
                  </h2>
                  <div className="w-full flex flex-col items-start gap-4">
                    <div className="w-full flex flex-col gap-2 md:gap-4">
                      <label
                        htmlFor="drive_link"
                        className="text-white text-base md:text-lg"
                      >
                        Link Penugasan
                      </label>

                      <Input
                        id="drive_link"
                        placeholder="Masukkan Link Tugas Penugasan mu di sini..."
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        disabled={isOverdue || isSubmitting}
                        className="w-full h-[50px] text-white placeholder:text-white/50 rounded-[12px] px-4 text-base sm:text-lg focus:outline-none focus:border-white/40 transition-all z-10 relative"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.08) 100%)",
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          boxShadow:
                            "inset 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 2px 8px 0 rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    </div>

                    {/* Frame Tips */}
                    <div
                      className="flex flex-col md:flex-row items-center text-justify gap-3 p-4 md:p-5 rounded-[12px] w-full mt-4 md:mt-6"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(70, 127, 189, 0.15) 0%, rgba(70, 127, 189, 0.05) 100%)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        border: "1px solid rgba(70, 127, 189, 0.3)",
                        boxShadow:
                          "inset 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 2px 8px 0 rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        className="rounded-full p-3 flex items-center justify-center shrink-0 text-white"
                        style={{
                          background: "#467FBD",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        <Image
                          src={I}
                          alt="Icon I"
                          width={32}
                          height={32}
                          className="brightness-0 invert"
                        />
                      </div>
                      <p className="text-sm md:text-lg text-white/90">
                        Agar tugas kamu bisa kami periksa, mohon atur akses link
                        ke Siapa saja yang memiliki link{" "}
                        <i>(Anyone with the link)</i> sebagai Pelihat{" "}
                        <i>(Viewer)</i>. Hindari pengaturan Dibatasi{" "}
                        <i>(Restricted)</i>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Garis Gradien Bawah */}
              <div
                className="w-full h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
                }}
              />
            </div>

            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-[62px]">
              <AktivitasButton
                variant="primary"
                onClick={() => setActiveStep(1)}
                className="w-full md:w-auto px-12"
              >
                Sebelumnya
              </AktivitasButton>
              <AktivitasButton
                variant="primary"
                onClick={handleFormSubmit}
                disabled={isOverdue || isSubmitting}
                className="w-full md:w-auto px-20"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Kirim
              </AktivitasButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
