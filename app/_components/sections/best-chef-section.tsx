import SpecialHeading from "@/components/common/special-heading";
import BestChefSlider, { Chef } from "../best-chef-slider";
import Image from "next/image";

type Props = {};
const chefList: Chef[] = [
  {
    id: 1,
    img: "/images/best-chef-section/chef-1.jpeg",
    name: "thomas kliver",
    level: "sous chef",
  },
  {
    id: 2,
    img: "/images/best-chef-section/chef-2.jpeg",
    name: "thomas kliver",
    level: "sous chef",
  },
  {
    id: 3,
    img: "/images/best-chef-section/chef-3.jpeg",
    name: "thomas kliver",
    level: "sous chef",
  },
  {
    id: 4,
    img: "/images/best-chef-section/chef-4.jpeg",
    name: "thomas kliver",
    level: "sous chef",
  },
  {
    id: 5,
    img: "/images/best-chef-section/chef-4.jpeg",
    name: "thomas kliver",
    level: "sous chef",
  },
];
export default function BestChefSection({}: Props) {
  return (
    <section className="py-30 bg-[url('/images/decorations/chef-bg.png')] bg-cover bg-no-repeat relative">
      <Image
        src={"/images/decorations/weavy-white-top.png"}
        height={80}
        width={1200}
        alt="weavy top"
        className="absolute start-0 max-h-[140px] bg-cover  w-full -top-1  rotate-x-180 z-[9]"
      />
      <div className="container">
        <SpecialHeading
          title="meet our experts"
          subTitle="our best chef"
          className="text-white"
        />
        <div className="mt-10">
          <BestChefSlider chefsList={chefList} />
        </div>
      </div>
    </section>
  );
}
