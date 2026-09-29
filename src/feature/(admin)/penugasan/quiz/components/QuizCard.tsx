import { Quiz } from "@/api/services/admin/quiz";
import { Ellipsis, Eye, EyeOff } from "lucide-react";
import React from "react";
interface QuizCardProps {
  quiz: Quiz;
  idx: number;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, idx }) => {
  return (
    <div className="bg-admin-card hover:cursor-pointer flex justify-between items-center rounded-lg p-4">
      <div className="text-2xl items-center text-default-dark flex gap-2">
        <span className="font-medium">Kuis {idx}</span>
        <span>:</span>
        <span className="text-xl">({quiz.nama_kuis})</span>
      </div>
      <div className="flex items-center gap-4">
        {String(quiz.is_visible) === "true" ? (
          <>
            <Eye className="w-5 h-5 text-green-600" />
            <span className="text-green-600 text-sm">Terlihat</span>
          </>
        ) : (
          <>
            <EyeOff className="w-5 h-5 text-red-600" />
            <span className="text-red-600 text-sm">Tersembunyi</span>
          </>
        )}
        <Ellipsis className="rotate-90" />
      </div>
    </div>
  );
};
