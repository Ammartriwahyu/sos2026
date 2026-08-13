"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Arrow from "@/assets/user/arrow-memori.svg";
import { memoriData } from "../../data/memori";
import MemoriCard from "./MemoriCard";

const MemoriSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState("desktop");

  const totalItems = memoriData.length;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getVisibleMemories = () => {
    const visible = [];

    if (screenSize === "mobile") {
      visible.push(memoriData[currentIndex]);
    } else if (screenSize === "tablet") {
      for (let i = 0; i < 2; i++) {
        const index = (currentIndex + i) % totalItems;
        visible.push(memoriData[index]);
      }
    } else {
      for (let i = -1; i <= 1; i++) {
        const index = (currentIndex + i + totalItems) % totalItems;
        visible.push(memoriData[index]);
      }
    }

    return visible;
  };

  const visibleMemories = getVisibleMemories();

  const getActiveIndex = () => {
    if (screenSize === "mobile") return 0;
    if (screenSize === "tablet") return 0;
    return 1;
  };

  const activeIndex = getActiveIndex();

  const getGridClasses = () => {
    if (screenSize === "mobile") return "grid-cols-1";
    if (screenSize === "tablet") return "grid-cols-2";
    return "grid-cols-3";
  };

  return (
    <div className="content-container mx-auto mt-40">
      <h4 className="text-center font-semibold text-4xl w-fit mx-auto border-b-6 pb-2 border-primary-600">
        Memori
      </h4>
      <div className="w-full flex justify-between items-center gap-4 md:gap-10 mt-24">
        <button
          onClick={handlePrevious}
          className="opacity-100 hover:opacity-80 transition-opacity duration-300"
        >
          <Image
            className="scale-x-[-1] md:w-16 w-8"
            alt="previous arrow"
            src={Arrow}
          />
        </button>

        <div
          className={`grid w-full  xl:gap-4 gap-10 2xl:gap-10 overflow-hidden ${getGridClasses()}`}
        >
          {visibleMemories.map((memori, index) => (
            <Link
              key={`${memori.id}-${currentIndex}-${index}`}
              href={memori.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MemoriCard memori={memori} isActive={index === activeIndex} />
            </Link>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="opacity-100 hover:opacity-80 transition-opacity duration-300"
        >
          <Image className="md:w-16 w-8" alt="next arrow" src={Arrow} />
        </button>
      </div>
    </div>
  );
};

export default MemoriSection;
