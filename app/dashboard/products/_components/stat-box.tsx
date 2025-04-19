import { cn } from "@/lib/utils";

import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  stat: string;
  className?: string;
  details: ReactNode;
};
export default function StatBox({
  icon,
  title,
  stat,
  className,
  details,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-2 text-black bg-white p-4 rounded-lg shadow ",
        className
      )}
    >
      <div className="flex justify-between">
        <span className="text-sm sm:text-xl capitalize">{title}</span>
        {icon}
      </div>

      <span className="text-2xl sm:text-3xl font-bold ">{stat}</span>
      {details}
    </div>
  );
}
