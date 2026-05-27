"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { shabnam } from "@/Fonts";
import {
  useState,
  useEffect,
  useRef,
  useActionState,
  startTransition,
} from "react";
import { toast } from "react-hot-toast";
import { verifyEmailAction, resendCodeAction } from "../actions/registerStep2";
import ToggleTheme from "@/components/common/ToggleTheme";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { RegisterFormData } from "../views/RegisterView";

interface Props {
  next: () => void;
  back: () => void;
  data: RegisterFormData;
  updateData: (newData: Partial<RegisterFormData>) => void;
}

export default function RegisterStep2View({
  next,
  back,
  data,
  updateData,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const canResend = timeLeft === 0;

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const t = useTranslations("auth.step2");
  const locale = useLocale();
  const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

  const [verifyState, verifyAction] = useActionState(verifyEmailAction, {
    success: false,
    message: "",
  });

  const [resendState, resendAction] = useActionState(resendCodeAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    const bypassCode = localStorage.getItem("bypass_otp");
    if (bypassCode) {
      const codeArray = bypassCode.split("");
      setTimeout(() => {
        setOtp([...codeArray, "", "", "", "", ""].slice(0, 6));
      }, 0);
      localStorage.removeItem("bypass_otp");
    }
  }, []);

  useEffect(() => {
    if (verifyState?.success) {
      toast.success("Email verified successfully");
      if (verifyState.userId) updateData({ tempUserId: verifyState.userId });

      const timer = setTimeout(() => {
        next();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (verifyState?.message && !verifyState.success) {
      toast.error(verifyState.message);
    }
  }, [verifyState, next, t, updateData]);

  useEffect(() => {
    if (resendState.success) {
      toast.success("Code resent");
      setTimeout(() => {
        setTimeLeft(60);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }, 0);
    }
  }, [resendState, t]);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    const persian = "۰۱۲۳۴۵۶۷۸۹";
    const english = "0123456789";
    value = value.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)]);
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const persian = "۰۱۲۳۴۵۶۷۸۹";
    const english = "0123456789";
    let pastedData = e.clipboardData.getData("text").trim();
    pastedData = pastedData.replace(
      /[۰-۹]/g,
      (d) => english[persian.indexOf(d)],
    );

    if (!/^\d{1,6}$/.test(pastedData)) return;

    const pasteArray = pastedData.split("").slice(0, 6);
    const newOtp = [...otp];
    pasteArray.forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);

    const nextFocusIndex = Math.min(pasteArray.length, 5);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="w-full flex justify-between items-center mt-8">
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
      <div className="flex flex-col gap-3">
        <div
          className="w-full flex flex-col gap-4 
        mb-[24px] lg:mb-[40px] animate-[fadeText_0.7s_ease]"
        >
          <p className="text-[#1E2022] dark:text-white text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
            {t("title")}
          </p>
          <p
            className="text-[#1E2022] dark:text-white/70 text-[14px] 
          lg:text-[16px] leading-[22px] lg:leading-[24px]"
          >
            {t("description")} <strong>{data.email}</strong>
          </p>
          <p
            className="text-[#0D3B66] dark:text-white text-[14px] lg:text-[16px] cursor-pointer"
            onClick={back}
          >
            {t("changeEmail")}
          </p>
        </div>
        <form
          action={verifyAction}
          className="w-full  flex flex-col gap-[20px] lg:gap-[32px] mb-[24px] lg:mb-[32px]"
        >
          <input
            type="hidden"
            name="tempUserId"
            value={data.tempUserId || ""}
          />
          <input type="hidden" name="verificationCode" value={otp.join("")} />

          <div className="w-full flex justify-between gap-2" dir="ltr">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                maxLength={1}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onPaste={handlePaste}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) {
                    inputRefs.current[i - 1]?.focus();
                  }
                }}
                className="w-full max-w-[52px] h-[52px] lg:max-w-none lg:w-[78px] lg:h-[59px] text-center text-[18px] lg:text-[22px] font-bold bg-[#F5F5F5] dark:bg-[#1E2022] dark:text-white rounded-[40px] border border-[#E0E0E0] dark:border-[#3a3a3a] outline-none transition-all duration-300 focus:border-[#0D3B66] dark:focus:border-white focus:bg-[#eef4fa] dark:focus:bg-[#2a2a2a] animate-[fadeText_0.7s_ease]"
              />
            ))}
          </div>

          {verifyState.message && !verifyState.success && (
            <p className="text-red-500 text-sm text-center">
              {verifyState.message}
            </p>
          )}

          <div className="w-full flex justify-center">
            {canResend ? (
              <button
                type="button"
                onClick={() => {
                  startTransition(() => {
                    const formData = new FormData();
                    formData.append("email", data.email || "");
                    resendAction(formData);
                  });
                }}
                className="text-[#0D3B66] dark:text-white text-[14px] underline"
              >
                {t("resendCode")}
              </button>
            ) : (
              <span className="text-[14px] text-[#1E2022] dark:text-white">
                {t("timeLeft")}: {minutes}:{seconds.toString().padStart(2, "0")}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[52px] lg:h-[62px]
             rounded-[40px] flex justify-center items-center
              bg-[#0D3B66] text-white text-base transition-all
               duration-200 hover:bg-[#0D3B66]/80 animate-[fadeText_0.7s_ease] 
               disabled:opacity-50 mt-2 "
          >
            {t("confirmContinue")}
          </button>
        </form>
      </div>
    </div>
  );
}
