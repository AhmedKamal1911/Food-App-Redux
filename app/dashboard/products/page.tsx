import { getAllCategories, getFilteredProducts } from "@/lib/server/queries";

type Props = {
  params: {
    productCat: string;
  };
};
export default async function ProductsPage({ params }: Props) {
  const categories = await getAllCategories();
  const { productCat } = await params;
  console.log(productCat);
  const products = await getFilteredProducts({});
  // console.log(products);
  return <main></main>;
}
