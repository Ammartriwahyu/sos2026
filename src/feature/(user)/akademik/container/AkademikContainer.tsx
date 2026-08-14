import DepartemenSection from "../components/DepartemenSection";
import ProdiSection from "../components/ProdiSection";
import GrassDivider from "@/shared/components/background/GrassDivider";

export const AkademikContainer = () => {
  return (
    <main className="space-bg overflow-x-hidden">
      <DepartemenSection />
      <GrassDivider className="md:-mt-24 lg:-mt-32" />
      <ProdiSection />
    </main>
  );
};
