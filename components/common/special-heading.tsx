import { cn } from "@/lib/utils";

export default function SpecialHeading({
  title,
  subTitle,
  subTitleClassName,
  titleClassName,
}: {
  title: string;
  subTitle: string;
  subTitleClassName?: string;
  titleClassName?: string;
}) {
  return (
    <div className="text-center flex flex-col gap-1">
      <span
        className={cn(
          "font-pacifico text-[27px] text-primary capitalize",
          titleClassName
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "text-3xl sm:text-5xl md:text-6xl font-bold uppercase",
          subTitleClassName
        )}
      >
        {subTitle}
      </span>
    </div>
  );
}
