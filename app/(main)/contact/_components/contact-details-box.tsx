import { formatPhoneNumber } from "@/lib/utils";
import { Clock, Home, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactDetailsBox() {
  return (
    <div className="flex flex-col gap-5 flex-1">
      <span className="text-3xl font-semibold capitalize">contact details</span>
      <p className="text-gray-500 max-w-[500px]">
        Have a question or craving our delicious pizzas? Get in touch with us
        effortlessly! Reach out for orders, inquiries, or special requests
        through our user-friendly website or call our friendly customer support
        team. We’re here to make your pizza experience exceptional.
      </p>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 items-center">
          <Home className="size-7 text-primary" />
          <span>55 Drumburgh Ave, Carlisle CA3 0PD, UK</span>
        </div>
        <div className="flex gap-3 items-center">
          <Phone className="size-7 text-primary" />
          <div className="inline-block">
            <Link
              className="hover:text-primary transition-colors"
              href={`tel:${formatPhoneNumber("911234567890")}`}
            >
              {formatPhoneNumber("911234567890")}
            </Link>
            <span className="mx-1">,</span>
            <Link
              className="hover:text-primary transition-colors"
              href={`tel:${formatPhoneNumber("911234567890")}`}
            >
              {formatPhoneNumber("911234567890")}
            </Link>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Mail className="size-7 text-primary" />
          <Link
            className="hover:text-primary transition-colors"
            href={`tel:${formatPhoneNumber("911234567890")}`}
          >
            info@gmail.com
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          <Clock className="size-7 text-primary" />
          <div>
            <span className="block">Monday – Friday: 10 am – 10pm</span>
            <span>Sunday: 11 am – 9pm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
