"use client";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  emailornim: string;
  setEmailornim: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  handleSubmit: (event: React.FormEvent) => void;
}

export default function LoginForm({
  emailornim,
  setEmailornim,
  password,
  setPassword,
  isLoading,
  handleSubmit,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mx-auto z-20 h-fit w-[90%] max-w-[500px] rounded-3xl bg-[#171a3d]/60 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="px-6 py-12 lg:p-14">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-8 mb-8">
            <div className="flex flex-col space-y-1.5">
              <label
                className="text-sm font-medium text-white"
                htmlFor="emailornim"
              >
                Email atau NIM
              </label>
              <Input
                size={"small"}
                id="emailornim"
                type="text"
                placeholder="Email atau NIM"
                value={emailornim}
                onChange={(e) => setEmailornim(e.target.value)}
                required
                variant={"default"}
                state={"default"}
                className="bg-transparent border border-white/20 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label
                className="text-sm font-medium text-white"
                htmlFor="password"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <Input
                  size={"small"}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10 bg-transparent border border-white/20 text-white placeholder:text-gray-400 focus:border-white focus:ring-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="2xl:mt-12">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-sm bg-[#675C8E] hover:bg-[#544A76] active:bg-[#433B5F] focus:bg-[#544A76] border-none text-white"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
