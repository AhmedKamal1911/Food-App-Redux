import IntroBanner from "@/components/common/intro-banner";
import {
  getProductBySlug,
  getProductFullInfoBySlug,
  getRelatedProducts,
} from "@/lib/server/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductInfoBox from "./_components/product-info-box";
import RelatedProductsSection from "./_components/related-products-section";
import { Metadata } from "next";
import Awaited from "@/components/common/awaited";
import { Suspense } from "react";
import RelatedProductsSkeleton from "./_components/related-products-skeleton";
import prisma from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: {
      slug: true,
    },
  });
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "Product Not Found | Pizzon Food Delivery",
      description: "The requested product does not exist.",
    };
  }

  // Replace this with your actual data fetching logic
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Pizzon Food Delivery",
      description: "The requested product does not exist.",
    };
  }

  const description = `Explore our tasty selection of ${product.name.toLowerCase()} at Pizzon Food Delivery. Order fresh and fast!`;

  return {
    title: `${product.name} | Pizzon Food Delivery`,
    description,
    openGraph: {
      title: `${product.name} | Pizzon Food Delivery`,
      description,
    },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductFullInfoBySlug(slug);
  if (!product) return notFound();

  const relatedProductsPromise = getRelatedProducts(product.categoryId!);

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
                src={product.image ?? "/images/decorations/placeholder.png"}
                alt={product.name ?? "product image placeholder"}
                height={200}
                width={200}
              />
            </div>
            <ProductInfoBox product={product} />
          </div>
        </div>
      </section>

      <Suspense fallback={<RelatedProductsSkeleton />}>
        <Awaited promise={relatedProductsPromise}>
          {(relatedProducts) => (
            <RelatedProductsSection relatedProducts={relatedProducts} />
          )}
        </Awaited>
      </Suspense>
    </main>
  );
}
