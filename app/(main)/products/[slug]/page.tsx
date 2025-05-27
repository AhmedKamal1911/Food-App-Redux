import IntroBanner from "@/components/common/intro-banner";
import {
  getProductFullInfoBySlug,
  getRelatedProducts,
} from "@/lib/server/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductInfoBox from "./_components/product-info-box";
import RelatedProductsSection from "./_components/related-products-section";

type Props = {
  params: Promise<{ slug: string }>;
};
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductFullInfoBySlug(slug);
  if (!product) return notFound();
  const relatedProducts = product.categoryId
    ? await getRelatedProducts(product.categoryId)
    : [];

  return (
    <main>
      <IntroBanner
        title={product.name}
        breadcrumbPaths={[
          { name: "products", href: "/products" },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      />
      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-center gap-5 max-md:flex-col">
            <div className="flex flex-col items-center justify-center flex-1 size-[300px] max-w-full max-h-full">
              <Image
                src={product.image}
                alt={product.name}
                height={200}
                width={200}
              />
            </div>
            <ProductInfoBox product={product} />
          </div>
        </div>
      </section>
      <RelatedProductsSection relatedProducts={relatedProducts} />
    </main>
  );
}
