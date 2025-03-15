import { cn } from "@/lib/utils";

export default function SpecialHeading({
  title,
  subTitle,
  subTitleClassName,
}: {
  title: string;
  subTitle: string;
  subTitleClassName?: string;
}) {
  return (
    <div className="text-center flex flex-col gap-1">
      <span className="font-pacifico text-3xl text-primary capitalize">
        {title}
      </span>
      <span
        className={cn(
          "text-3xl sm:text-5xl md:text-7xl font-bold uppercase",
          subTitleClassName
        )}
      >
        {subTitle}
      </span>
    </div>
  );
}
