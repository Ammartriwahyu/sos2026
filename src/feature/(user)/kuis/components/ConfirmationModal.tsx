"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmIcon?: React.ReactNode;
  hideCancelButton?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title,
  message,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
  confirmIcon,
  hideCancelButton = false,
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} desc={message}>
      <div className="flex justify-center  gap-4 mt-6">
        {!hideCancelButton && (
          <Button
            variant="admin-outline"
            className="text-xs md:text-lg"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        )}
        <Button
          variant="admin"
          className="text-xs md:text-lg"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : (
            confirmIcon && <span className="mr-2">{confirmIcon}</span>
          )}
          {isLoading ? "Memproses..." : confirmText}
        </Button>
      </div>
    </Modal>
  );
};
