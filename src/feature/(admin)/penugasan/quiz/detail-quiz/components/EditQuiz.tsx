"use client";

import React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import {
  UpdateQuizPayload,
  pertanyaan as Pertanyaan,
} from "@/api/services/admin/quiz";
import {
  PlusCircle,
  Trash2,
  Loader2,
  Save,
  FileText,
  Cross,
} from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface EditQuizFormProps {
  formData: UpdateQuizPayload;
  errors: ValidationErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  validateForm: () => { isValid: boolean; errors: ValidationErrors };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSelectChange: (name: keyof UpdateQuizPayload, value: string) => void;
  handleQuestionChange: (
    index: number,
    field: keyof Pertanyaan,
    value: string | number,
  ) => void;
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  rangkaianOptions: SelectOption[];
  isLoadingRangkaian: boolean;
}

const EditQuizForm: React.FC<EditQuizFormProps> = ({
  formData,
  errors,
  isSubmitting,
  onBack,
  onSubmit,
  validateForm,
  handleInputChange,
  handleSelectChange,
  handleQuestionChange,
  addQuestion,
  removeQuestion,
  rangkaianOptions,
  isLoadingRangkaian,
}) => {
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    await onSubmit(e);
  };

  const getChoiceBorderClass = (
    choice: string,
    correctAnswer: string,
    hasError: boolean,
  ) => {
    if (hasError) {
      return "border-2 border-red-500";
    }
    return correctAnswer === choice
      ? "border-2 border-green-500"
      : "border border-gray-300";
  };

  // Safe access to pertanyaan_list with null check
  const pertanyaanList = formData.pertanyaan_list || [];
  const questionCount = pertanyaanList.length;

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          onClick={onBack}
          variant={"admin-transparent"}
          className="space-x-2"
          disabled={isSubmitting}
        >
          <Cross className="rotate-45" size={16} />
          <span>Cancel Edit</span>
        </Button>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div className="text-center">
          <h4 className="font-bold text-2xl">Edit Kuis</h4>
          <h4 className="text-black-50">
            Isi form di bawah ini untuk edit kuis mahasiswa baru
          </h4>
        </div>
        <div className="rounded-lg space-y-4 p-4">
          <div>
            <label
              htmlFor="kuis_nama"
              className="block text-sm font-bold text-primary-normal mb-1"
            >
              Nama Kuis
            </label>
            <Input
              id="kuis_nama"
              name="kuis_nama"
              value={formData.kuis_nama || ""}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={errors.kuis_nama ? "border-red-500" : ""}
            />
            {errors.kuis_nama && (
              <p className="text-red-500 text-xs mt-1">{errors.kuis_nama}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="kuis_deskripsi"
              className="block text-sm font-bold text-primary-normal mb-1"
            >
              Deskripsi
            </label>
            <Textarea
              id="kuis_deskripsi"
              name="kuis_deskripsi"
              value={formData.kuis_deskripsi || ""}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={errors.kuis_deskripsi ? "border-red-500" : ""}
            />
            {errors.kuis_deskripsi && (
              <p className="text-red-500 text-xs mt-1">
                {errors.kuis_deskripsi}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="tenggat"
                className="block text-sm font-bold text-primary-normal mb-1"
              >
                Tenggat
              </label>
              <Input
                id="tenggat"
                name="tenggat"
                type="datetime-local"
                value={formData.tenggat || ""}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={errors.tenggat ? "border-red-500" : ""}
              />
              {errors.tenggat && (
                <p className="text-red-500 text-xs mt-1">{errors.tenggat}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="durasi_kuis"
                className="block text-sm font-bold text-primary-normal mb-1"
              >
                Durasi Kuis (menit)
              </label>
              <Input
                id="durasi_kuis"
                name="durasi_kuis"
                type="number"
                value={formData.durasi_kuis || ""}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={errors.durasi_kuis ? "border-red-500" : ""}
              />
              {errors.durasi_kuis && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.durasi_kuis}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="kesempatan"
                className="block text-sm font-bold text-primary-normal mb-1"
              >
                Kesempatan
              </label>
              <Input
                id="kesempatan"
                name="kesempatan"
                type="number"
                value={formData.kesempatan || ""}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={errors.kesempatan ? "border-red-500" : ""}
              />
              {errors.kesempatan && (
                <p className="text-red-500 text-xs mt-1">{errors.kesempatan}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="id_rangkaian"
              className="block text-sm font-bold text-primary-normal mb-1"
            >
              Rangkaian
            </label>
            <Select
              value={formData.id_rangkaian || ""}
              onValueChange={(value) =>
                handleSelectChange("id_rangkaian", value)
              }
              disabled={isSubmitting || isLoadingRangkaian}
            >
              <SelectTrigger
                className={errors.id_rangkaian ? "border-red-500" : ""}
              >
                <SelectValue
                  placeholder={
                    isLoadingRangkaian
                      ? "Memuat rangkaian..."
                      : "Pilih Rangkaian"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {rangkaianOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.id_rangkaian && (
              <p className="text-red-500 text-xs mt-1">{errors.id_rangkaian}</p>
            )}
          </div>
        </div>

        {/* Section Header dengan Hint Jumlah Soal */}
        <div className="flex flex-col items-center space-y-2">
          <h4 className="font-bold text-2xl">Soal Kuis</h4>
          <div className="flex items-center space-x-2  text-primary-normal px-4 py-2 rounded-lg border border-primary-light-hover">
            <FileText size={16} />
            <span className="text-sm font-medium">
              {questionCount === 0
                ? "Belum ada soal dalam kuis ini"
                : questionCount === 1
                  ? "1 soal telah ditambahkan"
                  : `${questionCount} soal telah ditambahkan`}
            </span>
          </div>
          {questionCount === 0 && (
            <p className="text-gray-500 text-sm text-center">
              Klik tombol Tambah Soal di bawah untuk mulai menambahkan soal ke
              kuis ini
            </p>
          )}
        </div>

        <div className="space-y-4">
          {pertanyaanList.map((item, index) => (
            <div
              key={item.id_pertanyaan}
              className="bg rounded-lg p-4 space-y-3 relative "
            >
              <h3 className="font-bold text-primary-normal">
                Soal {index + 1}
              </h3>
              <div>
                <Textarea
                  placeholder="Tulis judul pertanyaan di sini..."
                  value={item.judul_pertanyaan || ""}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "judul_pertanyaan",
                      e.target.value,
                    )
                  }
                  disabled={isSubmitting}
                  className={
                    errors[`question_${index}_title`] ? "border-red-500" : ""
                  }
                />
                {errors[`question_${index}_title`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`question_${index}_title`]}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {/* Choice A */}
                <div className="relative">
                  <div className="absolute left-3 top-3 bg-gray-100 text-gray-600 text-sm font-bold px-2 py-1 rounded z-10">
                    A
                  </div>
                  <Input
                    placeholder="Pilihan A"
                    value={item.pilihan_a || ""}
                    onChange={(e) =>
                      handleQuestionChange(index, "pilihan_a", e.target.value)
                    }
                    disabled={isSubmitting}
                    className={`pl-12 ${getChoiceBorderClass(
                      "A",
                      item.jawaban_benar || "",
                      !!errors[`question_${index}_a`],
                    )}`}
                  />
                  {errors[`question_${index}_a`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`question_${index}_a`]}
                    </p>
                  )}
                </div>

                {/* Choice B */}
                <div className="relative">
                  <div className="absolute left-3 top-3 bg-gray-100 text-gray-600 text-sm font-bold px-2 py-1 rounded z-10">
                    B
                  </div>
                  <Input
                    placeholder="Pilihan B"
                    value={item.pilihan_b || ""}
                    onChange={(e) =>
                      handleQuestionChange(index, "pilihan_b", e.target.value)
                    }
                    disabled={isSubmitting}
                    className={`pl-12 ${getChoiceBorderClass(
                      "B",
                      item.jawaban_benar || "",
                      !!errors[`question_${index}_b`],
                    )}`}
                  />
                  {errors[`question_${index}_b`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`question_${index}_b`]}
                    </p>
                  )}
                </div>

                {/* Choice C */}
                <div className="relative">
                  <div className="absolute left-3 top-3 bg-gray-100 text-gray-600 text-sm font-bold px-2 py-1 rounded z-10">
                    C
                  </div>
                  <Input
                    placeholder="Pilihan C"
                    value={item.pilihan_c || ""}
                    onChange={(e) =>
                      handleQuestionChange(index, "pilihan_c", e.target.value)
                    }
                    disabled={isSubmitting}
                    className={`pl-12 ${getChoiceBorderClass(
                      "C",
                      item.jawaban_benar || "",
                      !!errors[`question_${index}_c`],
                    )}`}
                  />
                  {errors[`question_${index}_c`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`question_${index}_c`]}
                    </p>
                  )}
                </div>

                {/* Choice D */}
                <div className="relative">
                  <div className="absolute left-3 top-3 bg-gray-100 text-gray-600 text-sm font-bold px-2 py-1 rounded z-10">
                    D
                  </div>
                  <Input
                    placeholder="Pilihan D"
                    value={item.pilihan_d || ""}
                    onChange={(e) =>
                      handleQuestionChange(index, "pilihan_d", e.target.value)
                    }
                    disabled={isSubmitting}
                    className={`pl-12 ${getChoiceBorderClass(
                      "D",
                      item.jawaban_benar || "",
                      !!errors[`question_${index}_d`],
                    )}`}
                  />
                  {errors[`question_${index}_d`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`question_${index}_d`]}
                    </p>
                  )}
                </div>

                {/* Choice E */}
                <div className="relative">
                  <div className="absolute left-3 top-3 bg-gray-100 text-gray-600 text-sm font-bold px-2 py-1 rounded z-10">
                    E
                  </div>
                  <Input
                    placeholder="Pilihan E"
                    value={item.pilihan_e || ""}
                    onChange={(e) =>
                      handleQuestionChange(index, "pilihan_e", e.target.value)
                    }
                    disabled={isSubmitting}
                    className={`pl-12 ${getChoiceBorderClass(
                      "E",
                      item.jawaban_benar || "",
                      !!errors[`question_${index}_e`],
                    )}`}
                  />
                  {errors[`question_${index}_e`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`question_${index}_e`]}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-10 gap-4 pt-2">
                <div className="w-1/2">
                  <label className="text-sm font-bold text-primary-normal">
                    Jawaban Benar
                  </label>
                  <Select
                    value={item.jawaban_benar || ""}
                    onValueChange={(value) =>
                      handleQuestionChange(index, "jawaban_benar", value)
                    }
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="E">E</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="button"
                variant="admin-outline"
                size="small"
                className="absolute -top-2 right-4"
                onClick={() => removeQuestion(index)}
                disabled={isSubmitting}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full pt-4">
          <Button
            type="button"
            variant="admin"
            className="space-x-2"
            onClick={addQuestion}
            disabled={isSubmitting}
          >
            <PlusCircle size={16} />
            <span>Tambah Soal</span>
          </Button>
          {errors.pertanyaan_list && (
            <p className="text-red-500 text-sm">{errors.pertanyaan_list}</p>
          )}
          <Button className="" type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {!isSubmitting && <Save size={16} className="mr-2" />}
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditQuizForm;
