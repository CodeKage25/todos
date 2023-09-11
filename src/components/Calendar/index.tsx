import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DayPicker,
  CaptionProps,
  useNavigation,
  DayContent,
  DayContentProps,
} from "react-day-picker";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { useGetTodos } from "../../hooks/queryHooks";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function DateTime(props: DayContentProps) {
  const { data: todos } = useGetTodos();
  const dateHasTodo = todos?.data.some(
    (todo: any) =>
      new Date(todo.date).toDateString() === props.date.toDateString()
  );
  const dateTime = format(props.date, "yyyy-MM-dd");
  return (
    <time dateTime={dateTime} className="relative ">
      <DayContent {...props} />
      {dateHasTodo && (
        <div className="h-1 w-1 absolute top-5 left-[5px] rounded-full bg-[#3F5BF6]"></div>
      )}
    </time>
  );
}

function CustomCaption(props: CaptionProps, selected: any, onSelect: any) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-[18px]">
        <button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          <ChevronLeft className="h-5 w-5 text-gray-500" />
        </button>
        <span className="text-gray-700 font-semibold">
          {format(props.displayMonth, "MMMM yyy")}
        </span>
        <button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[234px] border border-300 rounded-lg px-[14px] py-2 text-base">
          {selected ? format(selected, "MMM d, yyy") : "No Date Selected"}
        </div>
        <div
          onClick={() => onSelect(new Date())}
          className="cursor-pointer hover:bg-gray-300 border border-300 rounded-lg px-4 py-[10px] text-sm text-gray-700 font-semibold"
        >
          Today
        </div>
      </div>
    </div>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: any) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-[394px] h-min p-5", className)}
      classNames={{
        months:
          "flex flex-col justify-center sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-10 h-6  mx-1 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-none first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "mx-1 h-10 w-10 p-0 font-normal rounded-full flex items-center justify-center aria-selected:opacity-100",
        day_selected:
          "bg-blue-primary text-primary-foreground hover:bg-blue-secondary hover:text-primary-foreground focus:bg-blue-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        DayContent: DateTime,
        Caption: (CustomCaptionProps) =>
          CustomCaption(CustomCaptionProps, props.selected, props.onSelect),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export default Calendar;
