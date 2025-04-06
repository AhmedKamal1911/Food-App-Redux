import IntroBanner from "@/components/common/intro-banner";
import OrderSummaryBox from "./_components/order-summary-box";
import ShoppingCart from "./_components/shopping-cart";

type Props = {};
export default function CartPage({}: Props) {
  return (
    <main>
      <IntroBanner
        title="cart"
        breadcrumbPaths={[{ name: "cart", href: "/cart/" }]}
      />
      <section className="flex max-lg:flex-col min-h-[80vh]">
        <ShoppingCart />
        <OrderSummaryBox />
      </section>
    </main>
  );
}
