/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { getUserInfo, updateUserProfile } from "../services/userService";

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type UserInfoFormProps = {
  userId: string;
};

export default function UserInfoForm({ userId }: UserInfoFormProps) {
  const router = useRouter();
  const t = useTranslations("User");

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const data = await getUserInfo(userId);
        reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phoneNumber || "",
          email: data.email || "",
        });
      } catch (error) {
        toast.error(t("fetchError"));
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId, reset, t]);

  const onSubmit = async (data: FormValues) => {
    if (!userId) {
      toast.error(t("fetchError"));
      return;
    }

    try {
      setLoading(true);

      await updateUserProfile(userId, {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phoneNumber: data.phone.trim(),
        email: data.email.trim(),
      });

      toast.success(t("updateSuccess"));
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message || t("updateError"));
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none transition-colors " +
    "dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20 focus:dark:border-[#DDDDDD]/40";

  const errorTextClasses = "text-[12px] text-red-600 dark:text-red-400";

  const isDisabled = loading || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-10 w-full"
    >
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm text-[#1E2022] dark:text-[#F5F5F5]">
          {t("firstName")}
        </label>
        <input
          {...register("firstName", {
            required: t("firstNameRequired") as string,
            minLength: { value: 2, message: t("min2Chars") as string },
            maxLength: { value: 50, message: t("max50Chars") as string },
          })}
          className={inputClasses}
          placeholder={t("firstNamePlaceholder")}
          disabled={isDisabled}
        />
        {errors.firstName && (
          <p className={errorTextClasses}>{errors.firstName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm text-[#1E2022] dark:text-[#F5F5F5]">
          {t("lastName")}
        </label>
        <input
          {...register("lastName", {
            required: t("lastNameRequired") as string,
            minLength: { value: 2, message: t("min2Chars") as string },
            maxLength: { value: 50, message: t("max50Chars") as string },
          })}
          className={inputClasses}
          placeholder={t("lastNamePlaceholder")}
          disabled={isDisabled}
        />
        {errors.lastName && (
          <p className={errorTextClasses}>{errors.lastName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm text-[#1E2022] dark:text-[#F5F5F5]">
          {t("phone")}
        </label>
        <input
          {...register("phone", {
            required: t("phoneRequired") as string,
            pattern: {
              value: /^09\d{9}$/,
              message: t("phoneInvalid") as string,
            },
          })}
          className={inputClasses}
          placeholder={t("phonePlaceholder")}
          inputMode="numeric"
          dir="ltr"
          disabled={isDisabled}
        />
        {errors.phone && (
          <p className={errorTextClasses}>{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm text-[#1E2022] dark:text-[#F5F5F5]">
          {t("email")}
        </label>
        <input
          type="email"
          {...register("email", {
            required: t("emailRequired") as string,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t("emailInvalid") as string,
            },
          })}
          className={inputClasses}
          placeholder="example@gmail.com"
          dir="ltr"
          disabled={isDisabled}
        />
        {errors.email && (
          <p className={errorTextClasses}>{errors.email.message}</p>
        )}
      </div>

      <div className="sm:col-span-2 flex justify-end mt-2 sm:mt-4">
        <button
          type="submit"
          disabled={isDisabled}
          className="w-full sm:w-[160px] h-[48px] rounded-[16px] bg-[#0D3B66] text-white disabled:opacity-60"
        >
          {isDisabled ? t("saving") : t("saveChanges")}
        </button>
      </div>
    </form>
  );
}
