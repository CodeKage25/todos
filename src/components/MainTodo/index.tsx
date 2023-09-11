import * as React from "react";
import DateIndicator from "../DateIndicator";
import Header from "../Header";
import Tasks from "../Tasks";
import AddTask from "../AddTask";
import TaskInfo from "../TaskInfo";
import Calendar from "../Calendar";
import { useMenuContext } from "../../Context/menu.context";

export default function MainTodo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentMenu] = useMenuContext();
  return (
    <main className="px-4 md:px-20 pt-12 pb-24 max-w-screen-2xl mx-auto">
      <Header />
      <div className="lg:flex lg:gap-6 lg:justify-between">
        <div className="lg:border-r w-full overflow-x-hidden lg:border-r-[#EAECF0] lg:pr-5">
          <DateIndicator selected={date} onSelect={setDate} />
          <Tasks selected={date} />
        </div>
        <div className="hidden lg:block h-min rounded-lg shadow-xl border border-gray-100">
          {currentMenu === "calendar" && (
            <Calendar mode="single" selected={date}  onSelect={setDate} />
          )}
          {currentMenu === "add" && <AddTask />}
          {currentMenu === "edit" && <AddTask type="edit" />}
          {currentMenu === "info" && <TaskInfo />}
        </div>
      </div>
    </main>
  );
}
