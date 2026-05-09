"use client";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { useState } from "react";
import { shabnam } from "@/Fonts";

interface Props {
    back: () => void;
}

export default function Step3({ back }: Props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const locale = useLocale();
    const direction = locale === "fa" ? "rtl" : "ltr";
    const t = useTranslations("auth.forgotPassword.step3");
    const convertToEnglishDigits = (value: string) => {
        return value
            .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
    };
    const handleSubmit = async () => {
        const email = localStorage.getItem("resetEmail")?.trim() || "";
        const userId = localStorage.getItem("resetUserId");

        const resetCode = localStorage.getItem("resetCode")?.trim() || "";

        const finalPassword = convertToEnglishDigits(password.trim());
        const finalConfirm = convertToEnglishDigits(confirmPassword.trim());

        if (!email) {
            setErrorMsg("ایمیل پیدا نشد، دوباره تلاش کنید");
            return;
        }

        if (!finalPassword || !finalConfirm) {
            setErrorMsg("لطفاً رمز عبور را وارد کنید");
            return;
        }

        if (finalPassword !== finalConfirm) {
            setErrorMsg("رمز عبور و تکرار آن یکسان نیست");
            return;
        }

        try {
            setLoading(true);
            setErrorMsg("");
            console.log("RESET EMAIL:", email);

            const response = await fetch(
                "http://next.genzuni.website/api/auth/forgot-password/reset",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        userId,
                        resetCode,
                        newPassword: password,
                    }),

                }
            );



            const data = await response.json();
            console.log("SERVER RESPONSE:", data);

            if (!response.ok) {
                throw new Error(data.message || "خطا در تغییر رمز");
            }

            alert("رمز عبور با موفقیت تغییر کرد");

            localStorage.removeItem("resetEmail");
            localStorage.removeItem("resetCode");
            localStorage.removeItem("resetUserId");


            router.push("/login");


        } catch (error: any) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={shabnam.className} dir={direction}>
            <div className="flex flex-col">

                {/* Back button */}
                <div
                    onClick={back}
                    className="
                        flex items-center gap-[3px]
                        mt-16px lg:mt-32 mb-[24px]
                        lg:mb-[40px]
                        h-[24px]
                        animate-[fadeText_0.7s_ease]
                        cursor-pointer
                    "
                >
                    <Image
                        src="/icons/fastReservePage/Frame (2).svg"
                        alt="back icon"
                        width={22}
                        height={22}
                    />
                    <span className="text-[#0D3B66] text-[16px] leading-[24px]">
                        {t("back")}

                    </span>
                </div>

                {/* Image (mobile) */}
                <div className="lg:hidden relative w-full h-[180px] rounded-[24px] overflow-hidden mb-[24px]">
                    <Image
                        src="/images/fastReservePage/login.jpg"
                        alt="auth"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Title */}
                <div
                    className="
                        w-full lg:w-[552px]
                        flex flex-col gap-2
                        mb-[24px] lg:mb-[40px]
                        animate-[fadeText_0.7s_ease]
                    "
                >
                    <p className="text-[#1E2022] text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
                        {t("title")}
                    </p>
                    <p className="text-[#1E2022] text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">
                        {t("description")}
                    </p>
                </div>

                {/* Inputs */}
                <div
                    className="
                        w-full lg:w-[552px]
                        flex flex-col
                        gap-[20px] lg:gap-[32px]
                        mb-[24px] lg:mb-[32px]
                    "
                >
                    {/* Password 1 */}
                    <div className="relative">
                        <input
                            type={showPass1 ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t("passwordPlaceholder")}
                            className={`
w-full h-[52px] lg:h-[62px] rounded-[40px]
bg-[#F5F5F5]
p-[20px]
${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"}
outline-none
placeholder:text-[#665d55] text-[14px]
transition-all duration-300
focus:scale-[1.01]
focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
animate-[fadeText_0.7s_ease]
`}

                        />

                        <Image
                            onClick={() => setShowPass1(!showPass1)}
                            src="/icons/fastReservePage/Frame (1).svg"
                            alt="password icon"
                            width={20}
                            height={20}
                            className={`
absolute top-1/2 -translate-y-1/2 cursor-pointer
${direction === "rtl" ? "left-[20px]" : "right-[20px]"}
`}
                        />
                    </div>

                    {/* Password 2 */}
                    <div className="relative">
                        <input
                            type={showPass2 ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t("confirmPassPlaceholder")}
                            className={`
w-full h-[52px] lg:h-[62px] rounded-[40px]
bg-[#F5F5F5]
p-[20px]
${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"}
outline-none
placeholder:text-[#665d55] text-[14px]
transition-all duration-300
focus:scale-[1.01]
focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
animate-[fadeText_0.7s_ease]
`}

                        />

                        <Image
                            onClick={() => setShowPass2(!showPass2)}
                            src="/icons/fastReservePage/Frame (1).svg"
                            alt="password icon"
                            width={20}
                            height={20}
                            className={`
absolute top-1/2 -translate-y-1/2 cursor-pointer
${direction === "rtl" ? "left-[20px]" : "right-[20px]"}
`}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
        w-full h-[52px] lg:h-[62px]
        rounded-[40px] px-[20px]
        flex justify-center items-center
        bg-[#0D3B66] text-white text-base
        cursor-pointer
        transition-all duration-200
        hover:bg-[#0D3B66]/80
        disabled:opacity-50
    "
                    >
                        {loading ? "در حال تغییر..." : t("submit")}
                    </button>

                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">
                            {errorMsg}
                        </p>
                    )}

                </div>

            </div>
        </div>
    );
}
