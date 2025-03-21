import SpecialHeading from "@/components/common/special-heading";
import CustomerReviewsSlider from "../../../app/_components/customer-reviews-slider";
import Image from "next/image";
export type Review = {
  id: number;
  userName: string;
  designation: string;
  desc: string;
  image: string;
};
const reviewsList: Review[] = [
  {
    id: 1,
    userName: "John Doe",

    designation: "Designer",
    desc: "What a fantastic pizza experience! The variety of pizzas on the menu is impressive, and I love how you can customize your own. The online ordering process was seamless, and the staff was friendly and accommodating. The pizza tasted amazing - it's evident they use high-quality ingredients. I'll definitely be ordering from here again!",
    image: "/images/reviews-section/client-1.png",
  },
  {
    id: 2,
    userName: "John Doe",

    designation: "Designer",
    desc: "What a fantastic pizza experience! The variety of pizzas on the menu is impressive, and I love how you can customize your own. The online ordering process was seamless, and the staff was friendly and accommodating. The pizza tasted amazing - it's evident they use high-quality ingredients. I'll definitely be ordering from here again!",
    image: "/images/reviews-section/client-2.jpeg",
  },
  {
    id: 3,
    userName: "John Doe",

    designation: "Designer",
    desc: "What a fantastic pizza experience! The variety of pizzas on the menu is impressive, and I love how you can customize your own. The online ordering process was seamless, and the staff was friendly and accommodating. The pizza tasted amazing - it's evident they use high-quality ingredients. I'll definitely be ordering from here again!",
    image: "/images/reviews-section/client-1.png",
  },
  {
    id: 4,
    userName: "John Doe",

    designation: "Designer",
    desc: "What a fantastic pizza experience! The variety of pizzas on the menu is impressive, and I love how you can customize your own. The online ordering process was seamless, and the staff was friendly and accommodating. The pizza tasted amazing - it's evident they use high-quality ingredients. I'll definitely be ordering from here again!",
    image: "/images/reviews-section/client-2.jpeg",
  },
];
type Props = {};
export default function ReviewsSection({}: Props) {
  return (
    <section className="py-20 sm:py-40 bg-secondary relative">
      <Image
        src={"/images/decorations/weavy-white-top.png"}
        height={80}
        width={1200}
        alt="weavy top"
        className="absolute start-0 max-h-[150px] bg-cover w-full -top-0.5  rotate-x-180 z-[9]"
      />
      <Image
        src={"/images/decorations/weavy-white-bottom.png"}
        height={372}
        width={1536}
        alt="weavy top"
        className="absolute start-0  w-full bg-cover max-h-[120px] -bottom-1  z-[9] "
      />
      <div className="container">
        <SpecialHeading
          title="what say our clients"
          subTitle="customer reviews"
          className="text-white"
        />
        <div className="mt-10">
          <CustomerReviewsSlider reviewsList={reviewsList} />
        </div>
      </div>
    </section>
  );
}
