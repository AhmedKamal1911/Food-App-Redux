"use client";
import { useAppSelector } from "@/lib/redux/hooks";
import OrderSummaryBox from "./order-summary-box";
import ShoppingCart from "./shopping-cart";
import { getProductsByIds } from "@/lib/queries/product/get-products-by-ids";

type Props = {};
export default function CartSectionWrapper({}: Props) {
  // TODO:create hook to get cart products and another one to get subtotal
  const cartItems = useAppSelector((state) => state.cart.products);
  const productsIds = Object.keys(cartItems);
  const products = getProductsByIds(productsIds.toString());
  console.log(cartItems);
  return (
    <section className="flex max-lg:flex-col min-h-[80vh]">
      <ShoppingCart />
      <OrderSummaryBox />
    </section>
  );
}
