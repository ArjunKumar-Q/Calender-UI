import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Schedule } from "../types/types";
import SingleTask from "./SingleTask";
import { cn } from "@/lib/utils";

import { useState } from "react";
import { XIcon } from "lucide-react";

const MultipleTasks = ({
  data,
  IsDayOrWeekView = false,
}: {
  data: Schedule[];
  IsDayOrWeekView?: boolean;
}) => {
  const [tasks, setTasks] = useState([...data]);
  const [open, setOpen] = useState(false);

  const event = tasks[0];
  const start = new Date(event.start);
  const end = new Date(event.end);
  const duration = (end.getTime() - start.getTime()) / (1000 * 60); // To calculate the total duration in minutes
  const height = (duration / 60) * 110; // To calculate the height of the task

  return (
    tasks.length >= 1 && (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={cn("rounded-sm")}>
          <div
            className={cn(
              "h-16  w-12/12 bg-white shadow-lg flex cursor-pointer focus:bg-[#d4effe] mt-1 relative z-50 hover:z-[9999] ",
              IsDayOrWeekView && "w-40 items-center"
            )}
            style={{
              height: IsDayOrWeekView ? `${height}px` : "",
              marginTop: IsDayOrWeekView
                ? `${(start.getMinutes() / 60) * 120}px`
                : "auto",
            }}
            tabIndex={0}
            id="task"
          >
            <span className="absolute -top-2 -right-2 bg-yellow-400 w-5 h-5 grid place-items-center rounded-full text-sm">
              {tasks.length}
            </span>
            <div
              className={cn("w-1/12 h-full bg-[#2b7dc9] rounded-l-sm")}
            ></div>
            <div className="flex flex-col gap-y-1 w-11/12 items-start px-2">
              <span className="text-[0.75rem] capitalize">
                {" "}
                {tasks[0]?.job_id?.jobRequest_Title}
              </span>
              <span className="text-[0.75rem] truncate">
                Interviewer : {tasks[0]?.user_det.handled_by.firstName}
              </span>
              <span className="text-[0.75rem]">
                {" "}
                Time :{" "}
                {`${new Date(tasks[0]?.start).getHours() % 12}:${
                  !new Date(tasks[0]?.start).getMinutes()
                    ? "00"
                    : new Date(tasks[0]?.start).getMinutes()
                }`}{" "}
                -{" "}
                {`${new Date(tasks[0]?.end).getHours() % 12}:${new Date(
                  tasks[0]?.end
                ).getMinutes()}`}{" "}
                {new Date(tasks[0]?.end).getHours() > 12 ? "PM" : "AM"}
              </span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="h-fit p-1 flex flex-col gap-y-2"
          side="right"
          align="end"
        >
          <div className="w-full border-b pb-2 flex justify-between items-center px-2">
            <span className=" font-semibold text-sm ">Meetings</span>
            <span
              className="size-5 grid place-items-center bg-[#006dbf] text-white rounded-full cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <XIcon className="size-4" />
            </span>
          </div>
          {tasks.map((task) => (
            <SingleTask
              task={task}
              key={task.id as number}
              isListItem
              deleteHandler={setTasks}
            />
          ))}
        </PopoverContent>
      </Popover>
    )
  );
};

export default MultipleTasks;
