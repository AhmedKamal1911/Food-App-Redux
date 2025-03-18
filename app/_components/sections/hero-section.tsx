"use client";
import { cn } from "@/lib/utils";
import { AnimationSequence } from "motion";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  stagger,
  useAnimate,
  usePresence,
} from "motion/react";
import { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const Slides = [
  <Slide1 key={"slide-1"} />,
  <Slide2 key={"slide-2"} />,
  <Slide3 key={"slide-3"} />,
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log({ currentSlide });
  function slideIncrement() {
    setCurrentSlide((prev) => (prev >= 2 ? 0 : prev + 1));
  }
  function slideDecrement() {
    setCurrentSlide((prev) => (prev <= 0 ? 2 : prev - 1));
  }
  return (
    <section className="h-[60vh] md:h-screen relative overflow-hidden bg-[url('/images/decorations/chef-bg.png')] bg-cover bg-no-repeat ">
      <div className="container h-full">
        <div className="absolute left-0 top-1/2 w-full flex justify-between z-[888]">
          <Button
            variant={"outline"}
            className="rounded-[2px] max-sm:h-7 max-sm:w-5"
            onClick={() => slideDecrement()}
          >
            <ArrowBigLeft className=" text-white size-4 md:size-6" />
          </Button>
          <Button
            variant={"outline"}
            className="rounded-[2px] max-sm:h-7 max-sm:w-5"
            onClick={() => slideIncrement()}
          >
            <ArrowBigRight className="text-white size-4 sm:size-6" />
          </Button>
        </div>
        <div className="h-full">
          <AnimatePresence>
            {currentSlide === 0 && <Slide1 />}
            {currentSlide === 1 && <Slide2 />}
            {currentSlide === 2 && <Slide3 />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function MainHeroHeading({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "order-0 text-center md:text-left flex flex-col gap-2  w-full ",
        className
      )}
    >
      <h1 className=" max-sm:text-4xl max-md:text-6xl md:text-7xl lg:text-[120px] xl:text-[130px] font-bold uppercase text-white leading-[1.2]">
        Quality F<span className="text-primary">oo</span>ds
      </h1>
      <span className="max-sm:text-[12px] min-[376px]:text-[16px] sm:text-[17px] xl:text-xl font-bold uppercase text-primary tracking-[10px]">
        Healthy food for healthy body
      </span>
    </div>
  );
}

function Slide1({ className }: { className?: string }) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      // const animateOutro = async () => {
      //   const sequence: AnimationSequence = [
      //     [
      //       ".slide-ingredient",
      //       { y: -10, opacity: 0 },
      //       {
      //         duration: 0.4,
      //         delay: stagger(0.2),
      //       },
      //     ],
      //     [".slide-3-heading", { x: "-100%", opacity: 0 }, { duration: 0.5 }],
      //     [
      //       ".slide-3-pizza",
      //       { x: "-180%", rotate: -360, opacity: 0 },
      //       { duration: 0.6 },
      //     ],
      //   ];
      //   const animation = animate(sequence);
      //   await animation;
      //   console.log("outroAnimation Complted", animation.time);
      //   safeToRemove();
      // };
      // animateOutro();
    } else {
      const animateIntro = async () => {
        const sequence: AnimationSequence = [
          [".slide-1-heading", { x: 0, opacity: 1 }, { duration: 0.3 }],
          [
            ".slide-1-pizza",
            { rotate: 360, x: 0, opacity: 1 },
            { duration: 0.5 },
          ],
          [
            ".slide-ingredient",
            { y: 0, opacity: 1 },
            {
              duration: 0.3,
              delay: stagger(0.2),
            },
          ],
        ];
        const animation = animate(sequence);
        await animation;
        console.log("animation completed", animation.time);
      };
      animateIntro();
    }
    return () => {};
  }, [animate, isPresent, safeToRemove]);

  return (
    <motion.div
      exit={{ opacity: 0, rotate: 360 }}
      ref={scope}
      className={cn(
        "flex h-full flex-1 max-md:flex-col-reverse items-center justify-center gap-8 pt-20 md:pt-0",
        className
      )}
    >
      <div
        style={{ transform: "translateX(180%)" }}
        className="slide-1-heading"
      >
        <MainHeroHeading />
      </div>
      <div
        style={{ transform: "translateX(-180%)" }}
        className={
          "relative w-full max-md:max-w-[230px] -order-1 slide-1-pizza"
        }
      >
        <Image
          src={"/images/hero-section/slide-1/pizza.png"}
          height={586}
          width={550}
          alt="slideimg"
          className="w-full"
          priority
        />
        <motion.div
          initial={{ y: -80 }}
          className="slide-ingredient absolute bg-cover opacity-0 -end-10 top-10 w-[184px] h-[151px] bg-no-repeat bg-[url('/images/hero-section/slide-1/peper-1.png')]"
        />
        <motion.div
          initial={{ y: -80 }}
          className="slide-ingredient absolute bg-cover opacity-0  end-0 -top-10 w-[177px] h-[94px] bg-no-repeat bg-[url('/images/hero-section/slide-1/peper-2.png')]"
        />
        <motion.div
          initial={{ y: -80 }}
          className="slide-ingredient absolute bg-cover opacity-0  start-30 -top-10  w-[105px]  h-[86px] bg-no-repeat bg-[url('/images/hero-section/slide-1/garlic-1.png')]"
        />
        <motion.div
          initial={{ y: -80 }}
          className="slide-ingredient absolute bg-cover opacity-0 start-0 top-8 w-[105px] h-[96px] bg-no-repeat bg-[url('/images/hero-section/slide-1/garlic-2.png')]"
        />
        <motion.div
          initial={{ y: -80 }}
          className="slide-ingredient absolute bg-cover opacity-0 -end-15 -bottom-5 w-[218px] h-[220px] bg-no-repeat bg-[url('/images/hero-section/slide-1/grass.png')]"
        />
        <motion.div
          initial={{ y: -80 }}
          className="slide-ingredient absolute bg-cover opacity-0 -start-5 bottom-0 w-[162px] h-[172px] bg-no-repeat bg-[url('/images/hero-section/slide-1/half-tomato.png')]"
        />
      </div>
    </motion.div>
  );
}

