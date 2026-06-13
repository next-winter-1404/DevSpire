"use client";

import FastReserveSideFilters from "./SideFilters";
import dynamic from "next/dynamic";
import { Coords } from "@/components/common/NeshanMap";
import { useEffect, useState } from "react";
import httpClient from "@/core/interceptor/axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
const MapView = dynamic(() => import("@/components/common/NeshanMap"), {
  ssr: false,
});

type RouteType = "secondary" | string;
export interface IAddressDetails {
  data: {
    status: "OK" | string;
    formatted_address: string;
    route_name: string;
    route_type: RouteType;
    neighbourhood: string;
    city: string;
    state: string;
    place: unknown | null;
    municipality_zone: string;
    in_traffic_zone: boolean;
    in_odd_even_zone: boolean;
    village: unknown | null;
    county: string;
    district: string;
  };
}
const FastReserveFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: getLoc } = useMutation({
    mutationFn: async (data: Coords) => {
      try {
        const res = await fetch("/api/map", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const json = await res.json();
        return json as IAddressDetails;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      if (data.data.formatted_address) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("location", data.data.formatted_address);

        router.replace(`${pathname}?${params.toString()}`);
      }
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "something went wrong");
      }
    },
  });

  const getParamsLoc = async (geo: Coords) => {
    console.log("موقعیت جدید:", geo);
    getLoc(geo);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:justify-between  h-auto lg:h-[350px] mb-10 ">
      <div className=" w-full lg:w-[60%] h-full">
        <FastReserveSideFilters />
      </div>
      <div className=" w-full lg:w-[38%] h-[300px] lg:h-full mt-4 lg:mt-0 ">
        <MapView getGeo={getParamsLoc} />
      </div>
    </div>
  );
};

export default FastReserveFilters;
