import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

type Props = {
  title: string;
  children: ReactNode;
};
export default function CustomAccordionItem({ title, children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Accordion type="multiple">
      <AccordionItem onClick={() => setOpen((prev) => !prev)} value={title}>
        <AccordionTrigger
          className={cn(
            "bg-secondary px-4 py-2 text-white items-center ",
            open ? "rounded-b-none" : "rounded-sm "
          )}
        >
          <span className="text-lg font-semibold">{title}</span>
        </AccordionTrigger>

        <AccordionContent className=" p-1 bg-gray-900 ">
          <div className="max-h-[220px] overflow-y-auto space-y-1 pr-1">
            {children}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
