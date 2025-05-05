import Footer from "@/components/common/footer";
import HeaderWrapper from "@/components/common/header/header-wrapper";

import { getAllProducts } from "@/lib/server/queries";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <div>
      <HeaderWrapper products={products} />
      {children}
      <Footer />
    </div>
  );
}
