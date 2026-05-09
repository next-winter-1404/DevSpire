"use client";

import React from "react";  // اضافه کن اگر قبلاً نیست
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl"; // اضافه کردن useLocale
import Image from "next/image";
import { shabnam } from "@/Fonts";
import Link from "next/link";

export default function LoginPage() {
    const t = useTranslations('auth.login');
    const layoutT = useTranslations("auth.layout");
    const router = useRouter();
    const locale = useLocale(); // گرفتن زبان فعلی
    const isRtl = locale === "fa";
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMsg, setErrorMsg] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const toEnglishDigits = (value: string) => {
        return value
            .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
    };

    const handleSubmit = async () => {
        const normalizedPassword = toEnglishDigits(password);

        setErrorMsg("");
        if (!email.trim() || !normalizedPassword) {
            setErrorMsg(t("enterEmailPassword"));
            return;
        }


        setLoading(true);

        try {
            const res = await fetch("http://next.genzuni.website/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    password: normalizedPassword
                }),

            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || t("loginError")); // استفاده از ترجمه برای خطا
                return;
            }

    if (data.accessToken) {
  document.cookie = `accessToken=${data.accessToken}; path=/`;
}

if (data.refreshToken) {
  document.cookie = `refreshToken=${data.refreshToken}; path=/`;
}



            alert(t("successMessage")); // استفاده از ترجمه

