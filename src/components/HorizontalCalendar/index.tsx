import * as React from "react";
import {
  DayPicker,
  DayContent,
  DayContentProps,
} from "react-day-picker";
import { format } from "date-fns";
import { cn } from "../../lib/utils";

export type HorizontalCalendarProps = React.ComponentProps<typeof DayPicker>;

function CustomCaption() {
  return <></>;
}
function CustomDay(props: DayContentProps) {
  return (
 
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{format(props.date!, "eee")}</p>
      <DayContent {...props} />
    </div>
  );
}

function HorizontalCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: HorizontalCalendarProps) {
  return (
    <DayPicker
      showOutsideDays={false}
      className={cn("", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: " border-collapse space-y-1",
        head: "hidden",
        tbody: "flex gap-4 items-start",
        head_row: "flex hidden",
        head_cell:
          "text-muted-foreground rounded-md w-10 h-6  mx-1 font-normal text-[0.8rem]",
        row: "flex mt-2 gap-4",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-none first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "w-[62px] h-[68px] flex text-sm font-semibold gap-2 flex-col items-center py-[10px] px-4 rounded-lg border border-gray-300 h-10 w-10 p-0 font-normal rounded-full flex items-center justify-center aria-selected:opacity-100",
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
        DayContent: CustomDay,
        Caption: CustomCaption,
      }}
      {...props}
    />
  );
}
HorizontalCalendar.displayName = "HorizontalCalendar";

export default HorizontalCalendar;
