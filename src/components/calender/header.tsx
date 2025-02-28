import { useCallback } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfMonth,
  endOfWeek,
  format,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { enUS } from "date-fns/locale";

const Header = ({
  currentDate,
  setDate,
  view,
  viewStateHandler,
}: {
  currentDate: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  view: string;
  viewStateHandler: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const endDate = endOfWeek(endOfMonth(currentDate));

  const weekStart = startOfWeek(currentDate);

  function addOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return [day, "th"];
    }
    switch (day % 10) {
      case 1:
        return [day, "st"];
      case 2:
        return [day, "nd"];
      case 3:
        return [day, "rd"];
      default:
        return [day, "th"];
    }
  }

  function formatDateWithOrdinal(date: Date) {
    const day = parseInt(format(date, "dd"), 10);
    const [calenderDate, superScript] = addOrdinalSuffix(day);
    const monthYear = format(date, "MMMM");

    return (
      <span>
        {calenderDate}
        <sup>{superScript}</sup> {monthYear}
      </span>
    );
  }

  const previousHandler = useCallback(() => {
    if (view === "year") setDate(subYears(currentDate, 1));
    if (view === "month") setDate(subMonths(currentDate, 1));
    if (view === "day") setDate(subDays(currentDate, 1));
    if (view === "week") setDate(subWeeks(currentDate, 1));
  }, [currentDate, setDate, view]);

  const nextHandler = useCallback(() => {
    if (view === "year") setDate(addYears(currentDate, 1));
    if (view === "month") setDate(addMonths(currentDate, 1));
    if (view === "day") setDate(addDays(currentDate, 1));
    if (view === "week") setDate(addWeeks(currentDate, 1));
  }, [view, setDate, currentDate]);

  const todayHandler = useCallback(() => {
    setDate(new Date());
    viewStateHandler("day");
  }, [setDate, viewStateHandler]);

  const ActiveButton = ({ title }: { title: string }) => {
    return (
      <button
        onClick={() => viewStateHandler(title.toLowerCase())}
        className={`px-1 capitalize ${
          view === title.toLocaleLowerCase()
            ? "border-b-2 border-[#2b7dc9] "
            : "bg-transparent"
        }`}
      >
        {title}
      </button>
    );
  };

  return (
    <>
      <div className="h-20 w-full flex justify-between items-center ">
        <span className="font-semibold text-gray-500">Your Todo's</span>
        <button className="text-[#2b7dc9] bg-white px-4 py-2 rounded-lg shadow-md">
          + Create Schedule
        </button>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-2 ">
        <div className="flex  items-center mb-4 gap-x-2">
          <button
            onClick={previousHandler}
            className="rounded-md shadow w-8 h-8 border border-[#2b7dc9] bg-white text-gray-500 text-xl font-bold flex items-start justify-center"
          >
            &lt;
          </button>
          <button
            onClick={nextHandler}
            className="rounded-md shadow w-8 h-8 border border-[#2b7dc9] bg-white text-gray-500 text-xl font-bold flex items-start justify-center"
          >
            &gt;
          </button>
          <button
            onClick={todayHandler}
            className="rounded-md shadow-md w-14  h-8 text-[#2b7dc9] bg-white  text-xl font-semibold flex items-center justify-center"
            title="Today"
          >
            {new Date().getDate()}
          </button>
        </div>

        <div>
          {view == "year" && (
            <span className="text-[#006dbf] font-semibold ">
              {currentDate.getFullYear()}
            </span>
          )}
          {view == "month" && (
            <span className="text-[#006dbf] font-semibold ">{`${format(
              currentDate,
              "LLLL",
              { locale: enUS }
            )} ${currentDate.getFullYear()}`}</span>
          )}
          {view == "week" && (
            <span className="text-[#006dbf] font-semibold ">
              {formatDateWithOrdinal(weekStart)} to{" "}
              {formatDateWithOrdinal(endDate)} {currentDate.getFullYear()}
            </span>
          )}
          {view == "day" && (
            <span className="text-[#006dbf] font-semibold ">
              {format(currentDate, "dd MMMM yyyy")}
            </span>
          )}
        </div>

        <div className=" w-full md:w-fit flex flex-row-reverse justify-between  mb-4 gap-x-5 pb-2">
          <ActiveButton title="year" />
          <ActiveButton title="month" />
          <ActiveButton title="week" />
          <ActiveButton title="day" />
        </div>
      </div>
    </>
  );
};

export default Header;
