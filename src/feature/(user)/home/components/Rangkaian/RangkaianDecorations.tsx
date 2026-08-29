import Image from "next/image";
import Grass from "@/assets/assetsos26/shared/grass.svg";
import Asteroid from "@/assets/home/asteroid.svg";
import BatuIreng2 from "@/assets/home/batu-ireng-2.svg";
import PlanetCoklat from "@/assets/home/planet_coklat.webp";
import PlanetUngu from "@/assets/home/planet_ungu.webp";
import AuroraWaves from "@/feature/(user)/peta/components/AuroraWaves";

export default function RangkaianDecorations() {
  return (
    <>
      <div className="absolute top-px -translate-y-full w-[200vw] lg:w-screen left-0 pointer-events-none select-none z-20">
        <Image src={Grass} alt="Grass Divider" className="w-full h-auto" />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10">
        <div className="absolute inset-x-0 bottom-0 top-[20%]">
          <AuroraWaves />
        </div>
        <Image
          src={PlanetCoklat}
          alt="Planet Coklat"
          className="absolute right-[-12%] top-[2%] md:top-[10%] w-[70%] md:w-[34%] animate-float-basic select-none"
          draggable={false}
          style={{ animationDelay: "0s" }}
        />
        <Image
          src={PlanetUngu}
          alt="Planet Ungu"
          className="absolute left-[-9%] top-[25%] md:top-[35%] w-[70%] md:w-[33%] animate-float-basic select-none"
          draggable={false}
          style={{ animationDelay: "2s" }}
        />
        <Image
          src={Asteroid}
          alt="Asteroids"
          className="absolute right-[-2%] bottom-[35%] w-[60%] md:w-[21%] animate-float-basic select-none"
          draggable={false}
          style={{ animationDelay: "1s" }}
        />
        <Image
          src={BatuIreng2}
          alt="Batu Ireng"
          className="absolute bottom-0 right-[-30%] md:right-[-17%] w-[80%] md:w-[60%] lg:w-[34%] h-auto z-10"
          draggable={false}
        />
        <Image
          src={BatuIreng2}
          alt="Batu Ireng"
          className="absolute bottom-0 left-[-24%] md:left-[-12%] w-[50%] md:w-[50%] lg:w-[25%] h-auto z-10"
          draggable={false}
        />
      </div>
    </>
  );
}
