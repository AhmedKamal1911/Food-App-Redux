"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, PhoneCall, User } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { ReactNode, useMemo, useRef } from "react";

import { useInView } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductsMenu from "./products-menu";
import ShoppingCartMenu from "./cart-menu";
import { Product } from "@prisma/client";
const USERS = [
  {
    id: 1,
    isAdmin: true,
    name: "ahmed kamal",
  },
  {
    id: 2,
    isAdmin: false,
    name: "mohamed kamal",
  },
];

function isAdminUser(id: number) {
  return USERS.find((user) => user.id === id)?.isAdmin as boolean;
}

type PageLink = { label: string; href: string };
type NavItem = PageLink & {
  submenu?: NavItem[] | ReactNode | PageLink[];
  show: boolean;
};
const getNavLinks = (products: Product[], isAdmin: boolean) => {
  const NAV_LINKS: NavItem[] = [
    {
      label: "home",
      href: "/",
      show: true,
    },
    {
      label: "menu",
      href: "/menu",
      submenu: <ProductsMenu products={products} />,
      show: true,
    },
    {
      label: "reservation",
      href: "/reservation",
      show: true,
    },
    {
      label: "pages",
      href: "#",
      submenu: [
        { href: "/about-us", label: "about us" },
        { href: "/contact", label: "contact us" },
        { href: "/my-account", label: "my account" },
      ],
      show: true,
    },
    {
      label: "dashboard",
      href: "/dashboard",
      show: isAdmin,
    },
  ];
  return NAV_LINKS;
};

export default function Header({ products }: { products: Product[] }) {
  const ref = useRef<null | HTMLDivElement>(null);
  const isInView = useInView(ref);
  const isAdmin = isAdminUser(1);
  console.log({ isAdmin });
  return (
    <>
      <div ref={ref} />
      <header
        className={clsx(
          "fixed  start-0 end-0 transition-colors z-[999]",
          isInView ? "bg-black/0" : "bg-secondary shadow-md shadow-gray-600/20"
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
                className={`transition-[width] duration-300  h-auto`}
              />
            </Link>
            <div className="flex items-center gap-2 min-[420px]:gap-3 md:gap-8 lg:gap-10">
              <NavList products={products} isAdmin={isAdmin} />

              <div className="flex gap-2.5 sm:gap-5">
                <Link
                  href={"tel:02154"}
                  className="flex self-center items-center gap-1.5 text-white hover:text-primary transition-colors duration-300"
                >
                  <PhoneCall className="text-primary size-6 sm:size-6" />
                  <span className="max-[720px]:hidden">+2151584584</span>
                </Link>
                {isAdmin && (
                  <Link
                    href={"/dashboard"}
                    className="flex self-center items-center gap-1.5 text-white hover:text-primary transition-colors duration-300"
                  >
                    <User className="text-primary size-6 sm:size-6" />
                    <span className="max-[720px]:hidden">user</span>
                  </Link>
                )}

                <ShoppingCartMenu />
              </div>

              <Button
                className="bg-primary max-sm:p-2 p-5 rounded-4xl  text-white sm:text-[18px]"
                variant={"outline"}
              >
                Order online
              </Button>
              <AsideDrawer products={products} isAdmin={isAdmin} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function NavList({
  className,
  products,
  isAdmin,
}: {
  className?: string;
  products: Product[];
  isAdmin: boolean;
}) {
  const pathname = usePathname();
  const NAV_LINKS: NavItem[] = useMemo(
    () => getNavLinks(products, isAdmin),
    [products, isAdmin]
  );

  return (
    <nav className="max-xl:hidden">
      <ul className={cn("flex items-center lg:gap-3 xl:gap-8", className)}>
        {NAV_LINKS.map((link, i) => {
          const isActive = pathname === link.href;

          return (
            link.show && (
              <li className="group" key={i}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-white group-hover:text-primary py-6 block hover:text-primary transition-colors duration-300 text-[18px] capitalize",

                    isActive && "text-primary"
                  )}
                >
                  {link.label}
                </Link>

                {link.submenu && (
                  <>
                    {Array.isArray(link.submenu) ? (
                      <SubMenuContainer
                        className={
                          "w-[150px]  p-0 py-3 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 "
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
            )
          );
        })}
      </ul>
    </nav>
  );
}

function PagesLinks({ linksList }: { linksList: PageLink[] }) {
  return (
    <ul>
      {linksList.map((page, i) => (
        <li key={i}>
          <Link
            className="relative block text-black hover:text-primary transition-colors px-5 p-1 before:absolute before:start-3 before:size-1 before:bg-primary before:translate-y-1/2 before:bottom-1/2 before:rounded-1/2 before:translate-x-[-50%] capitalize"
            href={page.href}
          >
            {page.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function AsideDrawer({
  products,
  isAdmin,
}: {
  products: Product[];
  isAdmin: boolean;
}) {
  const NAV_LINKS: NavItem[] = useMemo(
    () => getNavLinks(products, isAdmin),
    [products, isAdmin]
  );
  return (
    <div className="min-xl:hidden">
      <Sheet>
        <SheetTrigger className="cursor-pointer">
          <Menu className="md:size-7 text-white" />
        </SheetTrigger>
        <SheetContent className="z-[9999] bg-primary/50 backdrop-blur-2xl border-l-secondary px-3 py-12 ">
          <SheetHeader className="sr-only">
            <SheetTitle>Aside Drawer</SheetTitle>
            <SheetDescription>Aside Drawer with links</SheetDescription>
          </SheetHeader>
          <Accordion
            type="single"
            collapsible
            className="w-full flex-col flex gap-2 font-semibold"
          >
            {NAV_LINKS.map(
              (link, i) =>
                link.show &&
                (Array.isArray(link.submenu) ? (
                  <AccordionItem value="item-1" key={i}>
                    <AccordionTrigger className="text-white text-[18px] hover:text-black font-semibold cursor-pointer capitalize">
                      {link.label}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-1.5">
                      {link.submenu.map((submenu, idx) => (
                        <Link
                          key={idx}
                          href={submenu.href}
                          className="text-white text-[18px] hover:text-black transition-all capitalize"
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
                    className="text-white text-[18px] hover:text-black transition-all capitalize"
                  >
                    {link.label}
                  </Link>
                ))
            )}
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function SubMenuContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute bg-white border-t-3 border-primary p-2 opacity-0 pointer-events-none translate-y-2  transition-[opacity,translate] shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
