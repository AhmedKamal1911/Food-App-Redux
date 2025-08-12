import { ReactNode } from "react";

import StoreProvider from "@/providers/store-provider";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Pacifico, PT_Sans_Narrow } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { AuthSessionProvider } from "@/providers/next-auth-session-provider";
import { getBaseUrl } from "@/lib/utils";

const ptSansNarrow = PT_Sans_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  fallback: ["sans-serif"],
});
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["cyrillic"],
  weight: ["400"],
  fallback: ["Sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Pizzon Food Delivery", // fallback for pages with no custom title
    template: "%s | Pizzon Food Delivery",
  },
  description:
    "Order delicious pizzas and meals online from Pizzon. Fresh ingredients, fast delivery, and unbeatable taste!",
  keywords: ["pizza delivery", "online food order", "pasta", "Pizzon"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Pizzon Food Delivery",
    description:
      "Order your favorite pizzas and meals from Pizzon with fast delivery and fresh ingredients.",
    url: getBaseUrl(),
    siteName: "Pizzon",
    images: [
      {
        url: "https://res.cloudinary.com/dny22pvbp/image/upload/v1754424050/decoration_images/logo_dincny.png", // Your social preview image
        width: 1200,
        height: 630,
        alt: "Pizzon Pizza and Food Delivery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizzon Food Delivery",
    description: "Fresh pizza, fast delivery — order online from Pizzon today!",
    images: [
      "https://res.cloudinary.com/dny22pvbp/image/upload/v1754424050/decoration_images/logo_dincny.png",
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body
        className={`${ptSansNarrow.className} ${pacifico.variable}  antialiased`}
      >
        <ToastContainer closeOnClick pauseOnHover position="bottom-right" />
        <AuthSessionProvider>
          <StoreProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </StoreProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
