"use client";
import { useEffect } from "react";
import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useTranslations, useLocale } from "next-intl";
import ToggleTheme from "@/components/common/ToggleTheme";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useForgotPasswordOtp } from "../useForgotPasswordOtp.ts/useForgotPasswordOtp";
interface Props {
  next: () => void;
  back: () => void;
  data: any;
  updateData: (newData: any) => void;
}
export default function ForgotPasswordStep2({ next, back, data, updateData }: Props) {
  const locale = useLocale();
  const direction = locale === "fa" ? "rtl" : "ltr";
  const t = useTranslations("auth.forgotPassword.step2");
  
  const {
    code,
    canResend,
    loading,
    handleCodeChange,
    handleResend,
    handleSubmit,
    minutes,
    seconds,
  } = useForgotPasswordOtp(next, t);
  useEffect(() => {
    const otpString = code.join("");
    if (otpString.length === 6) {
      updateData({ resetCode: otpString });
    }
  }, [code, updateData]);

  return (
    <div className={shabnam.className} dir={direction}>
      <div
        className={`flex items-center gap-2 md:gap-3 h-8 ${direction === "rtl" ? "flex-row-reverse justify-start" : "justify-end"
          }`}
      >
        <ToggleTheme />
        <div className="h-full">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="flex flex-col">
        <div
          onClick={back}
          className="flex items-center gap-[3px] mt-[16px] lg:mt-[32px] mb-[16px] lg:mb-[24px] cursor-pointer animate-[fadeText_0.7s_ease]"
        >
          <Image
            src="/icons/fastReservePage/Frame (2).svg"
            alt="back"
            width={22}
            height={22}
            className="dark:invert"
          />
          <span className="text-[#0D3B66] dark:text-white text-[16px]">
            {t("back")}
          </span>
        </div>

        <div className="lg:hidden relative w-full h-[180px] rounded-[24px] overflow-hidden mb-[24px]">
          <Image
            src="/images/fastReservePage/login.jpg"
            alt="login"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full max-w-[552px] mx-auto flex flex-col gap-2 mb-[24px] lg:mb-[40px]">
          <p className="text-[#1E2022] dark:text-white text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
            {t("title")}
          </p>
          <p className="text-[#1E2022] dark:text-white/70 text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">
            {t("description")} {data.email && <strong>({data.email})</strong>}            
          </p>
          <p
            onClick={back}
            className="text-[#0D3B66] dark:text-white text-[14px] lg:text-[16px] cursor-pointer"
          >
            {t("changeEmail")}
          </p>
        </div>

        <div className="w-full max-w-[552px] mx-auto flex flex-col gap-[20px]">
          <div className="w-full flex justify-between gap-2" dir="ltr">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-input-${i}`}
                maxLength={1}
                type="text"
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                value={digit}
                onChange={(e) => handleCodeChange(e.target.value, i)}
                className="w-full max-w-[52px] h-[52px] lg:max-w-none lg:w-[78px] lg:h-[59px] text-center text-[18px] lg:text-[22px] font-bold bg-[#F5F5F5] dark:bg-[#1E2022] text-[#1E2022] dark:text-white rounded-[40px] border border-[#E0E0E0] dark:border-[#444] outline-none transition-all duration-300 focus:border-[#0D3B66] dark:focus:border-white focus:bg-[#eef4fa] dark:focus:bg-[#2A2A2A] animate-[fadeText_0.7s_ease]"
              />
            ))}
          </div>

          <div className="w-full flex justify-center">
           {canResend ? (
              <button
                onClick={handleResend}
                className="text-[#0D3B66] dark:text-white text-[14px] underline"
              >
                ارسال مجدد کد
              </button>
            ) : (
              <span className="text-[14px] text-[#1E2022] dark:text-white/70">
                {t("timeLeft")}: {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[52px] lg:h-[62px] rounded-[40px] flex justify-center items-center bg-[#0D3B66] text-white text-base transition-all duration-200 hover:bg-[#0D3B66]/80 disabled:opacity-50 animate-[fadeText_0.7s_ease]"
          >
            {loading ? t("verifying") : t("confirmContinue")}
          </button>
        </div>
      </div>
    </div>
  );
}