router.push(`/${locale}/dashboard`);
        } catch (e) {
            setErrorMsg(t("serverError")); // استفاده از ترجمه
        } finally {
            setLoading(false);
        }
    };


    return (
        <div dir={isRtl ? "rtl" : "ltr"} className={`w-full min-h-screen bg-gray-100 flex items-center justify-center ${shabnam.className}`}>
            <div className="w-full max-w-[1344px] bg-gray-100 flex flex-col lg:flex-row justify-center items-stretch gap-[24px] lg:gap-[40px] pt-4 lg:pt-12 pb-2 lg:pb-12">

                <div className="w-full lg:w-[648px] lg:h-[880px] bg-white rounded-[40px] px-[24px] sm:px-[32px] lg:px-[48px] pt-[24px] lg:pt-[30px] pb-[32px] lg:pb-[48px] shadow-[2px_4px_8px_0px_#00000026] flex flex-col">


                    <div className="flex flex-col">
                        <div className="flex items-center gap-[3px] mt-[16px] lg:mt-[110px] animate-[fadeText_0.7s_ease]
 h-[24px] mb-[20px] lg:mb-[40px]
 animate-[fadeText_0.7s_ease]">
                            <Image
                                src="/icons/fastReservePage/home.png"
                                alt="home icon"
                                width={22}
                                height={22}

                            />
                            <span className="text-[#0D3B66] text-[16px] leading-[24px] font-normal animate-[fadeText_0.7s_ease]">
                                {t("ftitle")}
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

                        <div className="w-full lg:w-[552px] flex gap-3 flex-col mb-[20px] lg:mb-[40px] animate-[fadeText_0.7s_ease]
">
                            <p className="text-[#1E2022] text-[24px] font-bold leading-[32px] 
 ">
                                {t("title")}
                            </p>
                            <p className="text-[#1E2022] text-[16px] font-normal leading-[24px] 
">
                                {t("description")}
                            </p>
                        </div>
                        <div className="w-full lg:w-[552px] flex flex-col gap-[20px] lg:gap-[32px]
 mb-[20px] lg:mb-[32px]
">
                            <div className="relative">
                                <input
                                    value={email}                   // اضافه شده
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("emailPlaceholder")}
                                    className={`
w-full h-[62px] rounded-[40px]
bg-[#F5F5F5]
p-[20px]
${isRtl ? "pr-[55px] text-right" : "pl-[55px] text-left"}
outline-none
placeholder:text-[#665d55] text-[14px]
transition-all duration-300
focus:scale-[1.01]
focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
animate-[fadeText_0.7s_ease]
`}

                                />
                                <Image
                                    src="/icons/fastReservePage/Frame.svg"
                                    alt="mail icon"
                                    width={20}
                                    height={20}

                                    className={`
absolute top-1/2 -translate-y-1/2 
${isRtl ? "left-[20px]" : "right-[20px]"}
animate-[fadeText_0.7s_ease]
`}
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}

                                    value={password}                // اضافه شده
                                    onChange={(e) => setPassword(toEnglishDigits(e.target.value))}
                                    placeholder={t("passwordPlaceholder")}
                                    className={`
w-full h-[62px] rounded-[40px]
bg-[#F5F5F5]
p-[20px]
${isRtl ? "pr-[55px] text-right" : "pl-[55px] text-left"}
outline-none
placeholder:text-[#665d55] text-[14px]
transition-all duration-300
focus:scale-[1.01]
focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
animate-[fadeText_0.7s_ease]
`}

                                />
                                <Image
                                    src="/icons/fastReservePage/Frame (1).svg"
                                    alt="lock icon"
                                    width={20}
                                    height={20}
                                    onClick={() => setShowPassword(!showPassword)}

                                    className={`
absolute top-1/2 -translate-y-1/2 cursor-pointer
${isRtl ? "left-[20px]" : "right-[20px]"}
animate-[fadeText_0.7s_ease]
`}

                                />
                            </div>

                           <Link href={`/${locale}/auth/forgot-password`}
 className={`text-[#0D3B66] text-[14px] leading-[100%] ${isRtl ? "text-right" : "text-left"} -mt-[14px] animate-[fadeText_0.7s_ease] cursor-pointer`}
                            >
                                {t("forgotPassword")}
                            </Link>
                            <button
                                onClick={handleSubmit}         // اضافه شده
                                disabled={loading}
                                className="
    w-full h-[62px] rounded-[40px] px-[20px]
    flex justify-center items-center
    bg-[#0D3B66] text-white font-normal text-base
    cursor-pointer
    transition-all duration-200
    hover:bg-[#0D3B66]/80
    animate-[fadeText_0.7s_ease]
  "
                            >
                                {loading ? t("loading") : t("submit")}
                            </button>
                            {errorMsg && (
                                <p className="text-red-600 text-sm mt-2">
                                    {errorMsg}
                                </p>
                            )}

                        </div>
                        <div className="flex items-center w-full lg:w-[551px] h-[22px] mb-[24px] gap-[24px] animate-[fadeText_0.7s_ease]">
                            <div className="h-[1px] bg-[#777777] flex-1" />
                            <span className="text-[#777777] text-base font-normal">{t("or")}
                            </span>
                            <div className="h-[1px] bg-[#777777] flex-1" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-[16px]
 mb-[24px]">
                            <button
                                className="
    w-full sm:w-[264px]
 h-[62px] rounded-[40px]
    border border-[#1E2022]
    text-[#1E2022] text-base
    flex items-center justify-center
    cursor-pointer
    transition-all duration-200
    hover:bg-[#f2f2f2]
    hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]
hover:scale-[1.02]
active:scale-[0.97]
transition-all duration-300
animate-[fadeText_0.7s_ease]
  "
                            >
                                <div className="flex items-center gap-[8px] ">
                                    <Image src="/icons/fastReservePage/google-icon-logo-svgrepo-com 1.svg" width={24} height={24} alt="" />
                                    {t("loginWithGoogle")}
                                </div>
                            </button>
                            <button
                                className="
       w-full sm:w-[264px]
 h-[62px] rounded-[40px]
    border border-[#1E2022]
    text-[#1E2022] text-base
    flex items-center justify-center
    cursor-pointer
    transition-all duration-200
    hover:bg-[#f2f2f2]
    hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)]
hover:scale-[1.02]
active:scale-[0.97]
transition-all duration-300
animate-[fadeText_0.7s_ease]
  "
                            >
                                <div className="flex items-center gap-[8px]">
                                    <Image src="/icons/fastReservePage/apple-logo-svgrepo-com 1.svg" width={24} height={24} alt="" />
                                    {t("loginWithApple")}
                                </div>
                            </button>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="flex items-center gap-[4px] animate-[fadeText_0.7s_ease]" >
                                <span className="text-[16px] text-black">{t("noAccount")}
                                </span>

                            <Link href={`/${locale}/auth/register`}
 className="text-[#0D3B66] underline cursor-pointer hover:opacity-70 transition" >
                                    {t("signUp")}
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="relative hidden lg:block w-full lg:w-[648px] lg:h-[880px] rounded-[40px] overflow-hidden shadow-[2px_4px_8px_0px_#00000026] transition-transform duration-700 ease-out hover:scale-[1.01]"
                >


                    <Image
                        src="/images/fastReservePage/login.jpg"
                        alt="login"
                        fill
                        className="object-cover  transition-transform duration-[1200ms] ease-out
    hover:scale-110 "
                    />
                    <div
                        className="
      absolute bottom-[40px] left-1/2 -translate-x-1/2
w-[90%] lg:w-[599px]
      h-[113px]
      flex
      items-center
      justify-between
      gap-[24px]
      p-[32px]
      rounded-[40px]
      bg-[#00000099]
      shadow-[2px_4px_8px_0px_#00000026]
      animate-[overlayEnter_0.7s_ease]
transition-all duration-300
hover:scale-[1.02]
    "
                    >
                        <img
                            src="/icons/fastReservePage/Frame 37.svg"
                            alt="آیکون"
                            className="w-[160px] h-[390px] flex-shrink-0"
                        />
                        <div className={`flex-1 flex flex-col ${isRtl ? "text-right" : "text-left"}`}>
                            <p
                                className="
      font-shabnam
      font-normal
      text-[16px]
      leading-[100%]
      tracking-[0%]
      mb-1
      text-white
      transition-all duration-500
hover:text-white/90

    "
                            >
                                {layoutT("imageTitle")}
                            </p>
                            <p
                                className="
      font-shabnam
      font-normal
      text-[14px]
      leading-[100%]
      tracking-[0%]
      text-white/80
      
    "
                            >
                                {layoutT("imageDesc")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