function Slide2({ className }: { className?: string }) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      // const animateOutro = async () => {
      //   const sequence: AnimationSequence = [
      //     [
      //       ".slide-ingredient",
      //       { y: -10, opacity: 0 },
      //       {
      //         duration: 0.4,
      //         delay: stagger(0.2),
      //       },
      //     ],
      //     [".slide-2-heading", { x: "-100%", opacity: 0 }, { duration: 0.5 }],
      //     [
      //       ".slide-2-pizza",
      //       { x: "180%", rotate: 360, opacity: 0 },
      //       { duration: 0.6 },
      //     ],
      //   ];
      //   const animation = animate(sequence);
      //   await animation;
      //   console.log("outroAnimation Complted", animation.time);
      //   safeToRemove();
      // };
      // animateOutro();
    } else {
      const animateIntro = async () => {
        const sequence: AnimationSequence = [
          [".slide-2-heading", { x: 0, opacity: 1 }, { duration: 0.3 }],
          [
            ".slide-2-pizza",
            { rotate: -360, x: 0, opacity: 1 },
            { duration: 0.5 },
          ],
          [
            ".slide-ingredient",
            { y: 0, opacity: 1 },
            {
              duration: 0.3,
              delay: stagger(0.2),
            },
          ],
        ];
        const animation = animate(sequence);
        await animation;
        console.log("animation completed", animation.time);
      };
      animateIntro();
    }
    return () => {};
  }, [animate, isPresent, safeToRemove]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      ref={scope}
      className={cn(
        "flex h-full flex-1 max-md:flex-col items-center justify-center gap-8 pt-20 md:pt-0",
        className
      )}
    >
      <div
        style={{ transform: "translateX(-180%)" }}
        className="slide-2-heading"
      >
        <MainHeroHeading />
      </div>
      <div
        style={{ transform: "translateX(180%)" }}
        className={"relative w-full max-md:max-w-[230px] slide-2-pizza"}
      >
        <Image
          src={"/images/hero-section/slide-2/pizza.png"}
          height={586}
          width={550}
          alt="slideimg"
          className="w-full"
          priority
        />
        <motion.div
          initial={{ y: -80 }}
          className="slide-ingredient opacity-0 absolute bg-cover -start-8 top-20  w-[70px]  h-[86px] bg-no-repeat bg-[url('/images/hero-section/slide-2/garlic-1.png')]"
        />
        <motion.div
          initial={{ y: -70 }}
          className="slide-ingredient opacity-0 absolute bg-cover start-0 -top-10 w-[88px] h-[93px] bg-no-repeat bg-[url('/images/hero-section/slide-2/grass.png')]"
        />
        <motion.div
          initial={{ y: -60 }}
          className="slide-ingredient opacity-0 absolute bg-cover start-1/2 -translate-x-1/2 -bottom-15 w-[79px] h-[67px] bg-no-repeat bg-[url('/images/hero-section/slide-2/garlic-2.png')]"
        />
        <motion.div
          initial={{ y: -50 }}
          className="slide-ingredient opacity-0 absolute bg-cover end-0 -bottom-15 w-[201px] h-[120px] bg-no-repeat bg-[url('/images/hero-section/slide-2/small-tomato.png')]"
        />
        <motion.div
          initial={{ y: -60 }}
          className="slide-ingredient opacity-0 absolute bg-cover end-5 -top-10 w-[192px] h-[203px] bg-no-repeat bg-[url('/images/hero-section/slide-2/small-tomato-with-grass.png')]"
        />
        <motion.div
          initial={{ y: -50 }}
          className="slide-ingredient opacity-0 absolute bg-cover end-0 bottom-20 w-[79px] h-[67px] bg-no-repeat bg-[url('/images/hero-section/slide-2/garlic-3.png')]"
        />
      </div>
    </motion.div>
  );
}

