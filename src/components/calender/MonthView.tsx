import { Schedule } from "../types/types";
import useFetch from "../hooks/useFetch";
import SingleTask from "../Task/SingleTask";
import MultipleTasks from "../Task/MultipleTasks";

import {
  format,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { useState, useRef, useEffect } from "react";

const Month = ({ currentDate }: { currentDate: Date }) => {
  const [events, setEvents] = useState<Schedule[]>([]);
  const taskDates = useRef<string[]>([]);
  const { data } = useFetch("/data/calendarfromtoenddate.json");

  const startDate = startOfWeek(startOfMonth(currentDate));
  const endDate = endOfWeek(endOfMonth(currentDate));
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  useEffect(() => {
    if (Array.isArray(data)) {
      taskDates.current = data.map((task: Schedule) => {
        return new Date(task.start).toDateString();
      });
      setEvents(data as Schedule[]);
    }
  }, [data]);

  console.log(taskDates.current, currentDate.toDateString());

  return (
    <div className="min-w-7xl">
      <div className=" grid grid-cols-7 text-center font-semibold text-gray-700">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div
            key={day}
            className="p-2 uppercase text-[0.75rem] min-w- h-30 border border-gray-200/60  text-[#2b7dc9] grid place-items-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-7 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-3 border border-gray-200/60 h-28 font-semibold  ${
              format(day, "MM") !== format(currentDate, "MM")
                ? "text-transparent [&>#task]:hidden"
                : "text-black"
            }`}
          >
            {format(day, "d")}
            {taskDates &&
              taskDates.current.includes(day.toDateString()) &&
              (taskDates.current.filter((date) => date === day.toDateString())
                .length === 1 ? (
                events.map((task) => {
                  if (
                    new Date(task.start).toDateString() === day.toDateString()
                  ) {
                    return <SingleTask task={task} />;
                  }
                })
              ) : (
                <MultipleTasks
                  data={events.filter(
                    (item) =>
                      new Date(item.start).toDateString() == day.toDateString()
                  )}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Month;
