"use client";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Review } from "../../../components/common/sections/reviews-section";

type Props = {
  reviewsList: Review[];
};

export default function CustomerReviewsSlider({ reviewsList }: Props) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={5}
      loop
      autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
      pagination={{ clickable: true }}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper h-full pb-16!"
    >
      {reviewsList.map((review) => (
        <SwiperSlide key={review.id}>
          <ReviewCard review={review} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex max-sm:flex-col max-sm:gap-5 items-center gap-10">
      <div>
        <div className="border-4 rounded-full border-primary overflow-hidden">
          <Image src={review.image} alt="client img" height={130} width={130} />
        </div>
        <span className="text-center block mt-2 text-primary text-xl font-semibold uppercase tracking-wider">
          {review.userName}
        </span>
      </div>

      <div className="bg-white flex-1 p-7 md:p-10 lg:p-15 relative  before:absolute   before:sm:border-15 before:border-e-white before:border-transparent before:right-full before:top-1/2 before:-translate-y-1/2">
        <p className="text-[17px] text-gray-500 italic mb-2">{review.desc}</p>
        <span className="text-primary text-[16px]">
          {review.userName} - {review.designation}
        </span>
      </div>
    </div>
  );
}
