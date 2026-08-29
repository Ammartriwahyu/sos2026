import { BadgeSos, BadgeSosProps } from "@/shared/components/ui/BadgeSos26";
import SectionTitle from "@/shared/components/SectionTitle";

interface DetailHeaderProps {
  judul: string;
  deadline: string;
  statusText: string;
  statusVariant: BadgeSosProps["variant"];
}

export const DetailHeader = ({
  judul,
  deadline,
  statusText,
  statusVariant,
}: DetailHeaderProps) => {
  return (
    <div className="flex flex-col items-center w-full gap-6">
      <SectionTitle
        animated={false}
        as="h1"
        className="max-w-none text-2xl md:text-3xl lg:text-4xl"
      >
        {judul}
      </SectionTitle>

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        <p className="text-white text-sm md:text-base font-normal text-center md:text-left">
          Deadline : {deadline}
        </p>

        <BadgeSos variant={statusVariant} className="text-sm px-6 py-2">
          {statusText}
        </BadgeSos>
      </div>
    </div>
  );
};
