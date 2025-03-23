import type { Metadata } from "next";
import { Pacifico, PT_Sans_Narrow } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

import { getAllProducts } from "@/lib/server";

const ptSansNarrow = PT_Sans_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  fallback: ["sans-serif"],
});
const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: ["400"],
  fallback: ["Sans-serif"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();
  return (
    <html lang="en">
      <body
        className={`${ptSansNarrow.className} ${pacifico.variable}  antialiased`}
      >
        <Header products={products} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
