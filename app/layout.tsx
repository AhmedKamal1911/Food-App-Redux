import { ReactNode } from "react";

import StoreProvider from "@/providers/store-provider";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Pacifico, PT_Sans_Narrow } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";

export const ptSansNarrow = PT_Sans_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  fallback: ["sans-serif"],
});
export const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["cyrillic"],
  weight: ["400"],
  fallback: ["Sans-serif"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body
        className={`${ptSansNarrow.className} ${pacifico.variable}  antialiased`}
      >
        <StoreProvider>
          <ToastContainer closeOnClick pauseOnHover />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
