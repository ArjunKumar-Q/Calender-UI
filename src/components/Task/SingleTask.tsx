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
import { PencilLine, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const SingleTask = ({
  task,
  isListItem = false,
  deleteHandler,
  IsDayOrWeekView = false
}: {
  task: Schedule;
  isListItem?: boolean;
  deleteHandler?: React.Dispatch<React.SetStateAction<Schedule[]>>;
  IsDayOrWeekView?:boolean
}) => {
  const deleteTask = () => {
    if (deleteHandler) {
      deleteHandler((prev) => prev.filter((t) => t.end !== task.end));
    }
  };

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
            IsDayOrWeekView && 'h-4/6 w-40 items-center'
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
                  <PencilLine className="size-4" />
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
                <span className="text-xs">
                  {" "}
                  Time:{" "}
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
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogOverlay className="opacity-30" />
      <DialogContent className="h-96 p-4">
        <div className=" relative h-full border  rounded-md border-gray-200 flex ">
          <div className="h-full border-r border-gray-200 w-1/2 flex flex-col gap-y-3 px-4 py-2">
            <div className="truncate capitalize">
              <span className="font-bold text-sm">Interview With :</span>{" "}
              <span className="text-sm">
                {task.user_det.candidate.candidate_firstName}
              </span>
            </div>
            <div className="truncate capitalize">
              <span className="font-bold text-sm">Position :</span>{" "}
              <span className="text-sm">{task.job_id.jobRequest_Title}</span>
            </div>
            <div className="truncate capitalize">
              <span className="font-bold text-sm">Created by :</span>{" "}
              <span className="text-sm"> - </span>
            </div>
            <div className="truncate capitalize">
              <span className="font-bold text-sm">Interview Date :</span>{" "}
              <span className="text-sm">
                {new Date(task?.start).toDateString()}
              </span>
            </div>
            <div className="truncate capitalize">
              <span className="font-bold text-sm">Interview Time :</span>{" "}
              <span className="text-sm">
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
            </div>
            <div className="truncate capitalize">
              <span className="font-bold text-sm">Interview Via :</span>{" "}
              <span className="text-sm">Google Meet</span>
            </div>
            <div className=" flex flex-col gap-y-2">
              <button
                disabled
                className="border border-[#006dbf] bg-white text-[#006dbf] px-4 py-2 rounded-lg shadow-md w-full"
              >
                <div className="flex justify-between items-center">
                  <span>Resume.docx</span>
                  <div className="flex gap-x-2">
                    <img
                      src={eye}
                      alt="view"
                      className="size-5 cursor-pointer "
                    />
                    <img
                      src={download}
                      alt="view"
                      className="size-5 cursor-pointer "
                    />
                  </div>
                </div>
              </button>
              <button
                disabled
                className="border border-[#006dbf] bg-white text-[#006dbf] px-4 py-2 rounded-lg shadow-md w-full"
              >
                <div className="flex justify-between items-center">
                  <span>AdharCard.docx</span>
                  <div className="flex gap-x-2">
                    <img
                      src={eye}
                      alt="view"
                      className="size-5 cursor-pointer "
                    />
                    <img
                      src={download}
                      alt="view"
                      className="size-5 cursor-pointer "
                    />
                  </div>
                </div>
              </button>
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
