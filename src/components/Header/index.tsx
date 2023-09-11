import Button from "../Button";
import { AiOutlinePlus } from "react-icons/ai";
import { useMenuContext } from "../../Context/menu.context";
import { useTodoContext } from "../../Context/todo.context";
export default function Header() {
  const [, setCurrentMenu] = useMenuContext();
  const [, setSelectedTodoId] = useTodoContext();
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h3 className="text-3xl font-semibold text-gray-900">Good morning!</h3>
        <p className="text-base leading-6 text-gray-600">You got some tasks to do.</p>
      </div>
      <Button
      className="hidden lg:flex text-sm "
        onClick={() => {
          setCurrentMenu("add");
          setSelectedTodoId("");
        }}
      >
        <AiOutlinePlus className="text-xl" /> Create New Task
      </Button>
    </div>
  );
}
