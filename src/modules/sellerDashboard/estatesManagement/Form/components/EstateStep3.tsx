"use client";
import { IGeneraData, IStep3Data } from "../types";
import { Controller, useForm } from "react-hook-form";
import CurveArrow from "../../../../../../public/icons/CurveArrow";
import TagsInput from "@/components/common/TagsInput";

interface IProps {
  generalData: IGeneraData;
  handlePrev: () => void;
  handleNext: () => void;
  onChangeData: (data: IGeneraData) => void;
}

const EstateStep3 = ({
  generalData,
  handleNext,
  handlePrev,
  onChangeData,
}: IProps) => {
  const { register, handleSubmit, control } = useForm<IStep3Data>({
    defaultValues: generalData.step3,
  });

  const onSubmit = (data: IStep3Data) => {
    onChangeData({
      ...generalData,
      step3: {
        ...data,
        rooms: Number(data.rooms),
        bathrooms: Number(data.bathrooms),
        parking: Number(data.parking),
      },
    });
    handleNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-8 w-full"
    >
      <div className="flex items-center  gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            تعداد اتاق
          </label>
          <input
            {...register("rooms")}
            type="number"
            min={0}
            className="w-full h-12  px-4
             bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            تعداد پارکینگ
          </label>
          <input
            {...register("parking")}
            type="number"
            min={0}
            className="w-full h-12  px-4
             bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
        </div>
      </div>
      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            تعداد حمام
          </label>
          <input
            {...register("bathrooms")}
            type="number"
            min={0}
            className="w-full h-12 px-4 bg-[#FFFFFF] border
             border-[#DDDDDD] rounded-[16px]"
          />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            برچسب ها
          </label>
          <Controller
            name="tags"
            control={control}
            defaultValue={generalData.step3.tags || []}
            render={({ field }) => (
              <TagsInput
                onChange={field.onChange}
                value={
                  typeof field.value == "string"
                    ? [field.value]
                    : (field.value ?? [])
                }
                placeholder="تایپ کنید و Enter بزنید..."
              />
            )}
          />
        </div>
      </div>

      <div className=" w-full flex justify-between mt-10">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center gap-2 py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer"
        >
          <CurveArrow className="rotate-270" />
          <span className="font-regular text-[16px]">مرحله قبل</span>
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 py-[13px] px-3 
          text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
        >
          <span className="font-regular text-[16px]">تایید و ادامه</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default EstateStep3;
