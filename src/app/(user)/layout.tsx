import { Footer } from "@/shared/components/footer/Footer";
import Navbar from "@/shared/components/navbar/Navbar";
import { QueryProvider } from "@/shared/components/provider/QueryProvider";
import { ScrollProvider } from "@/shared/components/provider/ScrollProvider";
import { AuthProvider } from "@/shared/context/AuthContext";
import { AuthErrorProvider } from "@/shared/context/AuthErrorContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import { protectedRoutes } from "@/shared/data/protectedRoutes";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ToastProvider>
          <AuthErrorProvider protectedRoutes={protectedRoutes}>
            <Navbar />
            <ScrollProvider>
              <main>{children}</main>
            </ScrollProvider>
            <Footer />
          </AuthErrorProvider>
        </ToastProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
