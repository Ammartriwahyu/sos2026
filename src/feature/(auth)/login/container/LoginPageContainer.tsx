"use client";

import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";
import SpaceBackground from "@/shared/components/background/SpaceBackground";
import LoginDecorations from "../components/LoginDecorations";
import GrassDivider from "@/shared/components/background/GrassDivider";
import { Footer } from "@/shared/components/footer/Footer";

export default function LoginPageContainer() {
  const formLogic = useLoginForm();
  return (
    <div className="flex flex-col min-h-screen">
      <SpaceBackground className="flex-1 flex flex-col relative pt-32 pb-0 overflow-hidden">
        <LoginDecorations />

        {/* Bottom gradient glow (Gradasi bawah) */}
        <div className="absolute bottom-0 left-1/2 w-full max-w-[1200px] h-[400px] -translate-x-1/2 translate-y-1/2 opacity-70 pointer-events-none z-0">
          <div className="peta-glow inset-0 h-full w-full" />
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center mycontainer w-full pt-10 pb-44 lg:pt-16 lg:pb-64">
          <LoginForm {...formLogic} />
        </div>

        <div className="relative z-20 mt-auto w-full">
          <GrassDivider className="translate-y-px" />
          <div className="w-full h-16 md:h-24 peta-flashback-bg" />
        </div>
      </SpaceBackground>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}
