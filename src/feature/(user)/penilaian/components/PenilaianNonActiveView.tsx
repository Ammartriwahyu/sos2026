import MaskotEmptyState from "@/shared/components/ui/MaskotEmptyState";

export const PenilaianNonActiveView = () => {
  return (
    <div className="relative w-full mb-10 md:mb-16">
      <MaskotEmptyState message="Tunggu dulu yaa, nanti nilainya keluar" />
    </div>
  );
};
