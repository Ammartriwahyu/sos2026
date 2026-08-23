import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import AktivitasButton from "@/shared/components/ui/ButtonSos26";
import { ChevronLeft } from "lucide-react";
import { QuizResult } from "@/api/services/user/quiz";

export interface QuizResultModalSos26Props {
  isOpen: boolean;
  onClose: () => void;
  result: QuizResult | null;
  quizTitle?: string;
}

export const QuizResultModalSos26: React.FC<QuizResultModalSos26Props> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen || !result) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Content
            className="relative w-full max-w-lg transform overflow-hidden rounded-[24px] px-[20px] py-[40px] flex flex-col gap-[20px] transition-all duration-300"
            style={{
              background: "rgba(0, 17, 38, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow:
                "inset 0 2px 4px 0 rgba(255,255,255,0.15), 0 16px 40px 0 rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <VisuallyHidden.Root asChild>
              <Dialog.Title>Hasil Kuis</Dialog.Title>
            </VisuallyHidden.Root>

            <div className="w-full flex flex-col items-center">
              <h3 className="text-xl font-bold text-white text-center">
                Kuis Selesai !
              </h3>
              <div className="w-full h-[1px] bg-white mt-[10px]" />
            </div>

            <div className="w-full flex flex-col items-center">
              <p className="text-2xl font-semibold text-white text-center">
                Nilai Kamu
              </p>
              <div className="mt-[10px]">
                <span className="text-4xl font-bold text-white text-center">
                  {result.score ?? 0}
                </span>
              </div>
            </div>

            <div className="w-full flex justify-center pt-2">
              <AktivitasButton
                onClick={onClose}
                className="w-[218px] py-3 rounded-xl flex items-center justify-center gap-2 text-white cursor-pointer transition-all"
              >
                <ChevronLeft className="w-5 h-5 shrink-0 text-white" />
                <span>Kembali</span>
              </AktivitasButton>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
