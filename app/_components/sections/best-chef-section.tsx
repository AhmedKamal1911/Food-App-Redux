import SpecialHeading from "@/components/common/special-heading";
import BestChefSlider, { Chef } from "../best-chef-slider";

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
    <section className="py-30 bg-[url('/images/decorations/chef-bg.png')] bg-no-repeat relative">
      {/* <Image
        src={"/images/best-chef-section/menu-bottom-bg.png"}
        height={372}
        width={1500}
        alt="weavy top"
        className="absolute start-0  w-full bottom-30 -translate-y-full"
      /> */}
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
