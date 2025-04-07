import IntroBanner from "@/components/common/intro-banner";
import CartSectionWrapper from "./_components/cart-section-wrapper";

type Props = {};
export default function CartPage({}: Props) {
  return (
    <main>
      <IntroBanner
        title="cart"
        breadcrumbPaths={[{ name: "cart", href: "/cart/" }]}
      />
      <CartSectionWrapper />
    </main>
  );
}
