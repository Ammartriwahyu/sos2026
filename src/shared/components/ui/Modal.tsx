"use client";

import React, { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  desc?: string;
  children: ReactNode;
  containerClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  desc,
  children,
  containerClassName,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose} modal={false}>
      <Dialog.Portal>
        <Dialog.Overlay className="absolute inset-0 z-50 " />

        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Content
              className={cn(
                "relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",
                "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
                "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                "lg:max-w-2xl lg:p-8 ",

                containerClassName,
              )}
            >
              {title && (
                <Dialog.Title className="md:text-xl text-lg text-center font-bold leading-6 text-[#2A1F5C] lg:text-2xl">
                  {title}
                </Dialog.Title>
              )}

              {desc && (
                <p className="mt-2 text-xs md:text-sm text-gray-500 text-center">
                  {desc}
                </p>
              )}

              {!title && !desc && (
                <VisuallyHidden.Root asChild>
                  <Dialog.Title>Modal Window</Dialog.Title>
                </VisuallyHidden.Root>
              )}

              <Dialog.Close className="absolute top-6 right-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 lg:top-8 lg:right-8">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Dialog.Close>

              <div className={cn(title && "mt-4")}>{children}</div>
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { Modal };
