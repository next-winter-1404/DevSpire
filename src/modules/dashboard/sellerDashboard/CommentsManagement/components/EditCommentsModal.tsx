"use client";

import { Loader2, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { useComments } from "../hooks";
import { IHouseCMPayload } from "@/modules/main/booking/types";

interface IProps {
  id: number;
  onClose: () => void;
}

const EditCommentsModal = ({ onClose, id }: IProps) => {
  const { commentDetail, isPending, editCommentMutation } = useComments(id);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IHouseCMPayload>({
    values: {
      title: commentDetail?.title ?? "",
      caption: commentDetail?.caption ?? "",
      rating: parseInt(commentDetail?.rating ?? "0"),
    },
  });

  const onSubmit = async (data: IHouseCMPayload) => {
    editCommentMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
     bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl 
       bg-background shadow-xl animate-in fade-in zoom-in duration-200"
      >
        <div className=" relative flex items-center justify-between border-b border-border p-5">
          <h3 className="text-lg font-bold text-foreground">ویرایش دیدگاه</h3>

          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full bg-gray-100
            cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              در حال دریافت اطلاعات ...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
            <div className="flex w-full flex-col gap-4">
              <div className="relative flex w-full flex-col gap-3 pb-6">
                <label className="text-[15px] font-bold text-foreground">
                  عنوان دیدگاه
                </label>

                <input
                  type="text"
                  placeholder="عنوان را وارد کنید"
                  {...register("title", {
                    required: "عنوان کامنت الزامی است",
                  })}
                  className={`w-full rounded-2xl  bg-background px-4 py-3 text-sm outline-none 
                    transition-all focus:ring-2 focus:ring-ring  border border-[#777777] ${
                      errors.title ? "  border-destructive" : " "
                    }`}
                />

                {errors.title?.message && (
                  <span className="absolute bottom-0 text-[12px] font-medium text-destructive">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="relative flex w-full flex-col gap-3 pb-6">
                <label className="text-[15px] font-bold text-foreground">
                  توضیحات دیدگاه
                </label>

                <textarea
                  rows={4}
                  placeholder="توضیحات را وارد کنید"
                  {...register("caption", {
                    required: "توضیحات لازم است",
                  })}
                  className={`w-full resize-none rounded-2xl border border-[#777777]
                     bg-background px-4 py-3 text-sm leading-7 
                     outline-none transition-all focus:ring-2 focus:ring-ring ${
                       errors.caption ? " border-destructive" : ""
                     }`}
                />

                {errors.caption?.message && (
                  <span className="absolute bottom-0 text-[12px] font-medium text-destructive">
                    {errors.caption.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[15px] font-bold text-foreground">
                  امتیاز شما
                </label>

                <div className="relative flex items-center justify-between pb-4 mx-auto">
                  <Controller
                    name="rating"
                    control={control}
                    rules={{
                      validate: (value) =>
                        Number(value) > 0 || "امتیاز خود را انتخاب کنید",
                    }}
                    render={({ field }) => (
                      <Rating
                        initialValue={Number(field.value) || 0}
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

                {errors.rating?.message && (
                  <span className="text-[12px] font-medium text-destructive">
                    {errors.rating.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-xl border border-border
                 px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-muted"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting && editCommentMutation.isPending}
                  className="inline-flex items-center justify-center rounded-xl text-white
                 bg-primary px-4 py-2 text-sm text-primary-foreground transition-all
                  hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting && editCommentMutation.isPending ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      در حال ذخیره...
                    </>
                  ) : (
                    "ذخیره تغییرات"
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCommentsModal;
