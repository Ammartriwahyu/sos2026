"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export const AnimatedDiv = ({
  children,
  className,
  delay = 0,
  yOffset = 20,
}: AnimatedDivProps) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
