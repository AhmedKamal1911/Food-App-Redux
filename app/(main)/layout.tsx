import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { getAllProducts } from "@/lib/server/queries";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <div>
      <Header products={products} />
      {children}
      <Footer />
    </div>
  );
}
