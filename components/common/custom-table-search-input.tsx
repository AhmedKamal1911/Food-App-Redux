import CustomInput from "@/components/common/custom-input";
import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

type Props<TData> = {
  table: Table<TData>;
  columnName: string;
  placeholder: string;
};
export default function CustomTableSearchInput<TData>({
  table,
  columnName,
  placeholder,
}: Props<TData>) {
  return (
    <div>
      <CustomInput
        className="py-1 rounded-sm"
        icon={<Search className="size-4" />}
        value={(table.getColumn(columnName)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnName)?.setFilterValue(event.target.value)
        }
        placeholder={placeholder}
      />
    </div>
  );
}
