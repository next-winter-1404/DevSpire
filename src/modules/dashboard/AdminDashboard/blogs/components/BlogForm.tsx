/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { IBlogPayload, useBlogs } from "../hooks";
import { TBlog } from "@/components/common/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: TBlog;
};

export interface ICategory {
  id: number;
  name: string;
}
export interface ICategoryResponse {
  data: ICategory[];
  totalCount: number;
}

export default function BlogCreateEditModal({
  isOpen,
  onClose,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IBlogPayload>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        title: "",
        caption: "",
        estimated_reading_time: "",
        category_id: undefined,
      });
    }
  }, [initialData, reset]);

  const { data: cats, isPending } = useQuery({
    queryKey: ["ALLCATEGORIES"],
    queryFn: async () => {
      const res = await httpClient("/categories");
      return res.data as ICategoryResponse;
    },
  });

  const { mutate: sendMessage, isPending: pendingMessage } = useMutation({
    mutationFn: async (data: {
      title: string;
      estimated_reading_time: string;
    }) => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: "مقاله بنویس" }],
            blogsDetail: {
              title: data.title,
              estimated_reading_time: data.estimated_reading_time,
            },
            type: "blog",
          }),
        });
        const result = await res.json();
        return result;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      setValue(
        "caption",
        data?.data?.choices?.[0]?.message?.content || "پاسخی دریافت نشد",
      );
    },
    onError: (err: any) => {
      setValue(
        "caption",
        err.response?.data?.message || err.message || "server error",
      );
    },
  });

  const { createBlogMutation, editBlogMutation } = useBlogs(
    initialData?.id || 0,
  );

  const onSubmit = (data: IBlogPayload) => {
    if (initialData) {
      editBlogMutation.mutate(data, { onSuccess: () => onClose() });
    } else {
      createBlogMutation.mutate(data, { onSuccess: () => onClose() });
    }
  };

  const isLoading =
    isSubmitting &&
    (createBlogMutation.isPending || editBlogMutation.isPending);

  if (!isOpen) return null;

  const captionInput = watch("caption");
  const titleInput = watch("title");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40
     backdrop-blur-sm"
    >
      <div
        className="
        w-full max-w-[600px]
        bg-[#ffff]
        rounded-3xl
        p-8
        shadow-xl
        animate-in fade-in zoom-in-95
        dark:bg-[#2B2B2B]
      "
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            {initialData ? "ویرایش مقاله" : "ساخت مقاله جدید"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#3A3A3A]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold dark:text-gray-200">
              عنوان مقاله
            </label>
            <input
              {...register("title", { required: "عنوان الزامی است" })}
              className="
                h-[48px]
                rounded-xl
                bg-gray-100
                px-4
                outline-none
                focus:ring-2 focus:ring-blue-500
                dark:bg-[#404040]
              "
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold dark:text-gray-200">
                زمان مطالعه (مثلاً 5 min)
              </label>
              <input
                {...register("estimated_reading_time", {
                  required: "زمان مطالعه الزامی است",
                })}
                placeholder="5 min"
                className="
                h-[48px]
                rounded-xl
                bg-gray-100
                px-4
                outline-none
                focus:ring-2 focus:ring-blue-500
                dark:bg-[#404040]
              "
              />
              {errors.estimated_reading_time && (
                <span className="text-sm text-red-500">
                  {errors.estimated_reading_time.message}
                </span>
              )}
            </div>
            {isPending ? (
              <p className="text-foreground">درحال بارگزاری دسته بندی ها ...</p>
            ) : cats && cats.totalCount > 0 ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold dark:text-gray-200">
                  دسته‌بندی
                </label>

                <select
                  {...register("category_id")}
                  className="
                py-3
                  rounded-xl
                  bg-gray-100
                  px-4
                  outline-none
                  focus:ring-2 focus:ring-blue-500
                  dark:bg-[#404040]
                  text-foreground
                "
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  {cats?.data?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold dark:text-gray-200">
              متن مقاله
            </label>
            <div className="relative w-full">
              <textarea
                rows={7}
                {...register("caption", {
                  required: "متن مقاله الزامی است",
                })}
                className=" 
        w-full
        rounded-xl
        bg-gray-100
        p-4
        pb-12 /* اضافه کردن پدینگ در پایین برای اینکه متن زیر دکمه نرود */
        outline-none
        focus:ring-2 focus:ring-blue-500
        dark:bg-[#404040]
      "
              />

              {!captionInput && titleInput && (
                <button
                  disabled={pendingMessage}
                  type="button"
                  onClick={() =>
                    sendMessage({
                      title: getValues("title") ?? "بدون عنوان",
                      estimated_reading_time:
                        getValues("estimated_reading_time") ?? "5 min",
                    })
                  }
                  className="bg-primary hover:bg-blue-700 transition
                 text-white px-3 py-1.5 rounded-lg backdrop-blur-sm
        text-sm absolute bottom-3 right-3 cursor-pointer z-10"
                >
                  {pendingMessage ? "درحال ساخت ..." : "ساخت با هوش مصنوعی 💫"}
                </button>
              )}
            </div>

            {errors.caption && (
              <span className="text-sm text-red-500">
                {errors.caption.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                px-5 py-2
                rounded-full
                bg-gray-100
                hover:bg-gray-200
                transition
                dark:bg-[#404040]
              "
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="
                px-6 py-2
                rounded-full
                bg-primary
                text-white
                transition
                disabled:opacity-50
              "
            >
              {isLoading
                ? "در حال ذخیره..."
                : initialData
                  ? "ذخیره تغییرات"
                  : "ایجاد مقاله"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
