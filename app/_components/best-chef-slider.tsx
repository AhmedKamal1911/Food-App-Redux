"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { RefObject, useRef } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SwiperCore from "swiper";

export type Chef = {
  id: number;
  img: string;
  name: string;
  level: string;
};

type Props = {
  chefsList: Chef[];
};

export default function BestChefSlider({ chefsList }: Props) {
  const swiperRef = useRef<SwiperCore | null>(null); // ✅ Correct Type

  return (
    <div className="relative px-5 lg:px-10">
      <BestChefCustomNavigationButtons swiperRef={swiperRef} />

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ Store Swiper instance correctly
        slidesPerView={4}
        spaceBetween={5}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="mySwiper  pb-16!"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 5 }, // Small screens (sm): 1 slide, 5px gap
          768: { slidesPerView: 2, spaceBetween: 5 }, // Medium screens (md): 3 slides, 10px gap
          900: { slidesPerView: 3, spaceBetween: 2 }, // Medium screens (md): 3 slides, 10px gap
          1200: { slidesPerView: 4, spaceBetween: 15 }, // Large screens (lg and above): 4 slides, 20px gap
        }}
      >
        {chefsList.map((chef) => (
          <SwiperSlide key={chef.id}>
            <ChefCard chef={chef} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function BestChefCustomNavigationButtons({
  swiperRef,
}: {
  swiperRef: RefObject<SwiperCore | null>; // ✅ Correct Type
}) {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 md:-left-2 md:-right-2   flex justify-between px-1 z-10 max-md:hidden">
      <button
        className="cursor-pointer p-0  text-primary/50 hover:text-primary transition-colors"
        onClick={() => swiperRef.current?.slidePrev()} // ✅ Correct Access
      >
        <ChevronLeft className="md:size-10 lg:size-13 " />
      </button>
      <button
        className="cursor-pointer p-0  text-primary/50 hover:text-primary transition-colors"
        onClick={() => swiperRef.current?.slideNext()} // ✅ Correct Access
      >
        <ChevronRight className="md:size-10 lg:size-13 " />
      </button>
    </div>
  );
}

function ChefCard({ chef }: { chef: Chef }) {
  return (
    <div className="flex flex-col  h-full px-3 lg:px-3 xl:px-0">
      <div className=" w-full h-full">
        <Image
          src={chef.img}
          alt="chef img"
          height={263}
          width={287}
          className="object-cover  w-full"
        />
      </div>
      <div className="flex flex-col items-center bg-white p-3">
        <span className="text-xl font-bold uppercase text-secondary">
          {chef.name}
        </span>
        <span className="text-gray-400 capitalize">{chef.level}</span>
      </div>
    </div>
  );
}
