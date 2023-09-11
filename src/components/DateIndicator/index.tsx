import React from "react";
import HorizontalCalendar from "../HorizontalCalendar";
import "./index.css"
import { format } from "date-fns";
export default function DateIndicator({ selected, onSelect }: any) {
  const [date, ] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="mb-8">
      <h5 className="text-gray-900 text-[12.741px] lg:text-base font-semibold mb-4">
        {format(date!,"MMMM yyyy")}
      </h5>
      <div className="hcc w-full overflow-x-scroll pb-4">
        <HorizontalCalendar mode="single" selected={selected} onSelect={onSelect} />
      </div>
    </div>
  );
}
