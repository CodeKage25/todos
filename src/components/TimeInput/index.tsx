import { AiOutlineClockCircle } from "react-icons/ai";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "./TimeInput.css";
import React from "react";
type Props = {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};
export default function TimeInput({ name, value, setValue }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 border border-gray-300 shadow-sm rounded-lg py-[10px] px-4">
      <AiOutlineClockCircle className="text-sm" />
      <TimePicker
        name={name}
        clearIcon={null}
        className=" w-max text-sm font-semibold"
        disableClock={true}
        onChange={(value) => setValue(value)}
        value={value}
      />
    </div>
  );
}
