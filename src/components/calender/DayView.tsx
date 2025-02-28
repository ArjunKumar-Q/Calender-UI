import useFetch from "../hooks/useFetch";
import { useCallback, useEffect, useState, useMemo } from "react";
import { Schedule } from "../types/types";
import MultipleTasks from "../Task/MultipleTasks";
import SingleTask from "../Task/SingleTask";

const Day = ({ currentDate }: { currentDate: Date }) => {
  const [events, setEvents] = useState<Schedule[]>([]);
  const { data } = useFetch("/data/calendar_meeting.json");  

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
    [currentDate, events]
  );

  useEffect(() => {
    if (data) {
      setEvents([data] as Schedule[]);
    }
  }, [currentDate, data]);

  return (
    <div className="grid grid-cols-1 border-t mt-4">
      {hours.map((hour, index) => (
        <div key={index} className="border-b text-gray-700 bg-gray-50 flex">
          <div className="w-40 h-30 border-r flex justify-center items-end text-[#2b7dc9]">
            {hour}
          </div>
          <div className="flex px-3 items-center">
            {calculatingEvents(hour)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Day;
