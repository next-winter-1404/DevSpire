"use client";

import { X, Loader2, Plus, Trash2, User } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { TReservation } from "@/components/common/types";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller } from "react-hook-form";

interface Props {
  reservation: TReservation;
  onClose: () => void;
}

const EditBookingModal = ({ reservation, onClose }: Props) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TReservation>({
    defaultValues: {
      ...reservation,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "traveler_details",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TReservation) => {
      const res = await httpClient.put(
        `/admin/bookings/${reservation.id}`,
        data,
      );
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "رزرو با موفقیت ویرایش شد");
      router.refresh();
      onClose();
    },
    onError: () => {
      toast.error("خطا در ویرایش رزرو");
    },
  });

  const onSubmit = (data: TReservation) => {
    mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-background rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="relative flex items-center justify-between border-b border-border p-5">
          <h3 className="text-lg font-bold">ویرایش رزرو</h3>
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full bg-muted hover:bg-muted/80"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>ایمیل</label>
              <input {...register("sharedEmail", {})} className="input" />
            </div>

            <div>
              <label>موبایل</label>
              <input {...register("sharedMobile", {})} className="input" />
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <label>وضعیت رزرو</label>
            <select {...register("status")}>
              <option value="pending">در انتظار</option>
              <option value="confirmed">تایید شده</option>
              <option value="canceled">رد شده</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">اطلاعات مسافران</h4>
              <button
                type="button"
                onClick={() =>
                  append({
                    gender: "male",
                    firstName: "",
                    lastName: "",
                    birthDate: "",
                    nationalId: "",
                  })
                }
                className="
    flex items-center gap-2
    px-4 py-2
    rounded-xl
    bg-primary
    text-white
    hover:opacity-90
  "
              >
                <Plus size={16} />
                افزودن مسافر
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="
      relative
      rounded-2xl
      border
      border-border
      bg-muted/20
      p-5
      space-y-4
    "
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User size={18} />
                      <span className="font-medium">مسافر {index + 1}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="
          p-2
          rounded-lg
          text-red-500
          hover:bg-red-50
          transition
        "
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">نام</label>

                      <input
                        {...register(`traveler_details.${index}.firstName`)}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">نام خانوادگی</label>

                      <input
                        {...register(`traveler_details.${index}.lastName`)}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">کد ملی</label>

                      <input
                        {...register(`traveler_details.${index}.nationalId`)}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">جنسیت</label>

                      <select
                        {...register(`traveler_details.${index}.gender`)}
                        className="input"
                      >
                        <option value="male">مرد</option>

                        <option value="female">زن</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm mb-2">تاریخ تولد</label>

                      <Controller
                        control={control}
                        name={`traveler_details.${index}.birthDate`}
                        render={({ field }) => (
                          <DatePicker
                            value={field.value || ""}
                            onChange={(date) => {
                              if (!date) {
                                field.onChange("");
                                return;
                              }

                              field.onChange(date.toDate().toISOString());
                            }}
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            containerClassName="w-full"
                            inputClass="input"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-xl"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary text-white rounded-xl flex items-center gap-2"
            >
              {isPending && <Loader2 className="animate-spin" size={16} />}
              ذخیره تغییرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
