import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Extra } from "@prisma/client";

export default function ExtrasPopover({ extras }: { extras: Extra[] }) {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer p-1.5 bg-green-600/80 hover:bg-green-700 text-white rounded-sm shadow transition">
        Show
      </PopoverTrigger>
      <PopoverContent className="w-[150px] max-w-full p-2 rounded-lg shadow-lg border border-gray-200">
        {extras.length > 0 ? (
          <div className="flex flex-col gap-2">
            {extras.map((extra) => (
              <div
                key={extra.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span className="text-sm font-semibold text-rose-700">
                  {extra.name}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  ${extra.price}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            No extras available
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
