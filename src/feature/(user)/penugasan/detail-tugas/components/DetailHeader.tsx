import { BadgeSos, BadgeSosProps } from "@/shared/components/ui/BadgeSos26";

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
      <div className="w-full flex flex-col items-center">
        {/* Garis Gradien Atas */}
        <div
          className="w-full h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
          }}
        />

        {/* Kotak Gradien Tengah */}
        <div
          className="w-full h-[80px] flex items-center justify-center px-4"
          style={{
            background:
              "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.4) 50%, rgba(74, 52, 136, 0) 100%)",
          }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
            {judul}
          </h1>
        </div>

        {/* Garis Gradien Bawah */}
        <div
          className="w-full h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(74, 52, 136, 0) 0%, rgba(74, 52, 136, 0.7) 50%, rgba(74, 52, 136, 0) 100%)",
          }}
        />
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        <p className="text-white text-base md:text-lg font-normal text-center md:text-left">
          Deadline : {deadline}
        </p>

        <BadgeSos variant={statusVariant} className="text-sm px-6 py-2">
          {statusText}
        </BadgeSos>
      </div>
    </div>
  );
};
