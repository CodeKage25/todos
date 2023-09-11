import close from "../../assets/x-close.png";
import { FiCalendar } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import Button from "../Button";
import { useMenuContext } from "../../Context/menu.context";
import { useGetTodos } from "../../hooks/queryHooks";
import { useTodoContext } from "../../Context/todo.context";
import { format } from "date-fns";
import todoService from "../../services";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
type Props = {
  setShowInfo?: any;
};
export default function TaskInfo({ setShowInfo }: Props) {
  const queryClient = useQueryClient();
  const [, setCurrentMenu] = useMenuContext();
  const [selectedTodoId, setSelectedTodoId] = useTodoContext();
  
  if (!selectedTodoId) return <div>Todo does not exist</div>;

  const { data: todos } = useGetTodos();
  let selectedTodo = todos?.data.find((item: any) => {
    return item.id == selectedTodoId;
  });

  let today = new Date();
  let date = selectedTodo.date;
  let startTime = selectedTodo.startTime;
  let endTime = selectedTodo.endTime;

  const deleteTodo = () => {
    todoService.removeTodoFromLocalStorage(selectedTodoId);
    setCurrentMenu("calendar");
    queryClient.refetchQueries(["todos"]);
    toast.success("Todo Deleted Successfully");
    setSelectedTodoId("")
  };

  return (
    <div className="lg:w-[394px] lg:h-min lg:p-5">
      <div className="flex justify-end mb-4">
        <img
          className="w-5 h-5 cursor-pointer hidden lg:block"
          src={close}
          alt="close"
          onClick={() => setCurrentMenu("calendar")}
        />
      </div>
      <p className="text-[#272727] text-lg font-bold mb-8">
        {selectedTodo.title}
      </p>
      <div className="flex items-center gap-2 mb-2">
        <FiCalendar className="text-xl text-[#3F5BF6]" />
        <span>
          {format(new Date(date!), "MMM d") === format(today!, "MMM d")
            ? "today"
            : format(new Date(date!), "MMM d")}{" "}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-[34px]">
        <AiOutlineClockCircle className="text-xl text-[#3F5BF6]" />
        <span>
          {startTime} - {endTime}
        </span>
      </div>

      <div className="flex gap-3 mb-40 lg:mb-0">
        <Button onClick={deleteTodo} primary={false} className="w-full">
          Delete
        </Button>
        <Button
          onClick={() => setCurrentMenu("edit")}
          className="w-full hidden lg:flex"
        >
          Edit
        </Button>
        <Button
          onClick={() => setShowInfo(false)}
          className="w-full flex lg:hidden"
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
