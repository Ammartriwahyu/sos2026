"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import { PencilLine, Save } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import { useProfile } from "../hooks/useProfile";

import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CirclePurple from "@/assets/assetsos26/shared/circle-purple.svg";

const ProfileContainer: React.FC = () => {
  const {
    user,
    isEditing,
    loading,
    formData,
    handleEditToggle,
    handleFormChange,
    handleSubmit,
    handleCancel,
  } = useProfile();

  return (
    <SpaceBackground className="min-h-screen pt-24 pb-14 font-poppins relative overflow-hidden">
      {/* Glowing Purple Orbs and Dashed Circles */}

      {/* Kanan Atas (mepet navbar) */}
      <div className="absolute top-[-300px] right-0 pointer-events-none z-0 flex items-center justify-end h-[600px]">
        <Image
          src={CirclePurple}
          alt="Circle"
          className="h-full w-auto object-contain opacity-60"
        />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-[#3D2AA8] rounded-full blur-[140px] opacity-70"></div>
      </div>

      {/* Kiri Bawah (mepet batu) */}
      <div className="absolute bottom-[-220px] left-0 pointer-events-none z-0 flex items-center justify-start h-[450px]">
        <Image
          src={CirclePurple}
          alt="Circle"
          className="h-full w-auto object-contain -scale-x-100 opacity-60"
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#4C34D2] rounded-full blur-[120px] opacity-70"></div>
      </div>

      {/* Kiri Kecil (sebelah kotak identitas) */}
      <div className="absolute top-[25%] left-0 pointer-events-none z-0 flex items-center justify-start h-[300px]">
        <Image
          src={CirclePurple}
          alt="Circle"
          className="h-full w-auto object-contain -scale-x-100 opacity-50"
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#4C34D2] rounded-full blur-[100px] opacity-60"></div>
      </div>

      <section className="mycontainer relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-row justify-between items-center md:items-center">
          <h4 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            Profil
          </h4>

          {isEditing ? (
            <div className="flex gap-4 items-center h-full">
              <Button
                className="h-10 md:h-12 px-6 md:px-8 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-lg md:rounded-xl font-semibold shadow-md transition-all"
                onClick={handleSubmit}
                disabled={loading}
              >
                <span className="inline-flex items-center gap-2">
                  <Save
                    className={`h-4 w-4 ${loading ? "animate-spin" : "hidden"}`}
                  />
                  Simpan Perubahan
                </span>
              </Button>

              <Button
                className="h-10 md:h-12 px-6 md:px-8 bg-[#DE3B59] hover:bg-[#c9304a] text-white rounded-lg md:rounded-xl font-semibold shadow-md transition-all"
                onClick={handleCancel}
              >
                <span className="inline-flex items-center gap-2">Batal</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleEditToggle}
              className="bg-[#6B5A9E] hover:bg-[#5b4a8c] text-white rounded-xl px-6 md:px-8 h-10 md:h-12 font-semibold shadow-md transition-all"
            >
              <PencilLine className="h-4 w-4 mr-2" />
              <span>Edit Profil</span>
            </Button>
          )}
        </div>
        <div className="mt-8 md:mt-10">
          <ProfileForm
            user={user}
            isEditing={isEditing}
            formData={formData}
            onFormChange={handleFormChange}
          />
        </div>
      </section>
    </SpaceBackground>
  );
};

export default ProfileContainer;
