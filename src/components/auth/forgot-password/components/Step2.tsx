
"use client";
import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import httpClient from "@/core/interceptor/axios";

interface Props {
    next: () => void;
    back: () => void;
}

export default function Step2({ next, back }: Props) {
    const [timeLeft, setTimeLeft] = useState(60);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const locale = useLocale();
    const direction = locale === "fa" ? "rtl" : "ltr";
    const t = useTranslations("auth.forgotPassword.step2");
    const [canResend, setCanResend] = useState(false);
    useEffect(() => {
        if (timeLeft === 0) {
            setCanResend(true);
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleResend = async () => {
        const email = localStorage.getItem("resetEmail")?.trim() || "";

        if (!email) {
            setErrorMsg(t("errors.emailNotFound"));
            return;
        }

        try {
            setLoading(true);
            setErrorMsg("");

            await httpClient.post("/auth/forgot-password/request", {
                email: email
            });

            setTimeLeft(60);
            setCanResend(false);
            setCode(["", "", "", "", "", ""]);

            const firstInput = document.getElementById("code-input-0");
            firstInput?.focus();

        } catch (error: any) {
           setErrorMsg(
    error.response?.data?.message || t("errors.resendFailed")
);

        } finally {
            setLoading(false);
        }
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const handleCodeChange = (value: string, index: number) => {
        value = convertToEnglishDigits(value);

        if (!/^\d*$/.test(value)) return;
        if (value.length > 1) {
            const pastedCode = convertToEnglishDigits(value)
                .slice(0, 6)
                .split("");

            const newCode = ["", "", "", "", "", ""];

            pastedCode.forEach((digit, i) => {
                if (i < 6) {
                    newCode[i] = digit;
                }
            });

            setCode(newCode);

            const focusIndex = Math.min(pastedCode.length, 6) - 1;
            const targetInput = document.getElementById(
                `code-input-${focusIndex}`
            );

            targetInput?.focus();
            return;
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 5) {
            const nextInput = document.getElementById(
                `code-input-${index + 1}`
            );

            nextInput?.focus();
        }
    };
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace") {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
            } else if (index > 0) {
                const prevInput = document.getElementById(
                    `code-input-${index - 1}`
                );

                prevInput?.focus();

                const newCode = [...code];
                newCode[index - 1] = "";
                setCode(newCode);
            }
        }

        if (e.key === "ArrowRight" && index < 5) {
            const nextInput = document.getElementById(
                `code-input-${index + 1}`
            );

            nextInput?.focus();
        }

        if (e.key === "ArrowLeft" && index > 0) {
            const prevInput = document.getElementById(
                `code-input-${index - 1}`
            );

            prevInput?.focus();
        }
    };
    const convertToEnglishDigits = (value: string) => {
        return value
            .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
    };
    const handleSubmit = async () => {
        const email = localStorage.getItem("resetEmail")?.trim() || "";
        const finalCode = convertToEnglishDigits(code.join("").trim());

       if (!email) {
    setErrorMsg(t("errors.emailNotFound"));
    return;
}
if (finalCode.length !== 6) {
    setErrorMsg(t("errors.codeIncomplete"));
    return;
}


        try {
            setLoading(true);
            setErrorMsg("");

            const response = await httpClient.post("/auth/forgot-password/verify", {
                email: email,
                resetCode: finalCode,
            });

            console.log("کد تایید شد:", response.data);

            localStorage.setItem("resetCode", finalCode);
            if (response.data.userId) {
                localStorage.setItem("resetUserId", response.data.userId);
            }

            next();
        } catch (error: any) {
            console.error("خطا در تایید کد:", error);
            const message =
                error.response?.data?.message ||
                t("errors.codeIncomplete");

            setErrorMsg(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={shabnam.className} dir={direction}>
            <div className="flex flex-col">
                <div
                    onClick={back}
                    className="flex items-center gap-[3px] mt-[16px] lg:mt-60 mb-[24px] lg:mb-[40px] h-[24px] cursor-pointer animate-[fadeText_0.7s_ease]">
                    <Image
                        src="/icons/fastReservePage/Frame (2).svg"
                        alt="back"
                        width={22}
                        height={22}
                    />
                    <span className="text-[#0D3B66] text-[16px]">
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
                <div
                    className="w-full lg:w-[552px] flex flex-col gap-2 mb-[24px] lg:mb-[40px] animate-[fadeText_0.7s_ease]">
                    <p className="text-[#1E2022] text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
                        {t("title")}
                    </p>
                    <p className="text-[#1E2022] text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">
                        {t("description")}
                    </p>
                    <p
                        onClick={back}
                        className="text-[#0D3B66] text-[14px] lg:text-[16px] cursor-pointer"
                    >
                        {t("changeEmail")}
                    </p>
                </div>
                <div className="w-full lg:w-[552px] flex flex-col gap-[20px] lg:gap-[32px] mb-[24px] lg:mb-[32px]">
                    <div className="w-full flex justify-between gap-2" dir="ltr">
                        {[...Array(6)].map((_, i) => (
                            <input
                                key={i}
                                id={`code-input-${i}`}
                                maxLength={1}
                                type="text"
                                inputMode="numeric"
                                autoComplete={i === 0 ? "one-time-code" : "off"}
                                value={code[i]}
                                onChange={(e) =>
                                    handleCodeChange(e.target.value, i)
                                }
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className="w-full max-w-[52px] h-[52px] lg:max-w-none lg:w-[78px] lg:h-[59px] text-center text-[18px] lg:text-[22px] font-bold bg-[#F5F5F5] rounded-[40px] border border-[#E0E0E0] outline-none transition-all duration-300 focus:border-[#0D3B66] focus:bg-[#eef4fa] animate-[fadeText_0.7s_ease]" />
                        ))}
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">
                            {errorMsg}
                        </p>
                    )}
                    <div className="w-full flex justify-center">
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="text-[#0D3B66] text-[14px] underline"
                            >
{t("resendCode")}                            </button>
                        ) : (
                            <span className="text-[14px] text-[#1E2022]">
                                {t("timeLeft")}: {minutes}:{seconds.toString().padStart(2, "0")}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full h-[52px] lg:h-[62px] rounded-[40px] flex justify-center items-center bg-[#0D3B66] text-white text-base transition-all duration-200 hover:bg-[#0D3B66]/80 disabled:opacity-50 animate-[fadeText_0.7s_ease]" >
{loading ? t("loading") : t("confirmContinue")}
                   </button>
                </div>
            </div>
        </div>
    );
}
