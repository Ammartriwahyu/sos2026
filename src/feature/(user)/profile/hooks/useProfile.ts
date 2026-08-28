import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { EditProfileRequest, authService } from "@/api/services/auth";
import { useToast } from "@/shared/hooks/useToast";
import { AxiosError } from "axios";

export const useProfile = () => {
  const { showToast } = useToast();

  const { user, refetch } = useAuthContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<EditProfileRequest>({
    Phone: "",
    Line: "",
    Agama: "",
    GolonganDarah: "",
    RiwayatPenyakit: "",
    AlergiObat: "",
    AlergiMakanan: "",
    Kelamin: "",
    JenisKelamin: "",
  });

  const resetFormData = useCallback(() => {
    if (user) {
      setFormData({
        Phone: user.telp || "",
        Line: user.line || "",
        Agama: user.agama || "",
        GolonganDarah: user.golongan_darah || "",
        RiwayatPenyakit: user.riwayat_penyakit || "",
        AlergiObat: user.alergi_obat || "",
        AlergiMakanan: user.alergi_makanan || "",
        Kelamin: user.kelamin || "",
        JenisKelamin: user.kelamin || "",
      });
    }
  }, [user]);

  useEffect(() => {
    resetFormData();
  }, [user, resetFormData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormChange = (name: keyof EditProfileRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "Kelamin" ? { JenisKelamin: value } : {}),
      ...(name === "JenisKelamin" ? { Kelamin: value } : {}),
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    const phone = formData.Phone;

    if (phone) {
      const phoneLength = phone.length;
      if (phoneLength < 10 || phoneLength > 15) {
        errors.push("Nomor telepon harus memiliki panjang 10-15 digit");
      }

      if (!/^\d+$/.test(phone)) {
        errors.push("Nomor telepon hanya boleh berisi angka");
      }
    }

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      showToast({
        type: "error",
        title: "Validasi Gagal",
        message: validationErrors.join(". "),
      });
      return;
    }

    setLoading(true);
    try {
      await authService.editProfile(formData);
      await refetch();
      setIsEditing(false);
      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Profil Anda berhasil diperbarui.",
      });
    } catch (error) {
      console.error("Edit profile error details:", error);
      let errorMessage = "Terjadi kesalahan yang tidak diketahui";

      if (error instanceof AxiosError) {
        console.error("Backend error response body:", error.response?.data);
        const data = error.response?.data;
        if (typeof data === "string") {
          errorMessage = data;
        } else if (data?.message) {
          errorMessage = data.message;
        } else if (data?.error) {
          errorMessage =
            typeof data.error === "string"
              ? data.error
              : JSON.stringify(data.error);
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      showToast({
        type: "error",
        title: "Gagal Memperbarui Profil",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetFormData();
  };

  return {
    user,
    isEditing,
    loading,
    formData,
    handleEditToggle,
    handleFormChange,
    handleSubmit,
    handleCancel,
  };
};
