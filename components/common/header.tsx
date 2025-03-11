"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, PhoneCall, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { cn, getProductSlug } from "@/lib/utils";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";
import { Product } from "@/lib/types/shared";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
function useSpecialProducts() {
  const products: Product[] = [
    {
      id: 1,
      label: "Special Lemon Juice",
      imgSrc: "/images/lemon.png",
      price: 10.99,
    },
    {
      id: 2,
      label: "Special Burger",
      imgSrc: "/images/burger.png",
      price: 10.99,
    },
    {
      id: 3,
      label: "Green Salad",
      imgSrc: "/images/green-salad.png",
      price: 10.99,
    },
    {
      id: 4,
      label: "Meat Salad",
      imgSrc: "/images/meat-salad.png",
      price: 10.99,
    },
    {
      id: 5,
      label: "Olive Salad",
      imgSrc: "/images/olive-salad.png",
      price: 10.99,
    },
    {
      id: 6,
      label: "Orange Juice",
      imgSrc: "/images/orange.png",
      price: 10.99,
    },
  ];
  return products;
}

type PagesLinks = { label: string; href: string }[];
type NavItem = { label: string; href: string; submenu?: NavItem[] | ReactNode };
const PAGES_LINKS: PagesLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/my-account", label: "My Account" },
];
const NAV_LINKS: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Menu",
    href: "/menu",
    submenu: <ProductsMenu />,
  },
  {
    label: "Reservation",
    href: "/reservation",
  },
  {
    label: "Pages",
    href: "/",
    submenu: PAGES_LINKS,
  },
];

export default function Header() {
  const ref = useRef<null | HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <>
      <div ref={ref} />
      <header
        className={clsx(
          "fixed start-0 end-0 transition-colors z-[999]",
          isInView ? "bg-black/0" : "bg-secondary"
        )}
      >
        <div className="container">
          <div
            className={clsx(
              "flex items-center justify-between gap-2.5 transition-all relative",
              isInView ? "py-1.5" : "py-0"
            )}
          >
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={isInView ? 180 : 150}
                height={100}
                className={`transition-[width] duration-300`}
              />
            </Link>
            <div className="flex items-center gap-2 min-[420px]:gap-3 md:gap-10">
              <NavList />

              <div className="flex gap-2.5 sm:gap-5">
                <Link
                  href={"tel:02154"}
                  className="flex self-center items-center gap-1.5 text-white hover:text-primary transition-colors duration-300"
                >
                  <PhoneCall className="text-primary size-6 sm:size-6" />
                  <span className="max-sm:hidden">+2151584584</span>
                </Link>
                <ShoppingCart />
              </div>
              <Button
                className="bg-primary max-sm:p-2 p-5 rounded-4xl  text-white sm:text-[18px]"
                variant={"outline"}
              >
                Order online
              </Button>
              <AsideDrawer />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
function ShoppingCart() {
  const productsList = useSpecialProducts();
  return (
    <div className="group">
      <button className="flex  py-6 items-center gap-1.5 text-white cursor-pointer ">
        <ShoppingBag className="text-primary size-6 sm:size-6" />{" "}
        <span className="max-sm:hidden">0 items - $0.00</span>
      </button>
      <SubMenuContainer className="p-4 max-sm:start-0 end-0 sm:end-10 xl:end-0 sm:w-[300px]  max-w-full lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0">
        <span className="text-center block text-xl font-semibold relative before:absolute before:h-0.5 before:w-[32%] before:bg-gray-300 before:start-2 before:top-1/2 before:-translate-y-1/2 before:rounded-1/2  after:absolute after:h-0.5 after:w-[32%] after:bg-gray-300 after:end-2 after:top-1/2 after:-translate-y-1/2 after:rounded-1/2 ">
          3 items
        </span>

        <ul className="flex flex-col gap-3 divide-y-1 divide-gray-200">
          {productsList.length >= 3
            ? productsList.slice(0, 3).map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-1 sm:gap-3 relative"
                >
                  <Image
                    src={product.imgSrc}
                    alt={product.label}
                    width={80}
                    height={80}
                  />
                  <div className="flex flex-col gap-1">
                    <span>{product.label}</span>
                    <span className="text-primary">1 x ${product.price}</span>
                  </div>
                  <button className="absolute end-0 top-0 cursor-pointer hover:bg-primary/10 transition-colors">
                    <X className="text-red-600" />
                  </button>
                </li>
              ))
            : productsList.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center gap-1 sm:gap-3 relative"
                >
                  <Image
                    src={product.imgSrc}
                    alt={product.label}
                    width={80}
                    height={80}
                  />
                  <div className="flex flex-col gap-1">
                    <span>{product.label}</span>
                    <span className="text-primary">1 x ${product.price}</span>
                  </div>
                  <button className="absolute end-0 top-0 cursor-pointer hover:bg-primary/10 transition-colors">
                    <X className="text-red-600" />
                  </button>
                </li>
              ))}
        </ul>
        {productsList.length === 0 ? (
          <span className="text-center block py-3">
            No Products in the cart
          </span>
        ) : (
          <CartFooter />
        )}
      </SubMenuContainer>
    </div>
  );
}

