"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, PhoneCall, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";
import { useInView } from "motion/react";
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
    href: "/",
    submenu: <ComboMenu />,
  },
  {
    label: "Reservation",
    href: "/",
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
          "fixed start-0 end-0 transition-colors",
          isInView ? "bg-black/0" : "bg-secondary"
        )}
      >
        <div className="container">
          <div
            className={clsx(
              "flex items-center justify-between gap-2.5 transition-all",
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

              <div className="flex  gap-2.5 sm:gap-5">
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
  return (
    <div className="relative group">
      <button className="flex  py-6 items-center gap-1.5 text-white cursor-pointer ">
        <ShoppingBag className="text-primary size-6 sm:size-6" />{" "}
        <span className="max-sm:hidden">0 items - $0.00</span>
      </button>
      <SubMenuContainer className="group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
        <span className="px-1.5">0 items</span>
      </SubMenuContainer>
    </div>
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
            <li className="relative group" key={i}>
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
                    <SubMenuContainer className="group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0">
                      {link.submenu}
                    </SubMenuContainer>
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
      <div className="flex justify-between items-center">
        <button className="cursor-pointer">
          <Menu className="md:size-7 text-white" />
        </button>
      </div>
      <div className="absolute start-0 end-0 top-full bg-black"></div>
    </div>
  );
}

function ComboMenu() {
  return <div>dasdad</div>;
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
