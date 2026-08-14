import FaqSection from "../components/FAQ/FaqSection";
import Hero from "../components/Hero/HeroSection";
import Kegiatan from "../components/Kegiatan/KegiatanSection";
import Prodi from "../components/Prodi/ProdiSection";
import Rangkaian from "../components/Rangkaian/RangkaianSection";
import "../styles/animation.css";

const HomeContainer = () => {
  return (
    <main className="overflow-clip">
      <Hero />
      <Kegiatan />
      <Prodi />
      <Rangkaian />
      <FaqSection />
    </main>
  );
};

export default HomeContainer;
