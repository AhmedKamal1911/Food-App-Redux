import { ReactNode } from "react";

export default function AsideContentWrapper({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div>
      <span className="text-2xl uppercase border-b-1 block  pb-2 font-bold">
        {title}
      </span>
      {children}
    </div>
  );
}
