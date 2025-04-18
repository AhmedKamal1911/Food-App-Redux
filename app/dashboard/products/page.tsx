import { getAllCategories, getFilteredProducts } from "@/lib/server/queries";

type Props = {
  searchParams: Promise<{
    cat: string;
  }>;
};
export default async function ProductsPage({ searchParams }: Props) {
  const categories = await getAllCategories();
  const { cat } = await searchParams;
  const catList = cat?.split(",") ?? categories.map((c) => c.slug);
  console.log(catList);
  const products = await getFilteredProducts({ productCategories: catList });
  console.log(products);
  return (
    <main>
      <h3>dasdasd</h3>
    </main>
  );
}
