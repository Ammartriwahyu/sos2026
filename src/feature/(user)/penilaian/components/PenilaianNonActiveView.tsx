import MaskotEmptyState from "@/shared/components/ui/MaskotEmptyState";

export const PenilaianNonActiveView = () => {
  return (
    <div className="relative flex w-full flex-1 flex-col">
      <MaskotEmptyState message="Tunggu dulu yaa, nanti nilainya keluar" />
    </div>
  );
};
