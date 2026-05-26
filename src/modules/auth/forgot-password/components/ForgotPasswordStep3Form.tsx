"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { shabnam } from "@/Fonts";
import toast from "react-hot-toast";
import ToggleTheme from "@/components/common/ToggleTheme";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { forgotPasswordReset } from "@/modules/auth/forgot-password/services/forgot-password.service";

// ۱. تعریف Props جدید برای پذیرش داده‌های استیت مرکزی
interface Props {
  back: () => void;
  data: any;
}

export default function ForgotPasswordStep3({ back, data }: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const direction = locale === "fa" ? "rtl" : "ltr";
  const t = useTranslations("auth.forgotPassword.step3");

  const convertToEnglishDigits = (value: string) => {
    return value
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
  };

  const handleSubmit = async () => {
    const email = data?.email || localStorage.getItem("resetEmail")?.trim() || "";
    const userId = data?.userId || localStorage.getItem("resetUserId");
    const resetCode = data?.resetCode || localStorage.getItem("resetCode")?.trim() || "";
    const finalPassword = convertToEnglishDigits(password.trim());
    const finalConfirm = convertToEnglishDigits(confirmPassword.trim());

    if (!email) {
      toast.error(t("emailNotFound"));
      return;
    }

    if (!resetCode) {
      toast.error(t("resetError"));
      return;
    }

    if (!finalPassword || !finalConfirm) {
      toast.error(t("enterPassword"));
      return;
    }

    if (finalPassword !== finalConfirm) {
      toast.error(t("passwordMismatch"));
      return;
    }

    try {
      setLoading(true);

      await forgotPasswordReset({
        email,
        userId: userId || null,
        code: resetCode,
        newPassword: finalPassword,
      });

      toast.success(t("passwordChanged") || "رمز عبور با موفقیت تغییر کرد");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");
      localStorage.removeItem("resetUserId");

      router.replace(`/${locale}/auth/login`);
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        t("resetError");

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={shabnam.className} dir={direction}>
      <div className={`flex items-center gap-2 md:gap-3 h-8 ${direction === "rtl" ? "flex-row-reverse justify-start" : "justify-end"}`}>
        <ToggleTheme />
        <div className="h-full">
          <LanguageSwitcher />
        </div>
      </div>

      <div className="flex flex-col">
        <div
          onClick={back}
          className="flex items-center gap-[3px]  mt-[16px] lg:mt-[24px] mb-[16px] lg:mb-[24px]  animate-[fadeText_0.7s_ease] cursor-pointer"
        >
          <Image
            src="/icons/fastReservePage/Frame (2).svg"
            alt="back icon"
            width={22}
            height={22}
            className="dark:invert"
          />
          <span className="text-[#0D3B66] dark:text-white text-[16px] leading-[24px]">
            {t("back")}
          </span>
        </div>
        <div className="lg:hidden relative w-full h-[180px] rounded-[24px] overflow-hidden mb-[24px]">
          <Image
            src="/images/fastReservePage/login.jpg"
            alt="auth"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full max-w-[552px] mx-auto flex flex-col gap-2 mb-[24px] lg:mb-[40px]">
          <p className="text-[#1E2022] dark:text-white text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
            {t("title")}
          </p>
          <p className="text-[#1E2022] dark:text-white/70 text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">
            {t("description")}
          </p>
        </div>

        <div className="w-full max-w-[552px] mx-auto flex flex-col gap-[20px]">
          {[
            { show: showPass1, setShow: setShowPass1, value: password, setValue: setPassword, placeholder: t("passwordPlaceholder") },
            { show: showPass2, setShow: setShowPass2, value: confirmPassword, setValue: setConfirmPassword, placeholder: t("confirmPassPlaceholder") },
          ].map(({ show, setShow, value, setValue, placeholder }, idx) => (
            <div key={idx} className="relative">
              <input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => setValue(convertToEnglishDigits(e.target.value))}
                placeholder={placeholder}
                className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] dark:bg-[#1E2022] dark:text-white p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] dark:placeholder:text-white/50 text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${direction === "rtl" ? "left-4" : "right-4"}`}
                aria-label={show ? t("hidePassword") : t("showPassword")}
              >
                <Image
                  src={show ? "/icons/fastReservePage/Frame (1).svg" : "/icons/fastReservePage/eye-closed (2).svg"}
                  alt="toggle password visibility"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </button>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-[52px] lg:h-[62px] rounded-[40px] px-[20px] flex justify-center items-center bg-[#0D3B66] text-white text-base cursor-pointer transition-all duration-200 hover:bg-[#0D3B66]/80 disabled:opacity-50"
          >
            {loading ? t("changing") : t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
