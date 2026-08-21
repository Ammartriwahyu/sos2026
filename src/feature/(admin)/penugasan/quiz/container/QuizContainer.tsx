"use client";

import Link from "next/link";
import { useState } from "react";
import { useGetAllKuis } from "../hooks/useGetAllQuiz";
import { useQuizForm } from "../hooks/useQuizForm";
import { useSelectOptions } from "@/shared/hooks/useSelectOptions";
import { useToast } from "@/shared/hooks/useToast";
import { QuizCard } from "../components/QuizCard";
import { QuizForm } from "../components/QuizForm";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { Plus } from "lucide-react";
import { useRole } from "@/shared/hooks/useRole";

const QuizContainer = () => {
  const {
    data: quizList,
    isLoading,
    refresh: refreshQuizList,
  } = useGetAllKuis();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const { options: rangkaianOptions, isLoading: isLoadingRangkaian } =
    useSelectOptions("rangkaian");

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    refreshQuizList();
    showToast({
      type: "success",
      title: "Berhasil!",
      message: "Kuis baru berhasil dibuat",
    });
    form.resetForm();
  };

  const form = useQuizForm({
    onSuccess: handleCreateSuccess,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await form.handleSubmit();
    } catch (error) {
      showToast({
        type: "error",
        title: "Gagal!",
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.resetForm();
  };

  const sortedQuizList = quizList ? [...quizList].reverse() : [];
  const { isSqc } = useRole();

  if (isLoading) {
    return <div>Memuat data kuis...</div>;
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
            Tambah Kuis
          </Button>
        )}
      </div>

      {!sortedQuizList || sortedQuizList.length === 0 ? (
        <div className="text-center mt-10 text-gray-500">
          Belum ada kuis yang dibuat.
        </div>
      ) : (
        <div className="mt-8 flex gap-9 flex-col">
          {sortedQuizList.map((quiz, idx) => (
            <Link
              href={`/admin/penugasan/kuis/${quiz.id_kuis}`}
              key={quiz.id_kuis}
            >
              <QuizCard quiz={quiz} idx={idx + 1} />
            </Link>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Buat Kuis Baru"
        desc="Isi detail di bawah ini untuk menambahkan kuis baru."
      >
        <div className="mt-4">
          <QuizForm
            {...form}
            onSubmit={handleSubmit}
            rangkaianOptions={rangkaianOptions || []}
            isLoadingRangkaian={isLoadingRangkaian}
          />
        </div>
      </Modal>
    </section>
  );
};

export default QuizContainer;
