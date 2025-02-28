import useFetch from "../hooks/useFetch";
import { Schedule } from "../types/types";
import MultipleTasks from "../Task/MultipleTasks";
import SingleTask from "../Task/SingleTask";

import { useCallback, useEffect, useState, useMemo } from "react";

const Day = ({ currentDate }: { currentDate: Date }) => {
  const [events, setEvents] = useState<Schedule[]>([]);
  const { data } = useFetch("/data/calendarfromtoenddate.json");

  const hours = useMemo(
    () =>
      Array.from(
        { length: 24 },
        (_, i) =>
          `${i === 0 ? 12 : i > 12 ? i - 12 : i} ${i < 12 ? "AM" : "PM"}`
      ),
    []
  );

  const findingEvents = useCallback(
    (hour: string) => {
      if (events && events.length > 0) {
        const eventsHeldToday = events?.filter(
          (event) =>
            new Date(event.start).toDateString() ===
            new Date(currentDate).toDateString()
        );
        const eventsHeldAtThisCurrentTime = eventsHeldToday.filter((event) =>
          hour.split(" ")[1] === "PM"
            ? new Date(event.start).getHours() % 12 ==
              Number(hour.split(" ")[0])
            : new Date(event.start).getHours() == Number(hour.split(" ")[0])
        );

        console.log(eventsHeldToday, eventsHeldAtThisCurrentTime);

        if (eventsHeldAtThisCurrentTime.length > 1) {
          return (
            <MultipleTasks data={eventsHeldAtThisCurrentTime} IsDayOrWeekView />
          );
        } else if (eventsHeldAtThisCurrentTime.length === 1) {
          const event = eventsHeldAtThisCurrentTime[0];
          const start = new Date(event.start);
          const end = new Date(event.end);
          const duration = (end.getTime() - start.getTime()) / (1000 * 60);
          const height = (duration / 60) * 110;

          return (
            <SingleTask
              task={eventsHeldAtThisCurrentTime[0]}
              IsDayOrWeekView
              height={`${height}px`}
            />
          );
        } else {
          return <></>;
        }
      }
    },
    [currentDate, events]
  );

  useEffect(() => {
    if (data) {
      setEvents(() => {
        if ((data as Schedule[]).length == 1) {
          return [data] as Schedule[];
        } else if ((data as Schedule[]).length > 1) {
          return data as Schedule[];
        } else {
          return [];
        }
      });
    }
  }, [currentDate, data]);

  return (
    <div className="grid grid-cols-1 border-t mt-4">
      {hours.map((hour, index) => (
        <div key={index} className="border-b text-gray-700 bg-gray-50 flex">
          <div className="w-40 h-30 border-r flex justify-center items-start text-[#2b7dc9] py-2">
            {hour}
          </div>
          <div className="flex px-3 h-30 py-2">{findingEvents(hour)}</div>
        </div>
      ))}
    </div>
  );
};

export default Day;
