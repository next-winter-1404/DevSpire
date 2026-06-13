"use client";

import { Check } from "lucide-react";
import { useForm } from "react-hook-form";

const DiscountCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ discountCode: string }>();
  const onSubmit = (data: { discountCode: string }) => {
    console.log(data);
  };
  return (
    <div className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD] p-6 dark:bg-[#27272A]">
      <h2 className="text-[24px] font-bold text-foreground mb-6 ">کد تخفیف</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full flex  flex-col items-start gap-6  md:flex-row md:items-center md:justify-between "
      >
        <div className="flex flex-col gap-2 items-start w-full relative pb-6">
          <label className="text-[14px] text-foreground font-bold">
            کد تخفیف
          </label>
          <input
            placeholder="کد تخفیف خود را وارد کنید ..."
            {...register(`discountCode`, {
              required: "کد خود را وارد کنید",
            })}
            className={`w-full md:w-[250px]  placeholder:text-[#777777] text-foreground bg-[#F5F5F5]
                     dark:bg-[#3F3F46] rounded-[40px] p-3.5 text-[14px] outline-none focus:ring-2 ${
                       errors?.discountCode
                         ? " border border-red-500 focus:ring-red-500"
                         : " focus:ring-blue-500"
                     }`}
          />
          {errors.discountCode?.message && (
            <span className="absolute bottom-0 text-[12px] text-red-500 font-medium">
              {errors.discountCode.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-3 py-2 md:mt-4
          border border-[#0D3B66] text-[#0D3B66] text-[14px] md:text-base rounded-[12px] md:rounded-[16px]
           hover:bg-blue-50 transition-colors shrink-0"
        >
          <Check className="w-4 h-4 text-[#0D3B66]" />
          اعمال کد تخفیف
        </button>
      </form>
    </div>
  );
};

export default DiscountCode;
