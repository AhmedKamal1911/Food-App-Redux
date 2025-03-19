import { formatPhoneNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary py-20">
      <div className="container">
        <div className="flex justify-between max-lg:flex-col max-lg:items-center gap-8 ">
          <div className="text-white flex flex-col gap-5  max-lg:items-center max-lg:text-center">
            <div>
              <Image
                src={"/images/logo.png"}
                height={53}
                width={184}
                alt="logo"
              />
            </div>
            <p className="max-w-[300px]">
              20 Carrochan Rd, Balloch, Alexandria G83 8EG, UK 69QJ+2F
              Alexandria, United Kingdom
            </p>
            <div>
              <span className="uppercase mr-2">phone -- </span>
              <div className="inline-block">
                <Link
                  className="hover:text-primary transition-colors"
                  href={`tel:${formatPhoneNumber("911234567890")}`}
                >
                  {formatPhoneNumber("911234567890")}
                </Link>
                <span className="mx-2">,</span>
                <Link
                  className="hover:text-primary transition-colors"
                  href={`tel:${formatPhoneNumber("911234567890")}`}
                >
                  {formatPhoneNumber("911234567890")}
                </Link>
              </div>
            </div>
            <div>
              <span className="uppercase mr-2">email -- </span>
              <div className="inline-block">
                <Link
                  className="hover:text-primary transition-colors"
                  href={`mailto:info@gmail.com`}
                >
                  info@gmail.com
                </Link>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col gap-10 max-lg:items-center">
            <h3 className="uppercase text-xl font-bold">opening hours</h3>
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 capitalize justify-between">
                <span>mon - tues :</span>
                <span>6.00 am - 10.00 pm</span>
              </div>
              <div className="flex gap-4 capitalize justify-between">
                <span>wednes - thurs :</span>
                <span>6.00 am - 10.00 pm</span>
              </div>
              <div className="flex gap-4 capitalize justify-between">
                <span>lunch:</span>
                <span>everyday</span>
              </div>
              <div className="flex gap-4 capitalize justify-between">
                <span>sunday :</span>
                <span className="px-1 bg-yellow-600">closed</span>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col gap-10 max-lg:items-center max-lg:text-center">
            <span className="uppercase text-xl font-bold">useful links</span>
            <div className="flex flex-col gap-1 capitalize">
              <Link
                className="hover:text-primary transition-colors"
                href={`tel:${formatPhoneNumber("911234567890")}`}
              >
                Privacy Policy
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                href={`tel:${formatPhoneNumber("911234567890")}`}
              >
                order tracking
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                href={`tel:${formatPhoneNumber("911234567890")}`}
              >
                warranty and services
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                href={`tel:${formatPhoneNumber("911234567890")}`}
              >
                about us
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                href={`tel:${formatPhoneNumber("911234567890")}`}
              >
                contact
              </Link>
              <Link
                className="hover:text-primary transition-colors"
                href={`tel:${formatPhoneNumber("911234567890")}`}
              >
                my account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
