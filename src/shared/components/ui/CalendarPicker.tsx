import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const TINGGI_KALENDER = 340;

interface CalendarPickerProps {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  disabled: boolean;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth());
  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
  const [tempMinutes, setTempMinutes] = useState<string>("");
  const [bukaKeBawah, setBukaKeBawah] = useState<boolean>(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const preventCloseRef = useRef<boolean>(false);

  const parseDateTime = useCallback((dateString: string) => {
    if (!dateString) return null;

    try {
      if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
        const [datePart, timePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hours, minutes] = timePart.split(":").map(Number);

        return new Date(year, month - 1, day, hours, minutes, 0, 0);
      }

      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  }, []);

  const extractDateTimeComponents = useCallback(
    (dateString: string) => {
      if (!dateString) {
        const now = new Date();
        return {
          year: now.getFullYear(),
          month: now.getMonth(),
          day: now.getDate(),
          hours: 23,
          minutes: 59,
        };
      }

      if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/)) {
        const [datePart, timePart] = dateString.split("T");
        const [yearStr, monthStr, dayStr] = datePart.split("-");
        const [hoursStr, minutesStr] = timePart.split(":");

        return {
          year: parseInt(yearStr),
          month: parseInt(monthStr) - 1,
          day: parseInt(dayStr),
          hours: parseInt(hoursStr),
          minutes: parseInt(minutesStr),
        };
      }

      const date = parseDateTime(dateString);
      if (date) {
        return {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          hours: date.getHours(),
          minutes: date.getMinutes(),
        };
      }

      const now = new Date();
      return {
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        hours: 23,
        minutes: 59,
      };
    },
    [parseDateTime],
  );

  const currentComponents = useMemo(() => {
    return extractDateTimeComponents(value);
  }, [value, extractDateTimeComponents]);

  const selectedDate = useMemo(() => {
    return value ? parseDateTime(value) : null;
  }, [value, parseDateTime]);

  const currentHours = useMemo(() => {
    return currentComponents.hours.toString().padStart(2, "0");
  }, [currentComponents.hours]);

  const currentMinutes = useMemo(() => {
    return currentComponents.minutes.toString().padStart(2, "0");
  }, [currentComponents.minutes]);

  useEffect(() => {
    if (selectedDate) {
      setViewMonth(selectedDate.getMonth());
      setViewYear(selectedDate.getFullYear());
    }
  }, [selectedDate]);

  useEffect(() => {
    if (isOpen) {
      setTempMinutes(currentMinutes);
    }
  }, [isOpen, currentMinutes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (preventCloseRef.current) {
        preventCloseRef.current = false;
        return;
      }

      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const createDateTimeString = useCallback(
    (
      year: number,
      month: number,
      day: number,
      hours: number,
      minutes: number,
    ): string => {
      const yearStr = year.toString().padStart(4, "0");
      const monthStr = (month + 1).toString().padStart(2, "0");
      const dayStr = day.toString().padStart(2, "0");
      const hoursStr = hours.toString().padStart(2, "0");
      const minutesStr = minutes.toString().padStart(2, "0");

      return `${yearStr}-${monthStr}-${dayStr}T${hoursStr}:${minutesStr}`;
    },
    [],
  );

  const formatDisplayDate = useCallback(
    (dateStr: string): string => {
      if (!dateStr) return "Pilih tanggal";

      const components = extractDateTimeComponents(dateStr);

      const day = components.day.toString().padStart(2, "0");
      const month = (components.month + 1).toString().padStart(2, "0");
      const year = components.year;
      const hours = components.hours.toString().padStart(2, "0");
      const minutes = components.minutes.toString().padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
    [extractDateTimeComponents],
  );

  const handleDateSelect = useCallback(
    (day: number) => {
      preventCloseRef.current = true;

      const hours = currentComponents.hours;
      const minutes = currentComponents.minutes;

      const newDateTimeString = createDateTimeString(
        viewYear,
        viewMonth,
        day,
        hours,
        minutes,
      );

      onChange({ target: { value: newDateTimeString } });

      setTimeout(() => {
        setIsOpen(false);
        preventCloseRef.current = false;
      }, 150);
    },
    [
      currentComponents.hours,
      currentComponents.minutes,
      viewYear,
      viewMonth,
      createDateTimeString,
      onChange,
    ],
  );

  const handleTimeChange = useCallback(
    (newHours: string, newMinutes: string) => {
      const currentDateComponents = extractDateTimeComponents(value);

      let validMinutes = parseInt(newMinutes) || 0;
      validMinutes = Math.max(0, Math.min(59, validMinutes));

      const newDateTimeString = createDateTimeString(
        currentDateComponents.year,
        currentDateComponents.month,
        currentDateComponents.day,
        parseInt(newHours),
        validMinutes,
      );

      onChange({ target: { value: newDateTimeString } });
    },
    [value, extractDateTimeComponents, createDateTimeString, onChange],
  );

  const handleMinutesChange = useCallback(
    (inputValue: string) => {
      setTempMinutes(inputValue);

      if (inputValue === "" || /^\d+$/.test(inputValue)) {
        const minutesValue = inputValue === "" ? "0" : inputValue;
        handleTimeChange(currentHours, minutesValue);
      }
    },
    [currentHours, handleTimeChange],
  );

  const navigateMonth = useCallback(
    (direction: number) => {
      const newDate = new Date(viewYear, viewMonth + direction, 1);
      setViewMonth(newDate.getMonth());
      setViewYear(newDate.getFullYear());
    },
    [viewMonth, viewYear],
  );

  const renderCalendar = useCallback(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const today = new Date();

    const days: React.ReactElement[] = [];
    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === viewMonth &&
        today.getFullYear() === viewYear;

      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === viewMonth &&
        selectedDate.getFullYear() === viewYear;

      const isPast =
        new Date(viewYear, viewMonth, day) <
        new Date(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <button
          key={day}
          type="button"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isPast) {
              handleDateSelect(day);
            }
          }}
          disabled={isPast}
          className={`w-8 h-8 text-sm rounded transition-all flex items-center justify-center ${
            isSelected
              ? "bg-primary-normal text-white"
              : isToday
                ? "bg-primary-light text-primary-normal hover:bg-primary-light-hover"
                : isPast
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {day}
        </button>,
      );
    }

    return (
      <div
        className={`absolute left-0 p-3 bg-white border border-gray-200 rounded-lg shadow-lg w-72 z-50 ${
          bukaKeBawah ? "top-full mt-1" : "bottom-full mb-1"
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateMonth(-1);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={16} />
          </button>
          <h3 className="text-sm font-medium text-gray-900">
            {monthNames[viewMonth]} {viewYear}
          </h3>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateMonth(1);
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="text-xs text-gray-500 text-center py-1 font-medium"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-3">{days}</div>

        <div className="border-t pt-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-gray-500" />
            <span className="text-sm text-gray-700 font-medium">Waktu</span>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={currentHours}
              onChange={(e) => {
                e.stopPropagation();
                handleTimeChange(e.target.value, currentMinutes);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:border-primary-normal focus:ring-1 focus:ring-primary-light"
            >
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i.toString().padStart(2, "0");
                return (
                  <option key={i} value={hour}>
                    {hour}
                  </option>
                );
              })}
            </select>

            <span className="text-sm text-gray-500 font-medium">:</span>

            <input
              type="number"
              min="0"
              max="59"
              value={tempMinutes}
              onChange={(e) => {
                e.stopPropagation();
                const value = e.target.value;
                if (
                  value === "" ||
                  (parseInt(value) >= 0 && parseInt(value) <= 59)
                ) {
                  handleMinutesChange(value);
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                if (value) {
                  const formattedValue = parseInt(value)
                    .toString()
                    .padStart(2, "0");
                  handleMinutesChange(formattedValue);
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 text-center focus:border-primary-normal focus:ring-1 focus:ring-primary-light"
            />
          </div>
        </div>
      </div>
    );
  }, [
    viewYear,
    viewMonth,
    selectedDate,
    currentHours,
    currentMinutes,
    tempMinutes,
    handleDateSelect,
    handleTimeChange,
    handleMinutesChange,
    navigateMonth,
    bukaKeBawah,
  ]);

  return (
    <div className="relative" ref={calendarRef}>
      <button
        type="button"
        onClick={() => {
          if (!isOpen && calendarRef.current) {
            const rect = calendarRef.current.getBoundingClientRect();
            const ruangAtas = rect.top;
            const ruangBawah = window.innerHeight - rect.bottom;
            setBukaKeBawah(
              ruangAtas < TINGGI_KALENDER && ruangBawah > ruangAtas,
            );
          }
          setIsOpen(!isOpen);
        }}
        disabled={disabled}
        className={`w-full flex items-center justify-between p-2 text-left rounded border border-gray-300 bg-white transition text-sm ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-primary-normal focus:border-primary-normal focus:ring-1 focus:ring-primary-light"
        }`}
      >
        <span
          className={`text-sm truncate ${
            value ? "text-gray-800" : "text-gray-500"
          }`}
        >
          {formatDisplayDate(value)}
        </span>
        <Calendar size={16} className="text-gray-400 ml-2 flex-shrink-0" />
      </button>

      {isOpen && renderCalendar()}
    </div>
  );
};
