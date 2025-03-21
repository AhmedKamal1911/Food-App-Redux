import { cn } from "@/lib/utils";

export default function SpecialHeading({
  title,
  subTitle,
  className,
}: {
  title: string;
  subTitle: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center flex flex-col gap-1", className)}>
      <span className={"font-pacifico text-[27px] text-primary capitalize"}>
        {title}
      </span>
      <span
        className={
          "text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase"
        }
      >
        {subTitle}
      </span>
    </div>
  );
}
