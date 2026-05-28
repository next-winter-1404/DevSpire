"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { changeUserPassword } from "@/modules/user-Info/services/userService";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordForm() {
  const t = useTranslations("User");
  const locale = useLocale();
  const isRtl = locale === "fa" || locale === "ar";

  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const renderEyeIcon = (isVisible: boolean, toggleFunc: () => void) => (
    <button
      type="button"
      onClick={toggleFunc}
      className={`absolute ${isRtl ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity`}
    >
      <Image
        src={
          isVisible
            ? "/icons/fastReservePage/eye-closed (2).svg"
            : "/icons/fastReservePage/Frame (1).svg"
        }
        alt="toggle password visibility"
        width={20}
        className="dark:invert"
        height={20}
      />
    </button>
  );

  const schema = useMemo(
    () =>
      z
        .object({
          currentPassword: z.string().min(1, t("currentPasswordRequired")),
          newPassword: z.string().min(6, t("newPasswordMin")),
          confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: t("passwordMismatch"),
          path: ["confirmPassword"],
        }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await changeUserPassword(values.currentPassword, values.newPassword);
      toast.success(t("passwordChanged"));
      reset();
    } catch (err: any) {
      toast.error(err?.message || t("passwordChangeError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-10 w-full"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex flex-col gap-2 w-full">
        <label className="dark:text-white/80">{t("passwordCurrent")}</label>
        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20"
            placeholder={t("passwordCurrent")}
            {...register("currentPassword")}
          />
          {renderEyeIcon(showCurrent, () => setShowCurrent(!showCurrent))}
        </div>
        {errors.currentPassword && (
          <p
            className={`${isRtl ? "text-right" : "text-left"} text-[12px] text-red-500`}
          >
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="dark:text-white/80">{t("passwordNew")}</label>
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20"
            placeholder={t("passwordNew")}
            {...register("newPassword")}
          />
          {renderEyeIcon(showNew, () => setShowNew(!showNew))}
        </div>
        {errors.newPassword && (
          <p
            className={`${isRtl ? "text-right" : "text-left"} text-[12px] text-red-500`}
          >
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="dark:text-white/80">{t("passwordRepeat")}</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20"
            placeholder={t("passwordRepeat")}
            {...register("confirmPassword")}
          />
          {renderEyeIcon(showConfirm, () => setShowConfirm(!showConfirm))}
        </div>
        {errors.confirmPassword && (
          <p
            className={`${isRtl ? "text-right" : "text-left"} text-[12px] text-red-500`}
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div
        className={`col-span-2 flex ${isRtl ? "justify-end" : "justify-start"} mt-4`}
      >
        <button
          type="submit"
          disabled={loading}
          className="w-[160px] cursor-pointer h-[48px] rounded-[16px] bg-[#0D3B66] text-white disabled:opacity-60"
        >
          {loading ? t("changingPassword") : t("changePassword")}
        </button>
      </div>
    </form>
  );
}
