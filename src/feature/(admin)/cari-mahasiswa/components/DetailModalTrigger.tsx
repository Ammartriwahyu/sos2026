"use client";

import { Modal } from "@/shared/components/ui/Modal";
import { useState } from "react";
import { MahasiswaDetailView } from "./MahasiswaDetailModal";
import { useMahasiswaDetail } from "../hooks/useMahasiswaDetail";

interface DetailModalTriggerProps {
  nim: string;
}

export const DetailModalTrigger = ({ nim }: DetailModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: profile,
    isLoading,
    error,
    fetchProfile,
  } = useMahasiswaDetail();

  const handleOpenModal = () => {
    setIsOpen(true);
    fetchProfile(nim);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="detail-link font-semibold text-admin-500 border-b border-admin-500"
      >
        Detail
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="">
        <MahasiswaDetailView
          isLoading={isLoading}
          error={error}
          mahasiswa={profile}
        />
      </Modal>
    </>
  );
};
