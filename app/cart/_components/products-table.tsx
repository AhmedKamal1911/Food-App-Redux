import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import QuantityBox from "./quantity-box";
import { ProductWithRelations } from "@/lib/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {};

export default function ProductsTable({}: Props) {
  return (
    <Table className="min-w-[650px]">
      <TableCaption>A list of your cart products.</TableCaption>
      <TableHeader>
        <TableRow className="uppercase hover:bg-transparent text-[18px]">
          <TableHead className="text-gray-500 font-semibold">
            product details
          </TableHead>
          <TableHead className="text-gray-500 font-semibold text-center">
            quantity
          </TableHead>
          <TableHead className="text-gray-500 font-semibold text-center">
            price
          </TableHead>
          <TableHead className="text-gray-500 font-semibold text-center">
            total
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <ProductRow
          product={{
            name: "burger",
            price: 20.0,
            category: { name: "burgers" },
          }}
        />
        <ProductRow
          product={{
            name: "burger",
            price: 20.0,
            category: { name: "burgers" },
          }}
        />
        <ProductRow
          product={{
            name: "burger",
            price: 20.0,
            category: { name: "burgers" },
          }}
        />
        <ProductRow
          product={{
            name: "burger",
            price: 20.0,
            category: { name: "burgers" },
          }}
        />
      </TableBody>
    </Table>
  );
}

function ProductRow({ product }: { product: ProductWithRelations }) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className="w-[40%] lg:w-[30%]">
        <div className="flex gap-2">
          <div className="bg-gray-100 flex shrink-0">
            <Image
              src={"/images/special-products/burger.png"}
              alt="product"
              height={90}
              width={90}
              className="object-cover self-center aspect-square"
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold capitalize text-[18px]">
              {product.name}
            </span>
            <span className="font-semibold capitalize text-rose-600">
              <span className="text-gray-600">category :</span>{" "}
              {product.category?.name}
            </span>

            <Button
              variant={"ghost"}
              className="rounded-none font-semibold  hover:bg-red-600/70 text-gray-700 hover:text-white"
            >
              Remove
            </Button>
          </div>
        </div>
      </TableCell>

      <TableCell className="w-[25%] text-center">
        <QuantityBox />
      </TableCell>
      <TableCell className="w-[25%] text-center text-[18px] font-semibold">
        ${product.price}
      </TableCell>
      <TableCell className="w-[25%] text-center text-[18px] font-semibold">
        ${product.price}
      </TableCell>
    </TableRow>
  );
}
