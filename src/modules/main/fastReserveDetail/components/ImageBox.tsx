"use client";

import CatalogModal from "@/components/common/Catalog";
import Image from "next/image";
import { useState } from "react";

const ImageBox = ({ photos }: { photos: string[] | null }) => {
  const [openCatalog, setOpenCatalog] = useState<boolean>(false);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between w-full h-auto md:h-[439px]">
      <div className=" relative w-full md:w-[67%] h-[250px] sm:h-[350px] md:h-full">
        <Image
          src={photos?.[3] ?? "/images/fastReservePage/bigHouse.png"}
          alt="bigImage"
          fill
          className="object-cover rounded-[24px]"
        />
      </div>
      <div
        className="w-full md:w-[31%] h-[120px] sm:h-[180px] md:h-full flex flex-row md:flex-col gap-4 md:gap-0 
      items-center md:items-end justify-between "
      >
        <div className=" relative w-1/2 md:w-full h-full md:h-[46%]">
          <Image
            src={photos?.[1] ?? "/images/fastReservePage/house2.png"}
            alt="house"
            fill
            className="object-cover rounded-[24px]"
          />
        </div>
        <div className="relative w-1/2 md:w-full h-full md:h-[46%]">
          <Image
            src={photos?.[2] ?? "/images/fastReservePage/house1.png"}
            alt="house"
            fill
            className="object-cover rounded-[24px]"
          />
          {photos && photos?.slice(3).length > 0 && (
            <div
              className="absolute inset-0 bg-black/40 rounded-[24px] flex items-center justify-center 
          text-[12px] sm:text-[14px] md:text-[16px] "
            >
              <button
                onClick={() => setOpenCatalog(true)}
                className="border border-[#ffff] text-[#ffff] px-2 sm:px-4 py-1.5 sm:py-2 rounded-[40px]
               hover:bg-white/20 transition whitespace-nowrap"
              >
                {photos?.slice(3).length} مشاهده بیشتر
              </button>
            </div>
          )}
          {photos && openCatalog && (
            <CatalogModal
              isOpen={openCatalog}
              onClose={() => setOpenCatalog(false)}
              photos={photos?.slice(3)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
