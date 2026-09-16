"use client";

import Sidebar from "@/shared/components/admin/sidebar/Sidebar";
import { AuthProvider } from "@/shared/context/AuthContext";
import { AuthErrorProvider } from "@/shared/context/AuthErrorContext";
import { ToastProvider } from "@/shared/context/ToastContext";

import { QueryProvider } from "@/shared/components/provider/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ToastProvider>
          <AuthErrorProvider>
            <div className="bg-[#EBEDF8] min-h-screen">
              <Sidebar />
              <section className="w-auto transition-all duration-300 sm:ml-20 xl:ml-64">
                <div className="px-6 py-8 md:px-8 lg:px-10">{children}</div>
              </section>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthErrorProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
