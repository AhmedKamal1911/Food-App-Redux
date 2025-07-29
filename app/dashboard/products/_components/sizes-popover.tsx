import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Size } from "@prisma/client";

export default function SizesPopover({ sizes }: { sizes: Size[] }) {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer p-1.5 bg-green-600/80 hover:bg-green-700 text-white rounded-sm shadow transition">
        Show
      </PopoverTrigger>
      <PopoverContent className="w-[150px] max-w-full p-2 rounded-lg shadow-lg border border-gray-200">
        {sizes.length > 0 ? (
          <div className="flex flex-col gap-2">
            {sizes.map((size) => (
              <div
                key={size.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
              >
                <span className="text-sm font-semibold text-rose-700">
                  {size.name}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  ${size.price}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            No sizes available
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
