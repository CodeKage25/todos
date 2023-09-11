import classNames from "classnames";
import { useState } from "react";
import { useMenuContext } from "../../Context/menu.context";
import { useTodoContext } from "../../Context/todo.context";
import { format } from "date-fns";
import todoService from "../../services";
import "./todo.css";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  completed?: boolean;
  title: string;
  id: string;
  date?: Date;
  startTime: string;
  endTime: string;
};
export default function TodoItemBody({
  completed = false,
  title,
  id,
  date = new Date(),
  startTime,
  endTime,
}: Props) {
  const queryClient = useQueryClient();
  let today = new Date();
  const [taskCompleted, setTaskCompleted] = useState(completed);
  const [, setCurrentMenu] = useMenuContext();
  const [currentTodo, setCurrentTodo] = useTodoContext();
  const selectTodo = (id: string) => {
    setCurrentTodo(id);
    setCurrentMenu("info");
  };

  const changeTodoCompletedState = () => {
    setTaskCompleted(!taskCompleted);
    todoService.editTodoCompletedState(id, !taskCompleted);
    queryClient.refetchQueries(["todos"]);
  };

  return (
    <div
      className={classNames(
        " animate-in fade-in flex lg:slide-in-from-top duration-1000 bg-gray-50 border-b border-b-gray-200 py-4 px-6  items-center mb-4 cursor-pointer",
        {
          "bg-[#EAEDFE]": currentTodo === id,
        }
      )}
      onClick={() => selectTodo(id)}
    >
      <input
        type="checkbox"
        className="mr-3 todo rounded-md "
        onClick={(e) => e.stopPropagation()}
        onChange={() => changeTodoCompletedState()}
        checked={taskCompleted}
      />
      <div
        className={classNames("flex flex-col items-start text-sm font-medium", {
          "line-through text-[#D0D5DD]": taskCompleted,
          "text-gray-900": !taskCompleted,
        })}
      >
        <span
          className={classNames("font-medium", {
            "line-through text-[#D0D5DD]": taskCompleted,
            "text-gray-900": !taskCompleted,
          })}
        >
          {title}
        </span>
        <span
          className={classNames("font-normal", {
            "line-through text-[#D0D5DD]": taskCompleted,
            "text-gray-600": !taskCompleted,
          })}
        >
          {startTime} - {endTime}
        </span>
      </div>
      <span className="ml-auto text-sm text-gray-600 capitalize">
        {format(new Date(date!), "MMM d") === format(today!, "MMM d")
          ? "today"
          : format(new Date(date!), "MMM d")}
      </span>
    </div>
  );
}
