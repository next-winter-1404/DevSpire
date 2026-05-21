import CustomSelect from "@/components/common/CustomSelectOption"
import { THouse } from "@/components/common/types"
import { useLocale } from "next-intl"
import React from "react"
import CurveArrow from "../../../../../public/icons/CurveArrow"
import { Controller, useForm } from "react-hook-form"

interface IProps {
  house: THouse
  handlePrev: (stepData: any) => void
  handleNext: (stepData: any) => void
  handleFinalSubmit: (stepData: any) => void
  formData: any
}

const EstateFacilities = ({ house, handlePrev, handleNext, formData }: IProps) => {
  const locale = useLocale()

  const yardTypeOptions = [
    { value: "balcony", label: locale === "en" ? "reserve" : "بالکن دار" },
    { value: "type2", label: locale === "en" ? "mortgage" : "نوع 2" },
    { value: "type3", label: locale === "en" ? "rental" : "نوع 3" },
  ]
  const tagsOptions = [
    { value: "balcony", label: locale === "en" ? "reserve" : "بالکن دار" },
    { value: "type2", label: locale === "en" ? "mortgage" : "نوع 2" },
    { value: "type3", label: locale === "en" ? "rental" : "نوع 3" },
  ]

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      rooms: house.rooms,
      bathrooms: house.bathrooms,
      parking: house.parking,
      yardType: formData?.yardType || yardTypeOptions[0].value,
      tags: formData?.tags || tagsOptions[0].value,
    },
  })

  const onSubmit = (data: any) => {
    handleNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="rooms" className="font-regular text-[16px] text-[#1E2022]">
              تعداد اتاق
            </label>
            <Controller
              name="rooms"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="rooms"
                  type="text"
                  className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="bathrooms" className="font-regular text-[16px] text-[#1E2022]">
              تعداد حمام
            </label>
            <Controller
              name="bathrooms"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="bathrooms"
                  type="text"
                  className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="parking" className="font-regular text-[16px] text-[#1E2022]">
              تعداد پارکینگ
            </label>
            <Controller
              name="parking"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="parking"
                  type="text"
                  className="w-full h-12 indent-4 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="yardType" className="font-regular text-[16px] text-[#1E2022]">
              نوع حیاط
            </label>
            <Controller
              name="yardType"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  options={yardTypeOptions}
                  onValueChange={(value) => {
                    field.onChange(value)
                    setValue("yardType", value)
                  }}
                  className="w-full bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
                  defaultValue={field.value}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="tags" className="font-regular text-[16px] text-[#1E2022]">
            برچسب ها
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CustomSelect
                options={tagsOptions}
                onValueChange={(value) => {
                  field.onChange(value)
                  setValue("tags", value)
                }}
                className="w-full bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px]"
                defaultValue={field.value}
              />
            )}
          />
        </div>
      </div>
      <div className="flex justify-between">
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
          className="flex items-center gap-2 py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
        >
          <span className="font-regular text-[16px]">مرحله بعد</span>
          <CurveArrow className="rotate-90" />
        </button>
      </div>
    </form>
  )
}

export default EstateFacilities
