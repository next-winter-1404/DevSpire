"use client";
import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import httpClient from "@/core/interceptor/axios";

interface Props {
    next: () => void;
}

export default function Step1({ next }: Props) {
    const t = useTranslations("auth.forgotPassword.step1");
    const locale = useLocale();
    const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleSubmit = async () => {
        if (!email) {
            setErrorMsg("لطفاً ایمیل خود را وارد کنید");
            return;
        }

        try {
            setLoading(true);
            setErrorMsg("");

            const response = await httpClient.post("/auth/forgot-password/request", {
                email: email.trim(),
            });

            console.log("درخواست موفقیت‌آمیز:", response.data);
            localStorage.setItem("resetEmail", email.trim());

            next();

        } catch (error: any) {
            console.error("خطا در ارسال درخواست:", error);
            const message =
                error.response?.data?.message ||
                "خطایی در برقراری ارتباط با سرور رخ داد";

            setErrorMsg(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={shabnam.className} dir={direction}>
            <div className="flex flex-col">
                <div
                    className=" flex items-center gap-[3px] mt-[16px] lg:mt-60 mb-[24px] lg:mb-[40px] h-[24px] animate-[fadeText_0.7s_ease] cursor-pointer">
                    <Image
                        src="/icons/fastReservePage/home.png"
                        alt="home icon"
                        width={22}
                        height={22}
                    />
                    <span className="text-[#0D3B66] text-[16px] leading-[24px] font-normal">
                        {t("home")}
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
                <div className=" w-full lg:w-[552px] flex flex-col gap-2 mb-[24px] lg:mb-[40px] animate-[fadeText_0.7s_ease]" >
                    <p className="text-[#1E2022] text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
                        {t("title")}
                    </p>
                    <p className="text-[#1E2022] text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[24px]">
                        {t("description")}
                    </p>
                </div>
                <div
                    className=" w-full lg:w-[552px] flex flex-col gap-[20px] lg:gap-[32px] mb-[24px] lg:mb-[32px]">
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("emailPlaceholder")}
                            className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`} />
                        <Image
                            src="/icons/fastReservePage/Frame.svg"
                            alt="mail icon"
                            width={20}
                            height={20}
                            className={`absolute top-1/2 -translate-y-1/2 ${direction === "rtl" ? "left-[20px]" : "right-[20px]"} animate-[fadeText_0.7s_ease]`}
                        />
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">
                            {errorMsg}
                        </p>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-[52px] lg:h-[62px] rounded-[40px] px-[20px] flex justify-center items-center bg-[#0D3B66] text-white font-normal text-base cursor-pointer transition-all duration-200 hover:bg-[#0D3B66]/80 disabled:opacity-50 animate-[fadeText_0.7s_ease]">
                        {loading ? "در حال ارسال..." : t("submit")}
                    </button>
                </div>
            </div>
        </div>
    );
}

