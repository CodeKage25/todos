import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  primary?: boolean;
};
export default function Button({
  children,
  onClick,
  className,
  primary = true,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        " py-[10px] px-4 rounded-lg flex items-center justify-center gap-2 ",
        {
          "bg-white hover:bg-gray-200 border border-gray-300 text-gray-800 font-inter": !primary,
        },
        { "bg-blue-primary text-white hover:bg-blue-secondary": primary },
        { [`${className}`]: !!className }
      )}
    >
      {children}
    </button>
  );
}
