"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import { PencilLine, Save } from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import { useProfile } from "../hooks/useProfile";

import SpaceBackground from "@/shared/components/background/SpaceBackground";
import CirclePurple from "@/assets/assetsos26/shared/circle-purple.svg";
import GrassDivider from "@/shared/components/background/GrassDivider";

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
    <SpaceBackground className="flex flex-col min-h-screen pt-24 pb-0 font-poppins relative overflow-hidden">
      <div className="absolute top-[-300px] right-0 pointer-events-none z-0 flex items-center justify-end h-[600px]">
        <Image
          src={CirclePurple}
          alt="Circle"
          className="h-full w-auto object-contain opacity-60"
        />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-[#3D2AA8] rounded-full blur-[140px] opacity-70"></div>
      </div>

      <div className="absolute bottom-16 md:bottom-24 left-0 pointer-events-none z-0 flex items-center justify-start h-[200px] md:h-[450px]">
        <Image
          src={CirclePurple}
          alt="Circle"
          className="hidden md:block h-full w-auto object-contain -scale-x-100 opacity-60"
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#4C34D2] rounded-full blur-[90px] md:blur-[120px] opacity-60 md:opacity-70"></div>
      </div>

      <div className="absolute top-[25%] left-0 pointer-events-none z-0 flex items-center justify-start h-[300px]">
        <Image
          src={CirclePurple}
          alt="Circle"
          className="h-full w-auto object-contain -scale-x-100 opacity-50"
        />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#4C34D2] rounded-full blur-[100px] opacity-60"></div>
      </div>

      <section className="px-6 md:px-8 relative z-10 w-full max-w-5xl mx-auto flex-1 mb-8 md:mb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <h4 className="text-white text-3xl md:text-4xl font-bold tracking-wide">
            Profil
          </h4>

          <div className="w-full md:w-auto flex justify-start md:justify-end">
            {isEditing ? (
              <div className="flex gap-3 md:gap-4 items-center w-full md:w-auto">
                <Button
                  className="flex-1 md:flex-none h-10 md:h-12 px-4 md:px-8 bg-[#4CAF50] hover:bg-[#45a049] active:bg-[#3d8c40] focus:bg-[#4CAF50] text-white rounded-lg md:rounded-xl font-semibold shadow-md transition-all"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <span className="inline-flex items-center gap-2 text-sm md:text-base">
                    <Save
                      className={`h-4 w-4 ${loading ? "animate-spin" : "hidden"}`}
                    />
                    Simpan
                  </span>
                </Button>

                <Button
                  className="flex-1 md:flex-none h-10 md:h-12 px-4 md:px-8 bg-[#DE3B59] hover:bg-[#c9304a] active:bg-[#b02940] focus:bg-[#DE3B59] text-white rounded-lg md:rounded-xl font-semibold shadow-md transition-all"
                  onClick={handleCancel}
                >
                  <span className="inline-flex items-center gap-2 text-sm md:text-base">
                    Batal
                  </span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleEditToggle}
                className="w-full md:w-auto bg-[#6B5A9E] hover:bg-[#5b4a8c] active:bg-[#4c3e75] focus:bg-[#6B5A9E] text-white rounded-xl px-6 md:px-8 h-10 md:h-12 font-semibold shadow-md transition-all text-sm md:text-base"
              >
                <PencilLine className="h-4 w-4 mr-2" />
                <span>Edit Profil</span>
              </Button>
            )}
          </div>
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

      <div className="relative z-20 mt-auto w-full">
        <GrassDivider className="translate-y-px" />
        <div className="w-full h-16 md:h-24 peta-flashback-bg" />
      </div>
    </SpaceBackground>
  );
};

export default ProfileContainer;
