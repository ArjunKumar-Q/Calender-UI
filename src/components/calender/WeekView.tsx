import useFetch from "../hooks/useFetch";
import MultipleTasks from "../Task/MultipleTasks";
import SingleTask from "../Task/SingleTask";
import { Schedule } from "../types/types";

import { format, startOfWeek, eachDayOfInterval, addDays } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

const Week = ({ currentDate }: { currentDate: Date }) => {
  const [events, setEvents] = useState<Schedule[]>([]);
  const { data } = useFetch("src/data/calendarfromtoenddate.json");

  const weekStart = startOfWeek(currentDate);
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  const hours = useMemo(
    () =>
      Array.from(
        { length: 24 },
        (_, i) =>
          `${i === 0 ? 12 : i > 12 ? i - 12 : i} ${i < 12 ? "AM" : "PM"}`
      ),
    []
  );

  const calculatingEvents = useCallback(
    (day: Date, hour: string) => {
      if (events && events.length > 0) {
        const eventsHeldToday = events.filter(
          (event) =>
            new Date(event.start).toDateString() ===
            new Date(day).toDateString()
        );
        const eventsHeldAtThisCurrentTime = eventsHeldToday.filter((event) =>
          hour.split(" ")[1] === "PM"
            ? new Date(event.start).getHours() % 12 ==
              Number(hour.split(" ")[0])
            : new Date(event.start).getHours() == Number(hour.split(" ")[0])
        );

        if (eventsHeldAtThisCurrentTime.length > 1) {
          return (
            <MultipleTasks data={eventsHeldAtThisCurrentTime} IsDayOrWeekView />
          );
        } else if (eventsHeldAtThisCurrentTime.length === 1) {
          return (
            <SingleTask task={eventsHeldAtThisCurrentTime[0]} IsDayOrWeekView />
          );
        } else {
          return <></>;
        }
      }
    },
    [events]
  );

  useEffect(() => {
    if (data) {
      setEvents(data as Schedule[]);
    }
  }, [data]);

  return (
    <div className="min-w-7xl overflow-x-auto">
      <div className=" grid grid-cols-8  mt-4">
        <div className="border-r p-2 text-gray-700 font-bold bg-transparent h-30  "></div>
        {weekDays.map((day) => (
          <div
            key={day.getDate()}
            className="border-r border-t p-2 text-center  h-30 flex flex-col text-sm justify-center items-center text-[#006dbf] "
          >
            <span>{format(day, "dd MMMM")}</span>
            <span>{format(day, "EEEE")}</span>
          </div>
        ))}
        {hours.map((hour, index) => (
          <div
            key={index}
            className="col-span-8 grid grid-cols-8 border-t h-30"
          >
            <div className="border-r border-l p-2 bg-gray-50 flex justify-center items-end text-[#2b7dc9]">
              {hour}
            </div>
            {weekDays.map((day) => (
              <div
                key={day.getDate()}
                className="border-r px-1 flex items-center justify-start "
                style={{}}
              >
                {calculatingEvents(day, hour)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Week;
