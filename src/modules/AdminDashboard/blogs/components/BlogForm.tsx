"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { IBlogPayload, useBlogs } from "../hooks";
import { TBlog } from "@/components/common/types";
import { useQuery } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import { useTranslations } from "next-intl";

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
}: Props) {const t = useTranslations("adminDashboard.blogs");

  const {
    register,
    handleSubmit,
    reset,
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
  {initialData ? t("editArticle") : t("createArticle")}
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
{t("title")}            </label>
            <input
              {...register("title", { required: t("titleRequired") })}

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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold dark:text-gray-200">
{t("caption")}            </label>
            <textarea
              rows={3}
              {...register("caption", {
               required: t("captionRequired"),
maxLength: {
  value: 200,
  message: t("captionMax")
}
,
              })}
              className="
                rounded-xl
                bg-gray-100
                p-4
                outline-none
                focus:ring-2 focus:ring-blue-500
                dark:bg-[#404040]
              "
            />
            {errors.caption && (
              <span className="text-sm text-red-500">
                {errors.caption.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold dark:text-gray-200">
             {t("readingTime")}
            </label>
            <input
              {...register("estimated_reading_time", {
              required: t("readingTimeRequired")
,
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
            <p className="text-foreground">{t("loadingCategories")}...</p>
          ) : cats && cats.totalCount > 0 ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold dark:text-gray-200">
                {t("category")}
              </label>

              <select
                {...register("category_id")}
                className="
                  h-[48px]
                  rounded-xl
                  bg-gray-100
                  px-4
                  outline-none
                  focus:ring-2 focus:ring-blue-500
                  dark:bg-[#404040]
                "
              >
                <option value=""> {t("selectCategory")}</option>
                {cats.data.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ""
          )}

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
              {t("cancel")}

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
  ? t("saving")
  : initialData
    ? t("saveChanges")
    : t("createArticle")}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
