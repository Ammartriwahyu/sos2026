"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "../../data/faq";

const FaqList = ({ faq }: { faq: FAQ }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-full border rounded-xl hover:bg-white group border-white ${
        isOpen ? "bg-white" : ""
      }`}
    >
      <button
        type="button"
        className="w-full text-left flex items-center justify-between px-3 py-3 md:px-4 md:py-4 cursor-pointer"
        onClick={toggleFaq}
      >
        <h4
          className={`font-semibold group-hover:text-primary-500 text-sm md:text-base ${
            isOpen ? "text-primary-500" : "text-white"
          }`}
        >
          {faq.question}
        </h4>
        <div className="text-primary-500 group-hover:bg-primary-200 relative bg-white w-6 h-6 md:w-10 md:h-10 aspect-square rounded-full transition-transform duration-200 flex items-center justify-center">
          {isOpen ? (
            <ChevronUpIcon className="w-4 h-4 md:w-6 md:h-6 text-primary-500" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 md:w-6 md:h-6 text-primary-500" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-3 md:px-4 pb-3 md:pb-4 border-t-3 border-black/20">
              <p className="mt-2 md:mt-3 text-sm md:text-base leading-relaxed text-black font-medium">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqList;
