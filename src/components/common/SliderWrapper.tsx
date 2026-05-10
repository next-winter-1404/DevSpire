"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

const SliderWrapper = ({ children }: { children: ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const getScrollAmount = () => {
    if (!sliderRef.current) return 0;
    const container = sliderRef.current?.clientWidth;
    if (window.innerWidth < 768) {
      return container * 1.3;
    }
    return container / 3;
  };

  const scroll = (direction: "right" | "left") => {
    if (sliderRef.current) {
      const scrollAmount = getScrollAmount();
      const currentScroll = sliderRef.current.scrollLeft;
      if (
        Math.ceil(Math.abs(currentScroll)) + sliderRef.current.clientWidth >=
        sliderRef.current.scrollWidth - 10
      ) {
        return sliderRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }
      sliderRef.current.scrollTo({
        left:
          direction == "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const { clientWidth, scrollWidth, scrollLeft } = sliderRef.current;
      const cardWidth = clientWidth / 3;
      if (Math.ceil(Math.abs(scrollLeft)) + clientWidth >= scrollWidth) {
        sliderRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        scroll("right");
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className=" w-full relative group ">
      <button
        onClick={() => scroll("right")}
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center
           bg-[#0d3b66] text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 
           transition-opacity disabled:opacity-0"
      >
        <Image
          src="/icons/fastReservePage/right.png"
          alt="left"
          width={15}
          height={15}
        />
      </button>

      <div
        onMouseLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        ref={sliderRef}
        dir="ltr"
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#0d3b66] text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
        aria-label="Previous"
      >
        <Image
          src="/icons/fastReservePage/left.png"
          alt="left"
          width={15}
          height={15}
        />
      </button>
    </div>
  );
};

export default SliderWrapper;
