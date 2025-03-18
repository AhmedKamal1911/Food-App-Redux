import BookTableContainer from "@/components/common/book-table-container";
import Image from "next/image";

type Props = {};
export default function BookTableSection({}: Props) {
  return (
    <section className="py-10 relative">
      <Image
        src={"/images/decorations/weavy-white-top.png"}
        height={80}
        width={1200}
        alt="weavy top"
        className="absolute start-0  w-full top-1 -translate-y-full "
      />

      <div className="container">
        <BookTableContainer />
      </div>
    </section>
  );
}
