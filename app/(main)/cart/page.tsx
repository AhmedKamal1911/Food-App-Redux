import IntroBanner from "@/components/common/intro-banner";
import CartView from "./_components/cart-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your Pizzon order before checkout. Add or remove items and enjoy fresh pizzas and meals delivered fast.",
  openGraph: {
    title: "Your Cart | Pizzon Food Delivery",
    description:
      "Check your order in the Pizzon cart. Customize your meal selections and prepare for fast delivery.",
  },
};
export default async function CartPage() {
  return (
    <main>
      <IntroBanner
        title="cart"
        breadcrumbPaths={[{ name: "cart", href: "/cart/" }]}
      />

      <CartView />
    </main>
  );
}
