import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { faqData } from "../../data/faq";

export const FaqAccordion = () => {
  return (
    <div className="relative w-full max-w-4xl px-4 mx-auto z-50 min-h-128 md:min-h-160">
      <AccordionPrimitive.Root
        type="single"
        collapsible
        className="flex flex-col gap-4 md:gap-8"
      >
        {faqData.map((faq) => (
          <AccordionPrimitive.Item
            key={faq.id}
            value={`item-${faq.id}`}
            className="liquid-glass group overflow-hidden rounded-xl transition-all"
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger
                className={cn(
                  "flex w-full flex-1 items-center justify-between p-4 md:py-6 md:px-8 gap-4 text-left text-base md:text-lg text-white transition-all font-medium",
                  "hover:bg-white/10",
                  "data-[state=open]:bg-white/10",
                )}
              >
                {faq.question}
                <ChevronDown className="size-6 md:size-7 shrink-0 text-white transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content className="overflow-hidden p-4 md:py-6 md:px-8 border-t border-white/15 text-justify text-sm md:text-base text-white/90 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              {faq.answer}
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        ))}
      </AccordionPrimitive.Root>
    </div>
  );
};
