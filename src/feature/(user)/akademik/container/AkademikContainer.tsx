import DepartemenSection from "../components/DepartemenSection";
import ProdiSection from "../components/ProdiSection";
import GrassDivider from "@/shared/components/background/GrassDivider";

export const AkademikContainer = () => {
  return (
    <main className="space-bg overflow-x-hidden">
      <DepartemenSection />
      <GrassDivider />
      <ProdiSection />
    </main>
  );
};
