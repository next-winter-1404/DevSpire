"use client";

import { useEffect } from "react";
import FastReserveSideFilters from "./SideFilters";
import LeafletMapClientWrapper from "@/components/common/LeafletMapClientWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

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
  useEffect(() => {
    setCookie(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1LCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiLYp9iv2YXbjNmGINin2qnYp9mG2KoiLCJwcm9maWxlUGljdHVyZSI6bnVsbCwiaWF0IjoxNzc4NTMwNTkxLCJleHAiOjE3Nzg1MzQxOTF9.QyaTNJgMLXw0COiDUu-EYNm_fjKr424XXOEUV_k0uqE",
    );
    setCookie(
      "refreshToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1LCJlbWFpbCI6ImFkbWluMTIzQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsIm5hbWUiOiLYp9iv2YXbjNmGINin2qnYp9mG2KoiLCJwcm9maWxlUGljdHVyZSI6bnVsbCwiaWF0IjoxNzc4NTIyMzY5LCJleHAiOjE3NzkxMjcxNjl9.F8ddkeP1JZx-ZOpOc8HAysrTnxlWrY7w4EJ-6psqD64",
    );
  }, []);
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
