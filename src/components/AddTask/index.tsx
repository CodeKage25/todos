import close from "../../assets/x-close.png";
import bell from "../../assets/bell2.png";
import { FiCalendar } from "react-icons/fi";
import Button from "../Button";
import { useMenuContext } from "../../Context/menu.context";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Calendar from "../Calendar";
import React from "react";
import TimeInput from "../TimeInput";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useTodoContext } from "../../Context/todo.context";
import { useGetTodos } from "../../hooks/queryHooks";
import todoService from "../../services";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { toast } from "react-toastify";
import classNames from "classnames";

type Props = {
  type?: "add" | "edit";
  CloseComponent?: React.ForwardRefExoticComponent<
    SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>
  >;
};

export type formValuesType = {
  title: string;
  alarmTime: string;
};

export default function AddTask({ type = "add", CloseComponent }: Props) {
  const queryClient = useQueryClient();
  const [selectedTodoId] = useTodoContext();
  const { data: todos } = useGetTodos();
  let selectedTodoData = todos?.data?.find((x: any) => x.id === selectedTodoId);
  const addTodo = (
    title: string,
    alarmTime: string,
    date: Date,
    startTime: string,
    endTime: string
  ) => {
    todoService.addTodoToLocalStorage({
      title: title,
      completed: false,
      id: Math.floor(Math.random() * (9999 - 1000) + 1000),
      userId: 1,
      alarmTime: alarmTime,
      date: date,
      startTime: startTime,
      endTime: endTime,
    });
    toast.success("Todo Added Successfully");
    queryClient.refetchQueries(["todos"]);
  };
  const editTodo = (
    title: string,
    alarmTime: string,
    date: Date,
    startTime: string,
    endTime: string
  ) => {
    todoService.editTodoInLocalStorage(
      selectedTodoId,
      title,
      alarmTime,
      date,
      startTime,
      endTime
    );
    toast.success("Todo Edited Successfully");
    queryClient.refetchQueries(["todos"]);
  };

  const [, setCurrentMenu] = useMenuContext();
  const [startTime, setStartTime] = useState(
    selectedTodoData?.startTime ? selectedTodoData?.startTime : "10:00"
  );
  const [endTime, setEndTime] = useState(
    selectedTodoData?.endTime ? selectedTodoData?.endTime : "10:00"
  );
  const [alarm, setAlarm] = useState(true);
  const [date, setDate] = React.useState<Date | undefined>(
    selectedTodoData?.date ? selectedTodoData?.date : new Date()
  );
  let today = new Date();
  const { register, handleSubmit } = useForm<formValuesType>();
  const onSubmit = (data: any) => {
    type === "add"
      ? addTodo(data.title, data.alarmTime, date!, startTime, endTime)
      : editTodo(data.title, data.alarmTime, date!, startTime, endTime);
    // setCurrentMenu("calendar")
  };

  return (
    <form className="lg:w-[394px] lg:h-min lg:p-5">
      <div className="flex justify-between mb-4">
        <span className="text-gray-900 text-lg font-semibold">
          {type === "edit" ? "Edit Task" : "Add Task"}
        </span>
        <img
          className="w-5 h-5 cursor-pointer hidden lg:block"
          src={close}
          alt="close"
          onClick={() => setCurrentMenu("calendar")}
        />
      </div>
      <textarea
        defaultValue={selectedTodoData?.title ? selectedTodoData?.title : ""}
        {...register("title", { required: true })}
        className=" p-2 w-full h-[140px] bg-gray-50 border border-gray-300 rounded-lg resize-none mb-4"
      />
      <div className="flex items-center justify-between mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer flex items-center justify-center gap-2 border border-gray-300 shadow-sm rounded-lg py-[10px] px-4">
              <FiCalendar className="text-sm" />
              <span>
                {format(new Date(date!), "MMM d") === format(today!, "MMM d")
                  ? "today"
                  : format(new Date(date!), "MMM d")}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-4">
          <TimeInput
            name="startTime"
            value={startTime}
            setValue={setStartTime}
          />
          <TimeInput name="endTime" value={endTime} setValue={setEndTime} />
        </div>
      </div>
      {alarm ? (
        <div className="flex items-center mb-8">
          <img className="w-4 h-4 mr-2" src={bell} alt="bell" />
          <span className="font-inter text-[#667085] font-medium">
            <input
              {...register("alarmTime")}
              type="number"
              defaultValue={
                selectedTodoData?.alarmTime ? selectedTodoData?.alarmTime : 10
              }
              className="w-8"
            />{" "}
            Minute(s)
          </span>
          <img
            onClick={() => setAlarm(false)}
            className="w-4 h-4 ml-auto cursor-pointer"
            src={close}
            alt="close"
          />
        </div>
      ) : (
        <div className="flex items-center mb-8">
          <img className="w-4 h-4 mr-2" src={bell} alt="bell" />
          <span
            onClick={() => setAlarm(true)}
            className="cursor-pointer font-inter text-[#667085] font-medium"
          >
            Add alarm
          </span>
        </div>
      )}
      <div
        className={classNames("flex gap-3", {
          "mb-40 lg:mb-0": type === "edit",
        })}
      >
        {CloseComponent && (
          <CloseComponent asChild className="md:hidden w-full">
            <Button
              onClick={() => setCurrentMenu("calendar")}
              primary={false}
              className="w-full"
            >
              Cancel
            </Button>
          </CloseComponent>
        )}
        <Button
          onClick={() => setCurrentMenu("calendar")}
          primary={false}
          className="w-full hidden md:flex"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} className="w-full">
          {type === "edit" ? "Save" : "Add"}
        </Button>
      </div>
    </form>
  );
}
