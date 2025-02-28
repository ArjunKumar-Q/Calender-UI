import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
} from "../ui/dialog";
import eye from "../../assets/eye.svg";
import download from "../../assets/download.svg";
import meet from "../../assets/meet.svg";
import { Schedule } from "../types/types";
import { cn } from "@/lib/utils";

import { PencilLine, Trash } from "lucide-react";
import { format } from "date-fns";
import { ReactNode, useCallback, memo } from "react";

const SingleTask = ({
  task,
  isListItem = false,
  deleteHandler,
  IsDayOrWeekView = false,
}: {
  task: Schedule;
  isListItem?: boolean;
  deleteHandler?: React.Dispatch<React.SetStateAction<Schedule[]>>;
  IsDayOrWeekView?: boolean;
}) => {
  const deleteTask = useCallback(() => {
    if (deleteHandler) {
      deleteHandler((prev) => prev.filter((t) => t.id !== task.id));
    }
  }, [deleteHandler, task.id]);

  const editHandler = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.stopPropagation();
      alert("You have clicked the Edit button.");
    },
    []
  );

  const Time = memo(() => {
    return (
      <span className="text-[0.75rem]">
        {" "}
        Time :{" "}
        {`${new Date(task?.start).getHours() % 12}:${
          !new Date(task?.start).getMinutes()
            ? "00"
            : new Date(task?.start).getMinutes()
        }`}{" "}
        -{" "}
        {`${new Date(task?.end).getHours() % 12}:${new Date(
          task?.end
        ).getMinutes()}`}{" "}
        {new Date(task?.end).getHours() > 12 ? "PM" : "AM"}
      </span>
    );
  });

  const DialogButton = memo(({ title }: { title: string }) => (
    <button
      disabled
      className="border border-[#006dbf] hover:bg-blue-100 bg-white text-[#006dbf] px-4 py-2 rounded-lg shadow-md w-full"
    >
      <div className="flex justify-between items-center">
        <span>{title}</span>
        <div className="flex gap-x-2">
          <img src={eye} alt="view" className="size-5 cursor-pointer " />
          <img src={download} alt="view" className="size-5 cursor-pointer " />
        </div>
      </div>
    </button>
  ));

  const DialogItem = memo(
    ({ title, value }: { title: string; value: string | ReactNode }) => {
      return (
        <div className="truncate capitalize">
          <span className="font-bold text-sm">{title}</span>{" "}
          <span className="text-sm">{value}</span>
        </div>
      );
    }
  );

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className={cn("overflow-hidden", isListItem && "rounded-none border-b")}
      >
        <div
          className={cn(
            "h-16 bg-white   flex cursor-pointer focus:bg-[#d4effe] mt-1",
            isListItem ? " h-24 py-2" : "h-16 shadow-lg",
            IsDayOrWeekView && "h-4/6 w-40 items-center"
          )}
          tabIndex={0}
          id="task"
        >
          <div className="w-1/12 h-full bg-[#2b7dc9]"></div>
          <div
            className={cn("flex flex-col gap-y-1  w-11/12 items-start px-2")}
          >
            {isListItem ? (
              <div className="flex justify-between items-center w-full">
                <span className="text-xs capitalize">
                  {" "}
                  {task?.job_id?.jobRequest_Title}
                </span>
                <div className="flex gap-x-2">
                  <PencilLine className="size-4" onClick={editHandler} />
                  <Trash className="size-4 text-red-600" onClick={deleteTask} />
                </div>
              </div>
            ) : (
              <span className="text-[0.75rem] capitalize">
                {" "}
                {task?.job_id?.jobRequest_Title}
              </span>
            )}

            {isListItem ? (
              <div className="flex gap-x-2 items-center">
                <span className="text-xs truncate">{task?.summary}</span>{" "}
                <span className="text-sm">|</span>
                <span className="text-xs truncate">
                  Interviewer : {task?.user_det.handled_by.firstName}
                </span>
              </div>
            ) : (
              <span className="text-[0.75rem] truncate">
                Interviewer : {task?.user_det.handled_by.firstName}
              </span>
            )}

            {isListItem ? (
              <div className="flex px-0 w-full items-center ">
                <span className="text-xs">
                  Date:{" "}
                  {format(new Date(task?.start).toDateString(), "dd MMM yyyy")}
                </span>
                <span className="text-xs">&nbsp;|&nbsp;</span>
                <Time />
              </div>
            ) : (
              <Time />
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogOverlay className="opacity-30" />
      <DialogContent className="h-96 p-4">
        <div className=" relative h-full border  rounded-md border-gray-200 flex ">
          <div className="h-full border-r border-gray-200 w-1/2 flex flex-col gap-y-3 px-4 py-2">
            <DialogItem
              title={"Interview With :"}
              value={task.user_det.candidate.candidate_firstName}
            />
            <DialogItem
              title={"Position :"}
              value={task.job_id.jobRequest_Title}
            />
            <DialogItem title={"Created by "} value={" - "} />
            <DialogItem
              title={"Interview Date :"}
              value={new Date(task?.start).toDateString()}
            />
            <DialogItem title={"Interview Time :"} value={<Time />} />
            <DialogItem title={"Interview Via :"} value={"Google Meet"} />

            <div id="button-grp" className=" flex flex-col gap-y-2">
              <DialogButton title="Resume.docx" />
              <DialogButton title="AdharCard.docx" />
            </div>
          </div>

          <div className=" h-full w-1/2 grid place-items-center">
            <div className="flex flex-col justify-center items-center">
              <img src={meet} alt="Google Meet" className="size-30  p-2 my-4" />
              <a
                href={task.link}
                target="_blank"
                className="bg-[#006dbf] w-2/3 h-10 text-white rounded-md grid place-items-center uppercase font-semibold"
              >
                Join
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SingleTask;
