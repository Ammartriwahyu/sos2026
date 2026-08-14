import Image from "next/image";
import BatuParallax2 from "@/assets/home/batu-parallax-2.svg";

const FaqSection = () => {
  return (
    <div className="h-fit relative">
      <div className="absolute top-[-20%] md:top-[-40%] w-[150vw] lg:w-screen left-1/2 -translate-x-1/2 pointer-events-none select-none z-20">
        <Image
          src={BatuParallax2}
          alt="Batu Parallax"
          className="w-full h-auto"
        />
      </div>
      <div className="w-full content-container h-full relative  bg-red-800 overflow-hidden">
        <div className="w-[2418.07px] h-[2416.17px] left-[1642.21px] top-[1514.48px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_45.15%_45.21%_at_42.87%_63.48%,#8C021E_0%,rgba(234,91,67,0.32)_100%)] rounded-full blur-3xl" />
        <div className="w-[1886.76px] h-[1885.28px] left-[3110.80px] top-[200.88px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_44.88%_44.88%_at_50.29%_57.43%,#7D021A_0%,rgba(125,2,26,0.34)_100%)] rounded-full blur-xl" />
        <div className="max-w-7xl mx-auto relative my-40 flex justify-center items-center flex-col  space-y-4  md:p-0 h-full z-40 ">
          <h4 className="text-5xl font-bold mb-14 text-secondary-200 text-center">
            FAQ
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
