"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import { RefObject, useRef } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
type Props = {
  relatedProducts: Product[];
};
export default function RelatedProductsSection({ relatedProducts }: Props) {
  const swiperRef = useRef<SwiperCore | null>(null); // ✅ Correct Type

  return (
    <section className="bg-secondary py-8">
      <div className="container">
        <span className="text-2xl font-bold  mb-6 text-white inline-block text-left">
          Related Products :
        </span>
        {relatedProducts.length > 1 ? (
          <div className="relative px-5 lg:px-10">
            <BestChefCustomNavigationButtons swiperRef={swiperRef} />
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)} // ✅ Store Swiper instance correctly
              slidesPerView={2}
              spaceBetween={5}
              loop={true}
              pagination={{ clickable: true }}
              modules={[Pagination, Navigation]}
              className="mySwiper pb-16!"
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 5 }, // Small screens (sm): 1 slide, 5px gap
                768: { slidesPerView: 2, spaceBetween: 5 }, // Medium screens (md): 3 slides, 10px gap
                900: { slidesPerView: 3, spaceBetween: 2 }, // Medium screens (md): 3 slides, 10px gap
                1200: { slidesPerView: 4, spaceBetween: 15 }, // Large screens (lg and above): 4 slides, 20px gap
              }}
            >
              {relatedProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <p className="text-center capitalize text-2xl sm:text-3xl text-rose-500 font-bold">
            there is no any related products
          </p>
        )}
      </div>
    </section>
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
        className="cursor-pointer p-0  text-primary hover:text-primary transition-colors bg-white rounded-sm"
        onClick={() => swiperRef.current?.slidePrev()} // ✅ Correct Access
      >
        <ChevronLeft className="md:size-10 lg:size-13 " />
      </button>
      <button
        className="cursor-pointer p-0  text-primary hover:text-primary transition-colors bg-white rounded-sm"
        onClick={() => swiperRef.current?.slideNext()} // ✅ Correct Access
      >
        <ChevronRight className="md:size-10 lg:size-13 " />
      </button>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="relative flex flex-col  h-full px-3 lg:px-3 xl:px-0 ">
      <div className="w-full h-full">
        <Image
          src={product.image ?? "/images/decorations/placeholder.png"}
          alt="product img"
          height={100}
          width={100}
          className="object-cover  w-full"
        />
      </div>
      <div className="flex flex-col items-center bg-white p-3 rounded-sm">
        <Link
          className="max-[300px]:text-[18px] text-xl font-bold uppercase text-secondary line-clamp-1 before:absolute before:inset-0 "
          title={product.name}
          href={`/products/${product.slug}`}
        >
          {product.name}
        </Link>
        <span className="text-gray-400 capitalize">{product.price}</span>
      </div>
    </div>
  );
}
