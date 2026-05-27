"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { shabnam } from "@/Fonts";
import Link from "next/link";
import ToggleTheme from "@/components/common/ToggleTheme";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { registerStep1Action } from "../actions/registerStep1";
import { RegisterFormData } from "../views/RegisterView";

interface Props {
  next: () => void;
  data: RegisterFormData;
  updateData: (newData: Partial<RegisterFormData>) => void;
}
interface AuthResponse {
  success: boolean;
  tempUserId?: number;
  message?: string;
  debugCode?: string;
}

export default function RegisterStep1View({ next, data, updateData }: Props) {
  const t = useTranslations("auth.register");
  const locale = useLocale();
  const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  const [message, setMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const emailInput = formData.get("email") as string;

    updateData({ email: emailInput });

    const result = (await registerStep1Action(null, formData)) as AuthResponse;

    if (result.success) {
      if (result.tempUserId) {
        localStorage.setItem("tempUserId", String(result.tempUserId));
        updateData({ tempUserId: result.tempUserId });
      }
      localStorage.setItem("registerEmail", emailInput);

      if (result.debugCode) {
        localStorage.setItem("bypass_otp", String(result.debugCode));
      }

      next();
    } else {
      setMessage(result.message || "خطایی رخ داد");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="w-full flex justify-between items-center mt-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-[3px] 
           cursor-pointer hover:opacity-80 transition"
        >
          <Image
            src="/icons/fastReservePage/home.png"
            alt="home icon"
            width={22}
            height={22}
          />
          <span
            className="text-[#0D3B66] dark:text-white text-[16px]
           leading-[24px] font-normal"
          >
            {t("ftitle")}
          </span>
        </Link>
        <div
          className={`flex items-center gap-2 md:gap-3 h-8 
            ${direction === "rtl" ? "flex-row-reverse justify-start" : "justify-end"}`}
        >
          <ToggleTheme />
          <div className="h-full">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      <form action={handleSubmit} className="flex flex-col gap-4 mt-8 w-full">
        <div className="w-full  flex flex-col gap-4 mb-14">
          <p className="text-[#1E2022] dark:text-white text-[20px] lg:text-[24px] font-bold leading-[28px]">
            {t("title")}
          </p>
          <p className="text-[#1E2022] dark:text-white/70 text-[14px] lg:text-[16px] font-normal leading-[22px]">
            {t("description")}
          </p>
        </div>

        <div className="w-full  flex flex-col gap-[20px] mb-[24px]">
          <div className="relative">
            <input
              type="email"
              name="email"
              defaultValue={data?.email || ""}
              placeholder={t("emailPlaceholder")}
              className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] dark:bg-[#1E2022] dark:text-white p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none text-[14px]`}
            />
            <Image
              src="/icons/fastReservePage/Frame.svg"
              alt="icon"
              width={20}
              height={20}
              className={`absolute top-1/2 -translate-y-1/2 dark:invert ${direction === "rtl" ? "left-[20px]" : "right-[20px]"}`}
            />
          </div>
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#0D3B66] text-white mt-3"
          >
            {t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
}
