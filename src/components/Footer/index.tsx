import { BsFillMicFill } from "react-icons/bs";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../sheet";
import AddTask from "../AddTask";
import { useTodoContext } from "../../Context/todo.context";
export default function Footer() {
  const [, setCurrentTodo] = useTodoContext();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild onClick={() => setCurrentTodo("")}>
          <nav className="cursor-pointer px-4 md:px-20 py-5 flex justify-between border-t fixed lg:hidden bottom-0 w-full bg-white border-t-gray-200">
            <div className="py-2 px-3 rounded-lg flex items-center justify-between bg-[#F9FAFB] w-full border border-gray-300">
              <span className="text-lg text-[#475467]">Input task</span>
              <BsFillMicFill className="text-2xl text-[#3F5BF6]" />
            </div>
          </nav>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-3xl">
          <div className="grid gap-4 py-4">
            <AddTask CloseComponent={SheetClose} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
