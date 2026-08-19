import LoginPageContainer from "@/feature/(auth)/login/container/LoginPageContainer";
import Navbar from "@/shared/components/navbar/Navbar";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import React, { Suspense } from "react";

const page = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <ToastProvider>
        <AuthProvider>
          <Navbar />
          <Suspense>
            <LoginPageContainer />
          </Suspense>
        </AuthProvider>
      </ToastProvider>
    </main>
  );
};

export default page;
