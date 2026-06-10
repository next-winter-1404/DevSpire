
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useState, useEffect, useRef } from "react";
import httpClient from "@/core/interceptor/axios";

interface Props {
    next: () => void;
    back: () => void;
}

export default function Step2({ next, back }: Props) {
    const [timeLeft, setTimeLeft] = useState(60);
    const [storedTempUserId, setStoredTempUserId] = useState<number | null>(null);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
    const t = useTranslations("auth.register.step2")
;
    const locale = useLocale();
    const [canResend, setCanResend] = useState(false);
    const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";
    const handleChange = (value: string, index: number) => {
        const persian = "۰۱۲۳۴۵۶۷۸۹";
        const english = "0123456789";
        value = value.replace(/[۰-۹]/g, (d) => english[persian.indexOf(d)]);

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    };
    useEffect(() => {
        const savedId = localStorage.getItem("tempUserId");
        if (savedId) {
            setStoredTempUserId(Number(savedId));
        }
    }, []);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("registerEmail");
        if (savedEmail) setEmail(savedEmail);
    }, []);

    const handleVerify = async () => {
        const code = otp.join("");

        if (code.length !== 6) {
setErrorMsg(t("errors.codeIncomplete"));
            return;
        }

        if (!storedTempUserId) {
setErrorMsg(t("errors.userIdNotFound"));
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            const res = await httpClient.post("/auth/verify-email", {
                tempUserId: storedTempUserId,
                verificationCode: code
            });

            console.log("verify response:", res.data);

            const returnedUserId = res.data.userId;

            if (!returnedUserId) {
setErrorMsg(t("errors.userIdMissingFromServer"));
                return;
            }

            localStorage.setItem("userId", String(returnedUserId));

            next();

        } catch (error: any) {
            console.error("Verify error:", error);

            if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
setErrorMsg(t("errors.serverConnection"));
            }

        } finally {
            setLoading(false);
        }
    };
    const handleResend = async () => {
        if (!storedTempUserId) return;

        try {
            setLoading(true);

            await httpClient.post("/auth/register", {
                email
            });


            setTimeLeft(60);
            setCanResend(false);
            setOtp(["", "", "", "", "", ""]);

            inputRefs[0].current?.focus();

        } catch (error: any) {
            setErrorMsg(
error.response?.data?.message || t("errors.resendFailed")
            );
        } finally {
            setLoading(false);
        }
    };

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

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

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
                    <span className="text-[#0D3B66] text-[16px]">{t("back")}</span>
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
                    <p className="text-[#0D3B66] text-[14px] lg:text-[16px] cursor-pointer">
                        {t("changeEmail")}
                    </p>
                </div>
                <div
                    className="w-full lg:w-[552px] flex flex-col gap-[20px] lg:gap-[32px] mb-[24px] lg:mb-[32px]">
                    <div className="w-full flex justify-between gap-2" dir="ltr">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={inputRefs[i]}
                                maxLength={1}
                                type="text"
                                inputMode="numeric"
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, i)}
                                onKeyDown={(e) => {
                                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                                        inputRefs[i - 1].current?.focus();
                                    }
                                }}
                                className=" w-full max-w-[52px] h-[52px] lg:max-w-none lg:w-[78px] lg:h-[59px] text-center text-[18px] lg:text-[22px] font-bold bg-[#F5F5F5] rounded-[40px] border border-[#E0E0E0] outline-none transition-all duration-300 focus:border-[#0D3B66] focus:bg-[#eef4fa] animate-[fadeText_0.7s_ease]" />
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="text-[#0D3B66] text-[14px] underline"
                            >
{t("resendCode")}
                            </button>
                        ) : (
                            <span className="text-[14px] text-[#1E2022]">
                                {t("timeLeft")}: {minutes}:{seconds.toString().padStart(2, "0")}
                            </span>
                        )}
                    </div>

                    {errorMsg && (
                        <p className="text-red-500 text-center text-sm">{errorMsg}</p>
                    )}
                    <button
                        onClick={handleVerify}
                        disabled={loading}
                        className=" w-full h-[52px] lg:h-[62px] rounded-[40px] flex justify-center items-center bg-[#0D3B66] text-white text-base transition-all duration-200 hover:bg-[#0D3B66]/80 animate-[fadeText_0.7s_ease]">
{loading ? t("loading") : t("confirmContinue")}
                    </button>
                </div>
            </div>
        </div>
    );
}


