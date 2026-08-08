import Image from "next/image";
import CaturPattern from "@/assets/user/pembatas.svg";
import FaqSection from "../components/FAQ/FaqSection";
import Hero from "../components/Hero/HeroSection";
import Kegiatan from "../components/Kegiatan/Kegiatan";
import ProdiSection from "../components/Prodi/ProdiSection";
import RangkaianSection from "../components/Rangkaian/RangkaianSection";
import "../styles/animation.css";

const HomeContainer = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Kegiatan />
      <ProdiSection />
      <Image
        src={CaturPattern}
        alt="Pattern"
        className="w-full bg-secondary-500 h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
      <RangkaianSection />
      <Image
        src={CaturPattern}
        alt="Pattern"
        className="w-full bg-secondary-500 h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
      <FaqSection />
    </main>
  );
};

export default HomeContainer;
