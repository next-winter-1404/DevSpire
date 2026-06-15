"use client";
import { IGeneraData, IStep3Data } from "../types";
import { Controller, useForm } from "react-hook-form";
import CurveArrow from "../../../../../../../public/icons/CurveArrow";
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

  const inputClass =
    "w-full h-12 px-4 bg-white border border-[#DDDDDD] dark:!bg-[#1f1f1f] rounded-[16px] outline-none " +
    " dark:text-white dark:placeholder:text-white/40 dark:border-white/10";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 md:gap-8 w-full"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
        <div className="flex flex-col gap-3 md:gap-4 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            تعداد اتاق
          </label>
          <input
            {...register("rooms")}
            type="number"
            min={0}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-3 md:gap-4 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            تعداد پارکینگ
          </label>
          <input
            {...register("parking")}
            type="number"
            min={0}
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
        <div className="flex flex-col gap-3 md:gap-4 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            تعداد حمام
          </label>
          <input
            {...register("bathrooms")}
            type="number"
            min={0}
            className={inputClass}
          />
        </div>

        <div className="flex  flex-col gap-3 md:gap-4 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            برچسب ها
          </label>

          <Controller
            name="tags"
            control={control}
            defaultValue={generalData.step3.tags || []}
            render={({ field }) => (
              <div className="w-full ">
                <TagsInput
                  onChange={field.onChange}
                  value={
                    typeof field.value === "string"
                      ? [field.value]
                      : (field.value ?? [])
                  }
                  placeholder="تایپ کنید و Enter بزنید..."
                />
              </div>
            )}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col-reverse md:flex-row md:justify-between gap-3 md:gap-0 mt-4 md:mt-10">
        <button
          type="button"
          onClick={handlePrev}
          className="w-full md:w-fit flex items-center justify-center gap-2 py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px]"
        >
          <CurveArrow className="rotate-270" />
          <span className="text-[14px] md:text-[16px]">مرحله قبل</span>
        </button>

        <button
          type="submit"
          className="w-full md:w-fit flex items-center justify-center gap-2 py-[13px] px-3 text-white bg-[#0D3B66] rounded-[16px]"
        >
          <span className="text-[14px] md:text-[16px]">تایید و ادامه</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default EstateStep3;
