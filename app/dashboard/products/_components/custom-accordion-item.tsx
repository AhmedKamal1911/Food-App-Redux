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
            "bg-secondary px-4 py-2 text-white items-center cursor-pointer",
            open ? "rounded-b-none" : "rounded-sm "
          )}
        >
          <span className="text-lg font-semibold">{title}</span>
        </AccordionTrigger>

        <AccordionContent className="p-2 space-y-1 bg-gray-700 ">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
