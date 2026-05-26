"use client";
import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { completeRegistrationAction } from "../actions/registerStep3";
import ToggleTheme from "@/components/common/ToggleTheme";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { toast } from "react-hot-toast";

interface Props {
    back: () => void;
    data: any;           
    updateData: (newData: any) => void; 
}

export default function RegisterStep3View({ back, data, updateData }: Props) {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const router = useRouter();
    const t = useTranslations("auth.register.step3");
    const locale = useLocale();
    const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";

    const [state, formAction] = useActionState(completeRegistrationAction, {
        success: false,
        message: "",
    });

    useEffect(() => {
        if (state.success) {
            toast.success(state.message || t("successMessage") || "Registration completed!");
            localStorage.removeItem("tempUserId");
            localStorage.removeItem("userId");
            localStorage.removeItem("registerEmail");
            const timer = setTimeout(() => {
                router.push(`/${locale}`);
            }, 2000); 

            return () => clearTimeout(timer);
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, router, locale, t]);


    const toEnglishDigits = (value: string) =>
        value
            .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

    return (
        <div className={`${shabnam.className}`} dir={direction}>
            <div className={`flex items-center gap-2 md:gap-3 h-8 ${direction === "rtl" ? "flex-row-reverse justify-start" : "justify-end"}`}>
                <ToggleTheme />
                <div className="h-full">
                    <LanguageSwitcher />
                </div>
            </div>
            <form action={formAction} className="flex flex-col">
                <input type="hidden" name="userId" value={data.userId || ""} />

                <div onClick={back} className="flex items-center gap-[3px] mt-[16px] lg:mt-[24px] mb-[16px] lg:mb-[24px] animate-[fadeText_0.7s_ease] cursor-pointer">
                    <Image src="/icons/fastReservePage/Frame (2).svg" alt="back icon" width={22} height={22} className="dark:invert" />
                    <span className="text-[#0D3B66] dark:text-white text-[16px] leading-[24px]">{t("back")}</span>
                </div>
                <div className="lg:hidden relative w-full h-[180px] rounded-[24px] overflow-hidden mb-[24px]">
                    <Image src="/images/fastReservePage/login.jpg" alt="auth" fill className="object-cover" />
                </div>
                <div className="w-full lg:w-[552px] flex flex-col gap-2 mb-[24px] lg:mb-[40px] animate-[fadeText_0.7s_ease]">
                    <p className="text-[#1E2022] dark:text-white text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">{t("title")}</p>
                    <p className="text-[#1E2022] dark:text-white/70 text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">{t("description")}</p>
                </div>
                <div className="w-full lg:w-[552px] flex flex-col gap-[20px] lg:gap-[32px] mb-[24px] lg:mb-[32px]">
                    <div className="relative">
                        <input type="text" name="phoneNumber"
                            placeholder={t("phonePlaceholder")}
                            onChange={(e) => e.target.value = toEnglishDigits(e.target.value)}
                            className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] dark:bg-[#1E2022] dark:text-white p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] dark:placeholder:text-white/50 text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`} />
                        <Image src="/icons/fastReservePage/Frame.svg" alt="email icon" width={20} height={20}
                            className={`absolute top-1/2 -translate-y-1/2 dark:invert ${direction === "rtl" ? "left-[20px]" : "right-[20px]"}`} />
                    </div>

                    {[
                        { show: showPass1, setShow: setShowPass1, name: "password", placeholder: t("passwordPlaceholder") },
                        { show: showPass2, setShow: setShowPass2, name: "confirmPassword", placeholder: t("confirmPassPlaceholder") },
                    ].map(({ show, setShow, name, placeholder }, idx) => (
                        <div key={idx} className="relative">
                            <input type={show ? "text" : "password"} name={name}
                                onChange={(e) => e.target.value = toEnglishDigits(e.target.value)}
                                placeholder={placeholder}
                                className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] dark:bg-[#1E2022] dark:text-white p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] dark:placeholder:text-white/50 text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`} />
                            <button type="button" onClick={() => setShow(!show)}
                                className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${direction === "rtl" ? "left-4" : "right-4"}`}
                                aria-label={show ? t("hidePassword") : t("showPassword")}>
                                <Image src={show ? "/icons/fastReservePage/Frame (1).svg" : "/icons/fastReservePage/eye-closed (2).svg"} alt="toggle password visibility" width={24} height={24} className="dark:invert" />
                            </button>
                        </div>
                    ))}
                    {state.message && !state.success && (
                        <p className="text-sm text-center text-red-500">
                            {state.message}
                        </p>
                    )}

                    <button type="submit"
                        className="w-full h-[52px] lg:h-[62px] rounded-[40px] px-[20px] flex justify-center items-center bg-[#0D3B66] text-white text-base cursor-pointer transition-all duration-200 hover:bg-[#0D3B66]/80 animate-[fadeText_0.7s_ease]">
                        {t("submit")}
                    </button>
                </div>
            </form>
        </div>
    );
}
