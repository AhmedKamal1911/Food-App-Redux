import Link from "next/link";
import ProductsTable from "./products-table";
import { MoveLeft } from "lucide-react";

type Props = {};
export default function ShoppingCart({}: Props) {
  return (
    <div className=" p-5 flex-1 md:p-8 xl:p-15">
      <div className="flex justify-between items-center">
        <span className="text-2xl capitalize">shopping cart</span>
        <span className="text-xl font-semibold">3 items</span>
      </div>
      <div className="flex flex-col gap-5 py-10  mt-5 border-t-2">
        <div className="w-full overflow-x-auto">
          <ProductsTable />
        </div>
        <Link
          href={"/menu"}
          className="flex gap-3 text-violet-800 font-semibold hover:text-violet-500 transition-colors"
        >
          <MoveLeft /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
