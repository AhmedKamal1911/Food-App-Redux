import IntroBanner from "@/components/common/intro-banner";

type Props = {};
export default function CartPage({}: Props) {
  return (
    <main>
      <IntroBanner
        title="cart"
        breadcrumbPaths={[{ name: "cart", href: "/cart/" }]}
      />
      <section className="py-20 flex">
        <div className="px-20 flex-1">dfgdfg</div>
        <div className="bg-gray-500 px-6 py-8">fghgf</div>
      </section>
    </main>
  );
}
