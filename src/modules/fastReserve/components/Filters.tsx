"use client";

import { useEffect } from "react";
import FastReserveSideFilters from "./SideFilters";
import LeafletMapClientWrapper from "@/components/common/LeafletMapClientWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FastReserveFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const getParamsLoc = (values: [number, number]) => {
    console.log("موقعیت جدید:", values);

    // if (values) {
    //   const params = new URLSearchParams(searchParams.toString());
    //   params.set("lat", String(values[0]));
    //   params.set("lng", String(values[1]));
    //   params.set("page", "1");
    //   params.set("limit", "12");
    //   router.push(`${pathname}?${params.toString()}`);
    // }
  };
  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:justify-between  h-auto lg:h-[350px] mb-10 ">
      <div className=" w-full lg:w-[60%] h-full">
        <FastReserveSideFilters />
      </div>
      <div className=" w-full lg:w-[38%] h-[300px] lg:h-full mt-4 lg:mt-0 ">
        <LeafletMapClientWrapper getParamsLoc={getParamsLoc} />
      </div>
    </div>
  );
};

export default FastReserveFilters;
