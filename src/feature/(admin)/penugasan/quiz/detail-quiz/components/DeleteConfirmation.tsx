"use client";

import React from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  title?: string;
  message?: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = "Konfirmasi Hapus",
  message = "Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat direvert.",
}) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} desc={message}>
      <div className="flex justify-center gap-4 mt-6">
        <Button variant="admin-outline" onClick={onClose} disabled={isLoading}>
          Batal
        </Button>
        <Button variant="admin" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : (
            <Trash2 className="mr-2" size={16} />
          )}
          {isLoading ? "Menghapus..." : "Ya, Hapus"}
        </Button>
      </div>
    </Modal>
  );
};
