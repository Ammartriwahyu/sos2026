import { ScrollProvider } from "@/shared/components/provider/ScrollProvider";

export default function TeamProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ScrollProvider>{children}</ScrollProvider>;
}
