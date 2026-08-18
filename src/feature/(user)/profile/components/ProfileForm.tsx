"use client";
import React from "react";
import { AuthProfile, EditProfileRequest } from "@/api/services/auth";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";

interface ProfileFormProps {
  user: AuthProfile | null;
  isEditing: boolean;
  formData: EditProfileRequest;
  onFormChange: (name: keyof EditProfileRequest, value: string) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  isEditing,
  formData,
  onFormChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange(e.target.name as keyof EditProfileRequest, e.target.value);
  };

  const handleGolonganDarahChange = (newValue: string) => {
    onFormChange("GolonganDarah", newValue);
  };

  const inputClassName =
    "w-full bg-transparent border border-gray-500 rounded-full h-10 px-4 text-white placeholder-gray-400 focus:border-[#C1B6FF] focus:border-2 focus:ring-4 focus:ring-[#C1B6FF]/30 outline-none transition-all text-sm";
  const labelClassName = "text-[#B7A9FF] text-sm font-semibold mb-2 block";
  const valueClassName = "text-white text-sm font-medium pt-2";
  const cardClassName =
    "bg-[#2A3441] rounded-xl shadow-lg border border-white/10 p-6 md:p-8";

  return (
    <div className="flex flex-col gap-6">
      {/* IDENTITAS CARD */}
      <div className={cardClassName}>
        <h2 className="text-white text-xl md:text-2xl font-bold mb-8">
          Identitas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div>
              <label className={labelClassName}>Nama Lengkap</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="NamaLengkap"
                  disabled
                  value={user?.nama || ""}
                  placeholder="Masukkan nama lengkap"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>{user?.nama || "-"}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>NIM</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="NIM"
                  disabled
                  value={user?.nim || ""}
                  placeholder="Masukkan NIM"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>{user?.nim || "-"}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>Email</label>
              {isEditing ? (
                <Input
                  type="email"
                  name="Email"
                  disabled
                  value={user?.email || ""}
                  placeholder="Masukkan email universitas"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>{user?.email || "-"}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>Nomor Telepon</label>
              {isEditing ? (
                <Input
                  type="tel"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleInputChange}
                  placeholder="Contoh: 08X-XXX-XXX-XXX"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>{user?.telp || "-"}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <div>
              <label className={labelClassName}>ID Line</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="Line"
                  value={formData.Line}
                  onChange={handleInputChange}
                  placeholder="Masukkan username ID Line"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>{user?.line || "-"}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>Jenis Kelamin</label>
              {isEditing ? (
                <Select
                  value={formData.Kelamin || ""}
                  onValueChange={(val) => onFormChange("Kelamin", val)}
                >
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className={valueClassName}>{user?.kelamin || "-"}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>Agama</label>
              {isEditing ? (
                <Select
                  value={formData.Agama || ""}
                  onValueChange={(val) => onFormChange("Agama", val)}
                >
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="Pilih agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Budha">Budha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className={valueClassName}>{user?.agama || "-"}</p>
              )}
            </div>

            <div>
              <label className={labelClassName}>Golongan Darah</label>
              {isEditing ? (
                <Select
                  value={formData.GolonganDarah || ""}
                  onValueChange={handleGolonganDarahChange}
                >
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="Pilih golongan darah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className={valueClassName}>{user?.golongan_darah || "-"}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CARDS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* INFORMASI KESEHATAN CARD */}
        <div className={cardClassName}>
          <h2 className="text-white text-xl md:text-2xl font-bold mb-8">
            Informasi Kesehatan
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <label className={labelClassName}>Riwayat Penyakit</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="RiwayatPenyakit"
                  value={formData.RiwayatPenyakit}
                  onChange={handleInputChange}
                  placeholder="Masukkan riwayat penyakit"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>
                  {user?.riwayat_penyakit || "-"}
                </p>
              )}
            </div>
            <div>
              <label className={labelClassName}>Alergi Makanan</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="AlergiMakanan"
                  value={formData.AlergiMakanan}
                  onChange={handleInputChange}
                  placeholder="Masukkan alergi makanan"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>{user?.alergi_makanan || "-"}</p>
              )}
            </div>
            <div>
              <label className={labelClassName}>Alergi Obat</label>
              {isEditing ? (
                <Input
                  type="text"
                  name="AlergiObat"
                  value={formData.AlergiObat}
                  onChange={handleInputChange}
                  placeholder="Masukkan alergi obat"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>{user?.alergi_obat || "-"}</p>
              )}
            </div>
          </div>
        </div>

        {/* DETAIL CARD */}
        <div className={cardClassName}>
          <h2 className="text-white text-xl md:text-2xl font-bold mb-8">
            Detail
          </h2>
          <div className="flex flex-col gap-6">
            <div>
              <label className={labelClassName}>Distrik</label>
              {isEditing ? (
                <Input
                  type="text"
                  disabled
                  value={user?.kelompok?.distrik?.id_distrik?.toString() || ""}
                  placeholder="Masukkan distrik"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>
                  {user?.kelompok?.distrik?.id_distrik || "-"}
                </p>
              )}
            </div>
            <div>
              <label className={labelClassName}>Nama Distrik</label>
              {isEditing ? (
                <Input
                  type="text"
                  disabled
                  value={user?.kelompok?.distrik?.nama_distrik || ""}
                  placeholder="Masukkan nama kelompok"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>
                  {user?.kelompok?.distrik?.nama_distrik || "-"}
                </p>
              )}
            </div>
            <div>
              <label className={labelClassName}>Kelompok</label>
              {isEditing ? (
                <Input
                  type="text"
                  disabled
                  value={user?.kelompok?.id_kelompok?.toString() || ""}
                  placeholder="Masukkan kelompok"
                  className={inputClassName}
                />
              ) : (
                <p className={valueClassName}>
                  {user?.kelompok?.id_kelompok || "-"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
