"use client";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import Image from "next/image";
import { Bath, BedDouble, Car, MapPin, Users } from "lucide-react";
import CurveArrow from "../../../../../../../public/icons/CurveArrow";
import { IGeneraData } from "../types";
import { EditOrCreateEstateAction } from "../action";

interface IProps {
  generalData: IGeneraData;
  onPrev: () => void;
  role: "admin" | "seller";
}
const EstateStep5 = ({ generalData, onPrev, role }: IProps) => {
  console.log("allData", generalData);
  const router = useRouter();

  const [state, action, isPending] = useActionState<
    {
      data: IGeneraData;
      error: Record<string, string> | null;
      success: boolean;
    },
    FormData
  >(
    EditOrCreateEstateAction,

    {
      data: generalData,
      error: null,
      success: false,
    },
  );
  const { data, error, success } = state;

  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطایی رخ داده است");
    } else if (success) {
      if (generalData.id) {
        toast.success("خانه ی مدنظر با موفقیت ویرایش شد");
      } else {
        toast.success("خانه ی شما با موفقیت اضافه شد");
      }
      router.push(
        `/dashboard/${role == "seller" ? "seller" : "admin"}/estates-management`,
      );
    }
  }, [state]);

  return (
    <form action={action}>
      <div
        dir="rtl"
        className="w-full  
      rounded-3xl flex flex-col gap-8 text-gray-800"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div
            className="w-full lg:w-1/2 relative h-72 lg:h-auto min-h-[300px] 
        rounded-3xl overflow-hidden shadow-sm"
          >
            <Image
              src="/images/fastReservePage/NoImage.png"
              alt="آپارتمان لوکس زعفرانیه"
              fill
              className="object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {generalData?.step1?.title || "عنوانی وارد نشده است"}
              </h1>

              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                <span>
                  {generalData.step2?.address || "ادرسی وارد نشده است"}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                {generalData?.step1?.caption || "توضیحاتی وارد نشده است"}
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <span className="text-xl font-bold text-gray-900">
                {generalData?.step1?.discounted_price
                  ? generalData.step1.discounted_price.toLocaleString()
                  : generalData?.step1?.price
                    ? generalData?.step1?.price.toLocaleString()
                    : "قیمت وارد نشده است"}{" "}
                <span className="text-sm font-normal text-gray-600">تومان</span>
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900">برچسب ها :</h3>
          <div className="flex flex-wrap gap-3">
            {Array.isArray(generalData?.step3?.tags) &&
            generalData.step3.tags.length > 0 ? (
              generalData.step3.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#ff8a00] text-white px-5 py-1.5 rounded-lg text-sm font-medium"
                >
                  {tag}
                </span>
              ))
            ) : typeof generalData?.step3?.tags === "string" ? (
              <span className="bg-[#ff8a00] text-white px-5 py-1.5 rounded-lg text-sm font-medium">
                {generalData.step3.tags}
              </span>
            ) : (
              <p className="text-[#777777] font-bold ">موردی یافت نشده</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-gray-900">سایر مشخصات :</h3>
          <div className="flex flex-wrap gap-3">
            <FeatureBadge
              icon={<BedDouble size={16} />}
              text={` ${generalData.step3?.rooms || 0} خوابه`}
            />
            <FeatureBadge
              icon={<Bath size={16} />}
              text={` ${generalData.step3?.bathrooms || 0} حمام`}
            />
            <FeatureBadge
              icon={<Car size={16} />}
              text={` ${generalData.step3?.parking || 0} پارکینگ`}
            />
            <FeatureBadge
              icon={<Users size={16} />}
              text={` ${generalData.step1?.capacity || 0} نفر`}
            />
          </div>
        </div>
      </div>
      <div className=" w-full flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer"
        >
          <CurveArrow className="rotate-270" />
          <span className="font-regular text-[16px]">مرحله قبل</span>
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
        >
          <span className="font-regular text-[16px]">تایید و ثبت نهایی</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

function FeatureBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#ff8a00] text-white px-4 py-2 rounded-lg text-sm font-medium">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default EstateStep5;