function CartFooter() {
  return (
    <>
      <div className="flex justify-between items-center gap-3 border-t-1 border-t-gray-200 py-3 text-[#999999] font-semibold">
        <span>Subtotal</span>
        <span>$0.00</span>
      </div>

      <div className="flex gap-2 justify-center items-center mt-2  text-[#999999] font-semibold">
        <Link
          href={"/cart"}
          className="text-white rounded-4xl border bg-secondary hover:bg-white hover:text-secondary border-secondary hover:border-secondary  py-2 px-4 transition-all"
        >
          View Cart
        </Link>
        <Link
          href={"/checkout"}
          className="rounded-4xl bg-primary border border-primary hover:bg-white hover:text-primary text-white py-2 px-4 transition-all"
        >
          Checkout
        </Link>
      </div>
    </>
  );
}

function NavList({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className="max-xl:hidden">
      <ul className={cn("flex items-center lg:gap-3 xl:gap-8", className)}>
        {NAV_LINKS.map((link, i) => {
          const isActive = pathname === link.href;
          return (
            <li className="group" key={i}>
              <Link
                href={link.href}
                className={clsx(
                  {
                    "text-primary": isActive,
                  },
                  "text-white group-hover:text-primary py-6 block hover:text-primary transition-colors duration-300 text-[18px]"
                )}
              >
                {link.label}
              </Link>
              {link.submenu && (
                <>
                  {Array.isArray(link.submenu) ? (
                    <SubMenuContainer
                      className={
                        "w-[120px] max-w-[150px] p-0 py-3 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 "
                      }
                    >
                      <PagesLinks linksList={link.submenu} />
                    </SubMenuContainer>
                  ) : (
                    link.submenu
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function PagesLinks({ linksList }: { linksList: PagesLinks }) {
  return (
    <ul>
      {linksList.map((page, i) => (
        <li key={i}>
          <a
            className="relative block hover:text-primary transition-colors px-5 p-1 before:absolute before:start-3 before:size-1 before:bg-primary before:translate-y-1/2 before:bottom-1/2 before:rounded-1/2 before:translate-x-[-50%]"
            href={page.href}
          >
            {page.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function AsideDrawer() {
  return (
    <div className="min-xl:hidden">
      {/* <div className="flex justify-between items-center">
        <button className="cursor-pointer">
          
        </button>
      </div> */}
      <Sheet>
        <SheetTrigger className="cursor-pointer">
          <Menu className="md:size-7 text-white" />
        </SheetTrigger>
        <SheetContent className="z-[9999] bg-primary/50 backdrop-blur-2xl border-l-secondary px-3 py-12 ">
          <Accordion
            type="single"
            collapsible
            className="w-full flex-col flex gap-2 font-semibold"
          >
            {NAV_LINKS.map((link, i) =>
              Array.isArray(link.submenu) ? (
                <AccordionItem value="item-1" key={i}>
                  <AccordionTrigger className="text-white text-[18px] hover:text-black font-semibold cursor-pointer ">
                    {link.label}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-1.5">
                    {link.submenu.map((submenu, idx) => (
                      <Link
                        key={idx}
                        href={submenu.href}
                        className="text-white text-[18px] hover:text-black transition-all"
                      >
                        {submenu.label}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  href={link.href}
                  key={i}
                  className="text-white text-[18px] hover:text-black transition-all"
                >
                  {link.label}
                </Link>
              )
            )}
          </Accordion>
        </SheetContent>
      </Sheet>
      {/* <div className="absolute start-0 end-0 top-full bg-black"></div> */}
    </div>
  );
}

function ProductsMenu() {
  const productsList = useSpecialProducts();
  return (
    <SubMenuContainer className="w-full start-0 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
      <ul className="flex justify-center flex-wrap">
        {productsList.map((product, i) => (
          <li
            key={i}
            className="flex-[30%] hover:bg-primary/10 transition-colors"
          >
            <a
              href={`/product/${getProductSlug(product.label)}`}
              className="relative flex items-center px-5 p-1 "
            >
              <div>
                <Image
                  src={product.imgSrc}
                  alt={product.label}
                  height={100}
                  width={100}
                />
              </div>
              <div className="flex flex-col">
                <span>{product.label}</span>
                <span className="text-primary">${product.price}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SubMenuContainer>
  );
}

function SubMenuContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute bg-white border-t-2 border-primary p-2 opacity-0 pointer-events-none translate-y-2  transition-[opacity,translate]",
        className
      )}
    >
      {children}
    </div>
  );
}
