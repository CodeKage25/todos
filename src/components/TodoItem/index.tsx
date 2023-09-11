import { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../sheet";
import TaskInfo from "../TaskInfo";
import AddTask from "../AddTask";
import TodoItemBody from "./TodoItemBody";
type Props = {
  completed?: boolean;
  title: string;
  id: string;
  date?: Date;
  startTime: string;
  endTime: string;
};
export default function TodoItem({
  completed = false,
  title,
  id,
  date = new Date(),
  startTime,
  endTime,
}: Props) {
  const [showInfo, setShowInfo] = useState(true);
  return (
    <>
      <div className="block lg:hidden">
        <Sheet>
          <SheetContent side="bottom" className="rounded-t-3xl">
            <div className="grid gap-4 py-4">
              {showInfo ? (
                <TaskInfo setShowInfo={setShowInfo} />
              ) : (
                <AddTask CloseComponent={SheetClose} type="edit" />
              )}
            </div>
          </SheetContent>
          <SheetTrigger className="w-full" onClick={() => setShowInfo(true)}>
            <TodoItemBody
              completed={completed}
              title={title}
              id={id}
              date={date}
              startTime={startTime}
              endTime={endTime}
            />
          </SheetTrigger>
        </Sheet>
      </div>
      <div className="hidden lg:block w-full">
        <TodoItemBody
          completed={completed}
          title={title}
          id={id}
          date={date}
          startTime={startTime}
          endTime={endTime}
        />
      </div>
    </>
  );
}
