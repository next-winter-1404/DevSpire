"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";
import { sendOtpAction } from "@/modules/auth/forgot-password/actions/forgot-password.actions";
import ToggleTheme from "@/components/common/ToggleTheme";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Link } from "@/i18n/routing";
export interface ForgotPasswordFormData {
  email?: string;
  otp?: string;
  password?: string;
}

interface Props {
  next: () => void;
  updateData: (newData: Partial<ForgotPasswordFormData>) => void;
}

export default function ForgotPasswordStep1({ next, updateData }: Props) {
  const t = useTranslations("auth.forgotPassword.step1");
  const locale = useLocale();
  const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error(t("emailPlaceholder"));
      return;
    }

    try {
      setLoading(true);
      const result = await sendOtpAction({ email: trimmedEmail });

      if (result.success) {
        updateData({ email: trimmedEmail });
        localStorage.setItem("resetEmail", trimmedEmail);

        if (result.debugCode) {
          localStorage.setItem("bypass_otp_forget", String(result.debugCode));
        }

        toast.success(t("successMessage"));
        next();
      } else {
        toast.error(result.message || "خطا در ارسال کد");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      toast.error("خطای غیرمنتظره رخ داد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center mt-8">
        <Link
          href={`/`}
          className="flex items-center gap-[3px] mt-[16px] 
          lg:mt-[24px] mb-[24px] lg:mb-[40px] h-[24px]
           animate-[fadeText_0.7s_ease] cursor-pointer hover:opacity-80 transition"
        >
          <Image
            src="/icons/fastReservePage/home.png"
            alt="home icon"
            width={22}
            height={22}
            className="dark:invert"
          />
          <span
            className="text-[#0D3B66] dark:text-white 
          text-[16px] leading-[24px] font-normal"
          >
            {t("home")}
          </span>
        </Link>
        <div
          className={`flex items-center gap-2 md:gap-3 h-8 ${direction === "rtl" ? "flex-row-reverse justify-start" : "justify-end"}`}
        >
          <ToggleTheme />
          <div className="h-full">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8 ">
        <div className="w-full flex flex-col gap-2 mb-[24px] lg:mb-[40px]">
          <p className="text-[#1E2022] dark:text-white text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
            {t("title")}
          </p>
          <p className="text-[#1E2022] dark:text-white/70 text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[24px]">
            {t("description")}
          </p>
        </div>
        <div className="w-full  flex flex-col gap-[20px]">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] dark:bg-[#1E2022] dark:text-white p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] dark:placeholder:text-white/50 text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`}
            />
            <Image
              src="/icons/fastReservePage/Frame.svg"
              alt="mail icon"
              width={20}
              height={20}
              className={`absolute top-1/2 -translate-y-1/2 dark:invert ${direction === "rtl" ? "left-[20px]" : "right-[20px]"} animate-[fadeText_0.7s_ease]`}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[52px] lg:h-[62px] 
            rounded-[40px] px-[20px] flex justify-center
             items-center bg-[#0D3B66] text-white font-normal
              text-base cursor-pointer transition-all duration-200 mt-2
               hover:bg-[#0D3B66]/80 disabled:opacity-50 animate-[fadeText_0.7s_ease]"
          >
            {loading ? t("loading") || "در حال ارسال..." : t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
