"use client";

import { Swiper, SwiperSlide } from "swiper/react";

export default function RelatedProductsSkeleton() {
  return (
    <section className="bg-secondary py-8">
      <div className="container">
        <span className="text-2xl font-bold mb-6 text-white inline-block text-left">
          Related Products :
        </span>
        <div className="relative px-5 lg:px-10">
          <Swiper
            slidesPerView={2}
            spaceBetween={5}
            loop={true}
            pagination={{ clickable: true }}
            modules={[]}
            className="mySwiper mb-8"
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 5 },
              768: { slidesPerView: 2, spaceBetween: 5 },
              900: { slidesPerView: 3, spaceBetween: 2 },
              1200: { slidesPerView: 4, spaceBetween: 15 },
            }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-8  h-[350px]">
                  {/* Image placeholder */}
                  <div className="h-full w-full bg-gray-300 rounded-[3px] animate-pulse" />

                  {/* Title + Price placeholders */}
                  <div className="flex flex-col gap-4 items-center bg-white p-3 rounded-sm sm:w-full">
                    <span className="p-2 w-[180px] bg-gray-300 animate-pulse rounded-[2px]" />
                    <span className="p-2 w-[100px] bg-gray-300 animate-pulse rounded-[2px]" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex items-center justify-center w-[100px] mt-4 mx-auto gap-2 ">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="size-3 rounded-full bg-gray-300 animate-pulse "
            />
          ))}
        </div>
      </div>
    </section>
  );
}
