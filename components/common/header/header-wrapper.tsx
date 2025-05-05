import Header from "@/components/common/header";
import { ProductWithRelations } from "@/lib/types/product";
import { AuthSessionProvider } from "@/providers/next-auth-session-provider";
type Props = {
  products: ProductWithRelations[];
};
export default function HeaderWrapper({ products }: Props) {
  return (
    <AuthSessionProvider>
      <Header products={products} />
    </AuthSessionProvider>
  );
}
