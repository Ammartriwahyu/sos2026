import { Rangkaian } from "@/feature/(user)/penugasan/types";
import { Button } from "@/shared/components/ui/Button";

interface RangkaianTabsProps {
  rangkaianList: Rangkaian[];
  activeRangkaianId: string | null;
  onRangkaianChange: (id: string) => void;
}

export const RangkaianTabs = ({
  rangkaianList,
  activeRangkaianId,
  onRangkaianChange,
}: RangkaianTabsProps) => {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center justify-start md:justify-center gap-2 md:gap-4 whitespace-nowrap">
        {rangkaianList.map((rangkaian) => {
          const isActive = activeRangkaianId === rangkaian.ID;

          return (
            <Button
              key={rangkaian.ID}
              onClick={() => onRangkaianChange(rangkaian.ID)}
              size="large"
              className={`rounded-full px-4 md:px-6 transition-all duration-200 text-base focus:outline-none focus:ring-0 ${isActive
                  ? "!bg-[#605992] !hover:bg-[#524c7f] !active:bg-[#453f6c] font-semibold text-white !border-transparent shadow-none"
                  : "!bg-[#2A1F5C]/50 !hover:bg-[#2A1F5C]/70 border border-[#605992] font-normal text-white shadow-none"
                }`}
            >
              {rangkaian.Name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};