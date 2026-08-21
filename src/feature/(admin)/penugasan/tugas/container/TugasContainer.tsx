import React, { useState } from "react";
import { useGetAllTugas } from "../hooks/useGetAllTugas";
import { TugasCard } from "../components/TugasCard";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import Link from "next/link";
import TugasForm from "../components/TugasForm";
import { Plus } from "lucide-react";
import { useRole } from "@/shared/hooks/useRole";

const TugasContainer = () => {
  const { data: tugas, isLoading, error, refresh } = useGetAllTugas();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isSqc } = useRole();
  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    refresh();
  };
  if (isLoading) {
    return <div>loading</div>;
  }
  if (!tugas) {
    return <div>Data Tugas Kosong</div>;
  }
  if (error) {
    return (
      <div>
        Error: {error} <button onClick={refresh}>Coba Lagi</button>
      </div>
    );
  }
  return (
    <section className="">
      <div className="flex justify-end">
        {isSqc && (
          <Button
            variant={"admin-outline"}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} className="mr-2" />
            Tambah Penugasan
          </Button>
        )}
      </div>
      <div className="mt-8 flex gap-9 flex-col">
        {tugas.map((tugas, idx) => (
          <Link
            href={`/admin/penugasan/tugas/${tugas.id_penugasan}`}
            key={tugas.id_penugasan}
          >
            <TugasCard tugas={tugas} idx={idx + 1} />
          </Link>
        ))}
      </div>
      <Modal
        title="Tambah Tugas Baru"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <TugasForm onSuccess={handleCreateSuccess} />
      </Modal>
    </section>
  );
};

export default TugasContainer;
