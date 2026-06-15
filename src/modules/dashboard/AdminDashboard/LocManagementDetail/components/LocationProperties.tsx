"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TLocation } from "@/components/common/types";
import { EditLocation } from "../services/PUT/EditLocation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
import { Coords } from "@/components/common/NeshanMap";
import { IAddressDetails } from "@/modules/main/fastReserve/components/Filters";
import axios from "axios";
import toast from "react-hot-toast";

interface IProps {
  location: TLocation | null;
  id: number;
}

interface IData {
  areaName: string;
  lat: string;
  lng: string;
}

const MapView = dynamic(() => import("@/components/common/NeshanMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-[24px] flex items-center justify-center">
      در حال بارگذاری نقشه...
    </div>
  ),
});

const LocationProperties = ({ location, id }: IProps) => {
  const t = useTranslations("adminDashboard.locationsManagement");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<IData>({
    defaultValues: {
      areaName: location?.areaName || "",
      lat: location?.lat?.toString() || "",
      lng: location?.lng?.toString() || "",
    },
  });

  const getMapLocation = (loc: Coords) => {
    setValue("lat", String(loc.lat));
    setValue("lng", String(loc.lng));
    getLoc(loc);
  };

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
      setValue("areaName", data.data.formatted_address);
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "something went wrong");
      }
    },
  });

  const onSubmit = async (data: IData) => {
    setLoading(true);
    try {
      const res = await EditLocation({
        id,
        data: {
          areaName: data.areaName,
          latitude: data.lat,
          longitude: data.lng,
        },
      });
      toast.success(res.message || "ویرایش شد");
      router.push("/dashboard/admin/locations-management");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full pb-8 "
    >
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-4">
          <label className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">
            {t("locationName")}
          </label>
          <input
            type="text"
            {...register("areaName")}
            placeholder={t("locationNamePlc")}
            className="h-12 indent-4 bg-[#FFFFFF] rounded-[16px]   dark:bg-[#262626]"
          />
        </div>
        <div className="flex flex-col gap-4   sm:flex-row">
          <div className="flex flex-col gap-4 flex-1">
            <label className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">
              {t("latitude")}
            </label>
            <input
              type="text"
              {...register("lat")}
              placeholder={t("latitudePlc")}
              className="h-12 indent-4 bg-[#FFFFFF] rounded-[16px]   dark:bg-[#262626]"
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <label className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">
              {t("longitude")}
            </label>
            <input
              type="text"
              {...register("lng")}
              placeholder={t("longitudePlc")}
              className="h-12 indent-4 bg-[#FFFFFF] rounded-[16px]   dark:bg-[#262626]"
            />
          </div>
        </div>
        <div className="w-full h-[250px]">
          <MapView getGeo={getMapLocation} />
        </div>
      </div>
      <div className="flex justify-start w-full mt-4">
        <button
          type="submit"
          disabled={loading}
          className="py-[13px] px-8 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] 
                cursor-pointer   disabled:opacity-60"
        >
          {t("confirm")}
        </button>
      </div>
    </form>
  );
};

export default LocationProperties;
