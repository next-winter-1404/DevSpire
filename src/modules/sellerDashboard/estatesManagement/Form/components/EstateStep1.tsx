/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomSelect from "@/components/common/CustomSelectOption";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CurveArrow from "../../../../../../public/icons/CurveArrow";
import * as z from "zod";
import { useQuery } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import { Rating } from "react-simple-star-rating";
import { IGeneraData, IStep1Data } from "../types";

interface IProps {
  generalData: IGeneraData;
  handlePrev: () => void;
  handleNext: () => void;
  onChangeData: (data: IGeneraData) => void;
}

interface ICategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const validationSchema = z
  .object({
    id: z.number().optional(),
    title: z.string().min(4, "عنوان باید حداقل ۴ کاراکتر باشد"),
    capacity: z.coerce.number().min(1, "ظرفیت باید حداقل ۱ نفر باشد"),
    transaction_type: z.string().min(1, "نوع معامله را انتخاب کنید"),
    price: z.coerce.number("قیمت باید عدد باشد").min(1, "مبلغ را وارد کنید"),
    discounted_price: z.preprocess(
      (val) => (val === "" || val === undefined ? undefined : Number(val)),
      z.number().min(0, "قیمت نمی‌تواند منفی باشد").optional(),
    ),
    category: z.string().optional(),
    rate: z.number().min(1).max(5),
    caption: z.string().optional(),
  })
  .refine(
    (data) => {
      if (typeof data.discounted_price !== "number") return true;
      return data.discounted_price <= data.price;
    },
    {
      message: "قیمت تخفیف‌دار نمی‌تواند بیشتر از قیمت اصلی باشد",
      path: ["discounted_price"],
    },
  );

const EstateStep1 = ({ generalData, handleNext, onChangeData }: IProps) => {
  const { data: cats, isPending } = useQuery({
    queryKey: ["ALLCATEGORIES"],
    queryFn: async () => {
      const res = await httpClient("/categories");
      return res.data as ICategory[];
    },
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<IStep1Data>({
    resolver: zodResolver(validationSchema) as any,
    defaultValues: generalData.step1,
    mode: "onSubmit",
  });

  const transactionTypeOptions = [
    { value: "reservation", label: "رزرو" },
    { value: "mortgage", label: "رهن" },
    { value: "rental", label: "اجاره ای" },
    { value: "direct_purchase", label: "خرید و فروش" },
  ];

  // const categoryOptions =
  //   cats?.map((cat) => ({ value: String(cat.id), label: cat.name })) || [];
  const inputClass =
    "w-full h-12 rounded-[16px] border border-[#DDDDDD] bg-white px-4 outline-none " +
    "dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-white/10";

  const onSubmit = (data: IStep1Data) => {
    onChangeData({
      ...generalData,
      step1: {
        ...data,
        discounted_price: data.discounted_price ? data.discounted_price : null,
      },
    });
    handleNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 md:gap-8 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            نام ملک
          </label>
          <input
            {...register("title")}
            placeholder="مثلا ویلای ساحلی"
            type="text"
            className={inputClass}
          />
          {errors.title && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            ظرفیت
          </label>
          <input
            {...register("capacity")}
            type="number"
            placeholder="مثلا ۴"
            className={inputClass}
          />
          {errors.capacity && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.capacity.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
        <div className="flex flex-col gap-3 w-full">
          <span className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            نوع معامله
          </span>

          <Controller
            name="transaction_type"
            control={control}
            render={({ field }) => (
              <CustomSelect
                options={transactionTypeOptions}
                defaultValue={field.value}
                onValueChange={field.onChange}
                className="w-full bg-white border border-[#DDDDDD] 
                rounded-[16px] dark:bg-[#2A2D2F] dark:border-white/10"
              />
            )}
          />

          {errors.transaction_type && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.transaction_type.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <span className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            نوع ملک
          </span>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CustomSelect
                options={[{ label: "gg", value: "gg" }]}
                defaultValue={field.value}
                onValueChange={field.onChange}
                className="w-full bg-white border border-[#DDDDDD] rounded-[16px] dark:bg-[#2A2D2F] dark:border-white/10"
              />
            )}
          />

          {errors.category && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.category.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            قیمت (تومان)
          </label>
          <input {...register("price")} type="number" className={inputClass} />
          {errors.price && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.price.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            قیمت تخفیف خورده (اختیاری)
          </label>
          <input
            {...register("discounted_price")}
            type="number"
            placeholder="در صورت داشتن تخفیف وارد کنید"
            className={inputClass}
          />
          {errors.discounted_price && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.discounted_price.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 w-full">
        <div className="flex flex-col gap-3 w-full">
          <span className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
            امتیاز اولیه
          </span>

          <div className="flex items-center pb-2 md:pb-4">
            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <Rating
                  initialValue={field.value}
                  onClick={field.onChange}
                  size={28} // کمی کوچیک‌تر برای موبایل
                  allowFraction={false}
                  fillColor="#facc15"
                  emptyColor="#d1d5db"
                  transition
                  SVGstyle={{ display: "inline-block" }}
                />
              )}
            />
          </div>

          {errors.rate && (
            <span className="text-red-500 text-xs md:text-sm">
              {errors.rate.message}
            </span>
          )}
        </div>

        <div className="hidden md:block" />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <label className="text-[14px] md:text-[16px] text-[#1E2022] dark:text-white/80">
          توضیحات
        </label>
        <textarea
          {...register("caption")}
          rows={5}
          className="w-full resize-none rounded-2xl bg-white border border-[#DDDDDD] px-4 py-3 text-sm leading-7 outline-none focus:ring-2 focus:ring-blue-700/20 dark:bg-[#2A2D2F] dark:text-white dark:border-white/10"
        />
      </div>

      <div className="flex justify-end w-full mt-2 md:mt-4">
        <button
          type="submit"
          className="w-full md:w-fit flex items-center justify-center gap-2 py-[13px] px-4 text-white bg-[#0D3B66] rounded-[16px]"
        >
          <span className="text-[14px] md:text-[16px]">تایید و ادامه</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default EstateStep1;
