import CustomInput from "@/components/common/custom-input";
import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

type Props<TData> = {
  table: Table<TData>;
};
export default function ProductsFilterInput<TData>({ table }: Props<TData>) {
  return (
    <div>
      <CustomInput
        className="py-1 rounded-sm"
        icon={<Search className="size-4" />}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        placeholder="search a product"
      />
    </div>
  );
}
