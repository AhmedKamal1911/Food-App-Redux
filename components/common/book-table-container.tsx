import Link from "next/link";
import BookTableForm from "./forms/book-table-form";
import SpecialHeading from "./special-heading";
import Image from "next/image";
import { formatPhoneNumber } from "@/lib/utils";

type Props = {
  desc: string;
  tel: string;
};

export default function BookTableContainer() {
  return (
    <div className="flex justify-center max-md:flex-col max-md:gap-10">
      <BookTableInfoBox
        desc=" Elevate your dining experience with ease! Reserve a table at our
          restaurant, where exquisite cuisine meets inviting ambiance. Enjoy
          impeccable service and create memorable moments with your loved ones,
          ensuring a delightful and unforgettable mealtime."
        tel="911234567890"
      />
      <BookTableForm />
    </div>
  );
}

function BookTableInfoBox({ desc, tel }: Props) {
  return (
    <div className="flex-1 p-2">
      <div className="flex flex-col items-center md:items-start gap-5 justify-start w-full md:max-w-[390px]">
        <SpecialHeading
          title="fresh from pizzon"
          subTitle="book online"
          titleClassName="text-center md:text-start"
          subTitleClassName="text-center md:text-start"
        />
        <p className="text-secondary text-center md:text-start">{desc}</p>
        <Link href={`tel:${tel}`} className="border-4 border-primary group ">
          <div className="flex max-sm:flex-col items-center group-hover:bg-white duration-500  bg-secondary transition-colors p-2">
            <Image
              src={"/images/book-table-section/svgs/mobile.svg"}
              height={50}
              width={50}
              alt="mobile svg"
            />
            <span className="text-white font-bold text-3xl group-hover:text-secondary transition-colors duration-500">
              {formatPhoneNumber(tel)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