function Slide3({ className }: { className?: string }) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (!isPresent) {
      // const animateOutro = async () => {
      //   const sequence: AnimationSequence = [
      //     [
      //       ".slide-ingredient",
      //       { y: -10, opacity: 0 },
      //       {
      //         duration: 0.5,
      //         delay: stagger(0.2),
      //       },
      //     ],
      //     [".slide-3-pizza", { y: 200, opacity: 0 }, { duration: 0.3 }],
      //     [".slide-3-heading", { y: -200, opacity: 0 }, { duration: 0.4 }],
      //   ];
      //   const animation = animate(sequence);
      //   await animation;
      //   console.log("outroAnimation Complted", animation.time);
      //   safeToRemove();
      // };
      // animateOutro();
    } else {
      const animateIntro = async () => {
        const sequence: AnimationSequence = [
          [".slide-3-pizza", { y: 0, opacity: 1 }, { duration: 0.6 }],
          [".slide-3-heading", { y: 0, opacity: 1 }, { duration: 0.6 }],
          [
            ".slide-ingredient",
            { y: 0, opacity: 1 },
            {
              duration: 0.9,
              delay: stagger(0.2),
            },
          ],
        ];
        const animation = animate(sequence);
        await animation;
        console.log("animation completed", animation.time);
      };
      animateIntro();
    }
    return () => {};
  }, [animate, isPresent, safeToRemove]);

  return (
    <motion.div
      exit={{ opacity: 0, rotate: -360 }}
      ref={scope}
      className={cn(
        "flex h-full flex-1 flex-col items-center justify-center gap-8 relative pt-[130px] sm:pt-[80px]",
        className
      )}
    >
      <div
        className="pb-52 lg:pb-80 opacity-0 slide-3-heading"
        style={{ transform: "translateY(-208px)" }}
      >
        <MainHeroHeading className="items-center" />
      </div>
      <div
        style={{ transform: "translateY(475px)" }}
        className={"absolute bottom-0 start-0 end-0 opacity-0  slide-3-pizza"}
      >
        <Image
          src={"/images/hero-section/slide-3/pizza.png"}
          height={437}
          width={1008}
          alt="slideimg"
          className="w-full"
          priority
        />
        <motion.div
          initial={{ y: -30 }}
          className=" slide-ingredient absolute bg-cover opacity-0 -right-10 top-20  w-[382px]  h-[300px] bg-no-repeat bg-[url('/images/hero-section/slide-3/grass-1.png')]"
        />
        <motion.div
          initial={{ y: -20 }}
          className=" slide-ingredient absolute bg-cover opacity-0 left-[430px] top-10 w-[114px] h-[142px] bg-no-repeat bg-[url('/images/hero-section/slide-3/grass-2.png')]"
        />
        <motion.div
          initial={{ y: -10 }}
          className=" slide-ingredient absolute bg-cover opacity-0 left-0 bottom-20 w-[239px] h-[167px] bg-no-repeat bg-[url('/images/hero-section/slide-3/grass-3.png')]"
        />
        <motion.div
          initial={{ y: -15 }}
          className=" slide-ingredient absolute bg-cover opacity-0 right-5 bottom-10 w-[173px] h-[124px] bg-no-repeat bg-[url('/images/hero-section/slide-3/grass-4.png')]"
        />
      </div>
    </motion.div>
  );
}
