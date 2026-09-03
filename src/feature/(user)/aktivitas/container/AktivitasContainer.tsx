"use client";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import AktivitasBeforeLogin from "../components/AktivitasBeforeLogin";
import AktivitasAfterLogin from "../components/AktivitasAfterLogin";

const AktivitasContainer = () => {
  const { user, isLoading } = useAuthContext();
  return (
    <main className="bg-login lg:min-h-screen overflow-x-hidden mt-5 ">
      {isLoading ? null : !user ? (
        <AktivitasBeforeLogin />
      ) : (
        <AktivitasAfterLogin user={user} />
      )}
    </main>
  );
};

export default AktivitasContainer;
