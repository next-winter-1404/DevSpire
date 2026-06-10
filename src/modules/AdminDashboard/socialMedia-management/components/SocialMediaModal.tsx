"use client";
import { useForm } from "react-hook-form";
import { useSocial } from "../hooks";
import { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";

const socialValidationSchema = z.object({
  platform: z.string().min(1, "انتخاب پلتفرم الزامی است"),
  url: z.string().url("لینک معتبر نیست"),
});

type TSocialSchemaType = z.infer<typeof socialValidationSchema>;

interface IProps {
  id?: number | null;
  onClose: () => void;
}

const SocialMediaModal = ({ id, onClose }: IProps) => {
  const t = useTranslations("adminDashboard.socialMedia");

  const {
    SocialLinkDetail,
    isPending,
    EditSocialLinkMutation,
    createSocialLinkMutation,
  } = useSocial(id || 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(socialValidationSchema),
    defaultValues: {
      platform: "",
      url: "",
    },
  });

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && SocialLinkDetail) {
      reset({
        platform: SocialLinkDetail.platform,
        url: SocialLinkDetail.url,
      });
    }
  }, [SocialLinkDetail, isEditMode, reset]);

  const onSubmitting = (data: TSocialSchemaType) => {
    if (isEditMode) {
      EditSocialLinkMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      createSocialLinkMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isSubmitting =
    EditSocialLinkMutation.isPending || createSocialLinkMutation.isPending;

  return (
    <div
      className="fixed inset-0 z-50 
    flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#1f2937] rounded-2xl shadow-xl 
      overflow-hidden animate-in fade-in zoom-in duration-200"
      >
        <div
          className="flex items-center justify-between p-5 border-b
         border-gray-100 dark:border-white/10"
        >
          <h3 className="text-lg font-bold text-foreground">
            {isEditMode ? t("editSocial") : t("addNewSocial")}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {isPending && isEditMode ? (
          <div className="flex flex-col items-center justify-center p-10 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-500"> {t("loadingData")}...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitting)} className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {t("platformType")}            </label>
              <select
                {...register("platform")}
                className={`w-full h-11 px-3 rounded-xl border bg-gray-50 dark:bg-[#111827] 
                    outline-none transition-all
                  ${errors.platform ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-blue-500"}
                `}
              >
                <option value="">{t("selectPlatform")}</option>
                <option value="instagram">{t("instagram")}</option>
                <option value="telegram">{t("telegram")}</option>
                <option value="whatsapp">{t("whatsapp")}</option>
                <option value="linkedin">{t("linkedin")}</option>
                <option value="website">{t("website")}</option>

              </select>
              {errors.platform && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.platform.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700
               dark:text-gray-300 mb-1.5"
              >
                {t("linkUrl")}              </label>
              <input
                {...register("url")}
                placeholder="https://example.com"
                dir="ltr"
                className={`w-full h-11 px-3 rounded-xl border bg-gray-50 dark:bg-[#111827]
                     outline-none transition-all
                  ${errors.url ? "border-red-500" : "border-gray-200 dark:border-white/10 focus:border-blue-500"}
                `}
              />
              {errors.url && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.url.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl border border-gray-200
                 dark:border-white/10 text-sm font-medium hover:bg-gray-50
                  dark:hover:bg-white/5 transition-colors"
              >
                {t("cancel")}

              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] h-11 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditMode ? t("updateChanges") : t("submitNewLink")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SocialMediaModal;
