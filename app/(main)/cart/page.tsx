import IntroBanner from "@/components/common/intro-banner";
import CartView from "./_components/cart-view";

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
