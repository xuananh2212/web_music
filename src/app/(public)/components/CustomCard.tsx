import clsx from "clsx";
import { PropsWithChildren } from "react";

const CustomCard = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={clsx("w-full p-6 bg-white flex gap-6 items-center flex-col shadow-2xl rounded-lg", className)}>
      {children}
    </div>
  );
};

export default CustomCard;
