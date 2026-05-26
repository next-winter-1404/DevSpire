/* eslint-disable @typescript-eslint/no-explicit-any */
import { THouse } from "@/components/common/types";
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
    formState: { errors, isValid },
  } = useForm<IStep1Data>({
    resolver: zodResolver(validationSchema) as any,
    defaultValues: generalData.step1,
    mode: "onSubmit",
  });

  const transactionTypeOptions = [
    { value: "reserve", label: "رزرو" },
    { value: "mortgage", label: "رهن" },
    { value: "rental", label: "اجاره ای" },
    { value: "direct_purchase", label: "خرید و فروش" },
  ];

  // const categoryOptions =
  //   cats?.map((cat) => ({
  //     value: String(cat.id),
  //     label: cat.name,
  //   })) || [];
  const categoryOptions = [{ value: "1", label: "ggg" }];

  const onSubmit = (data: IStep1Data) => {
    if (Object.keys(errors).length > 0) {
      console.log("have err", errors);
      return;
    }

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
      className="flex flex-col items-start gap-8 w-full"
    >
      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            نام ملک
          </label>
          <input
            {...register("title")}
            placeholder="مثلا ویلای ساحلی"
            type="text"
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            ظرفیت
          </label>
          <input
            {...register("capacity")}
            type="number"
            placeholder="در صورت داشتن تخفیف وارد کنید"
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
          {errors.capacity && (
            <span className="text-red-500 text-sm">
              {errors.capacity.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <span className="font-regular text-[16px] text-[#1E2022]">
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
                className="w-full bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
              />
            )}
          />
          {errors.transaction_type && (
            <span className="text-red-500 text-sm">
              {errors.transaction_type.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <span className="font-regular text-[16px] text-[#1E2022]">
            نوع ملک
          </span>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <CustomSelect
                options={categoryOptions}
                defaultValue={field.value}
                onValueChange={field.onChange}
                className="w-full bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
              />
            )}
          />
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            قیمت (تومان)
          </label>
          <input
            {...register("price")}
            type="number"
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full">
          <label className="font-regular text-[16px] text-[#1E2022]">
            قیمت تخفیف خورده (اختیاری)
          </label>
          <input
            {...register("discounted_price")}
            type="number"
            placeholder="در صورت داشتن تخفیف وارد کنید"
            className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
          />
          {errors.discounted_price && (
            <span className="text-red-500 text-sm">
              {errors.discounted_price.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <span className="font-regular text-[16px] text-[#1E2022]">
            امتیاز اولیه
          </span>
          <div className="flex items-center pb-4">
            <Controller
              name="rate"
              control={control}
              render={({ field }) => (
                <Rating
                  initialValue={field.value}
                  onClick={field.onChange}
                  size={30}
                  allowFraction={false}
                  fillColor="#facc15"
                  emptyColor="#d1d5db"
                  transition
                  SVGstyle={{ display: "inline-block" }}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full"></div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <label className="font-regular text-[16px] text-[#1E2022]">
          توضیحات
        </label>
        <textarea
          {...register("caption")}
          rows={5}
          className="w-full resize-none rounded-2xl bg-[#FFFFFF] border border-[#DDDDDD] px-4 py-3 text-sm leading-7 transition-all outline-none focus:ring-2 focus:ring-blue-700/20 dark:bg-[#3F3F46]"
        />
      </div>

      <div className="flex justify-end w-full mt-4">
        <button
          type="submit"
          className="flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
        >
          <span className="font-regular text-[16px]">تایید و ادامه</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default EstateStep1;
