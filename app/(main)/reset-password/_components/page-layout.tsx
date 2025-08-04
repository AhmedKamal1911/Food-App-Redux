import IntroBanner from "@/components/common/intro-banner";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function PageLayout({ children }: Props) {
  return (
    <main>
      <IntroBanner
        title="reset password"
        breadcrumbPaths={[{ name: "reset password", href: "" }]}
      />
      <div className="container flex justify-center items-center min-h-[60vh]">
        {children}
      </div>
    </main>
  );
}
