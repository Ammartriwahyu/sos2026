import ProdiDesktop from "./ProdiDesktop";
import ProdiMobile from "./ProdiMobile";

export default function ProdiSection() {
  return (
    <>
      <ProdiMobile className="block md:hidden" />
      <ProdiDesktop className="hidden md:block" />
    </>
  );
}
