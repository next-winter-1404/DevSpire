import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import httpClient from "@/core/interceptor/axios";

interface Props {
    back: () => void;
}

export default function Step3({ back }: Props) {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [storedUserId, setStoredUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const t = useTranslations("auth.register.step3")
;
    const locale = useLocale();
    const direction = locale === "fa" || locale === "ar" ? "rtl" : "ltr";
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        setStoredUserId(userId);
    }, []);
    const toEnglishDigits = (value: string) => {
        return value
            .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
    };

    const handleSubmit = async () => {
        setErrorMsg("");

        console.log("STEP3 localStorage userId:", localStorage.getItem("userId"));
        const userIdFromStorage = localStorage.getItem("userId");
        console.log("Submit userIdFromStorage:", userIdFromStorage);

        if (!userIdFromStorage) {
setErrorMsg(t("errors.userIdNotFound"));
            return;
        }

        if (!phoneNumber.trim()) {
setErrorMsg(t("errors.phoneRequired"));
            return;
        }

        const normalizedPassword = toEnglishDigits(password);
        const normalizedConfirmPassword = toEnglishDigits(confirmPassword);

        if (!normalizedPassword || !normalizedConfirmPassword) {
setErrorMsg(t("errors.passwordsRequired"));
            return;
        }

        if (normalizedPassword !== normalizedConfirmPassword) {
setErrorMsg(t("errors.passMismatch"));
            return;
        }

        if (normalizedPassword.length < 8) {
setErrorMsg(t("errors.passwordMinLength"));
            return;
        }

        try {
            setLoading(true);
          const res = await httpClient.post("/auth/complete-registration", {
    userId: Number(userIdFromStorage),
    password: normalizedPassword,
    phoneNumber: toEnglishDigits(phoneNumber.trim()),
});

const data = res.data;

            console.log("complete-registration response:", data);

           

            if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
            }

            if (data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken);
            }

            localStorage.removeItem("tempUserId");
            localStorage.removeItem("userId");

alert(t("successMessage"));

        }catch (error: any) {
    console.error("Complete registration error:", error);
setErrorMsg(error.response?.data?.message || t("errors.serverConnection"));

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${shabnam.className}`} dir={direction}>
            <div className="flex flex-col">
                <div
                    onClick={back}
                    className=" flex items-center gap-[3px] mt-[16px] lg:mt-32 mb-[24px] lg:mb-[40px] h-[24px] animate-[fadeText_0.7s_ease] cursor-pointer" >
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
                <div className="lg:hidden relative w-full h-[180px] rounded-[24px] overflow-hidden mb-[24px]">
                    <Image
                        src="/images/fastReservePage/login.jpg"
                        alt="auth"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className=" w-full lg:w-[552px] flex flex-col gap-2 mb-[24px] lg:mb-[40px] animate-[fadeText_0.7s_ease]" >
                    <p className="text-[#1E2022] text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
                        {t("title")}
                    </p>
                    <p className="text-[#1E2022] text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">
                        {t("description")}
                    </p>
                </div>
                <div className=" w-full lg:w-[552px] flex flex-col gap-[20px] lg:gap-[32px] mb-[24px] lg:mb-[32px]" >
                    <div className="relative">
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(toEnglishDigits(e.target.value))}
placeholder={t("phonePlaceholder")}
                            className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`} />
                        <Image
                            src="/icons/fastReservePage/Frame.svg"
                            alt="email icon"
                            width={20}
                            height={20}
                            className={`absolute top-1/2 -translate-y-1/2 ${direction === "rtl" ? "left-[20px]" : "right-[20px]"}`} />
                    </div>
                    <div className="relative">
                        <input
                            type={showPass1 ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(toEnglishDigits(e.target.value))}
                            placeholder={t("passwordPlaceholder")}
                            className={`w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`} />
                        <button
                            type="button"
                            onClick={() => setShowPass1(!showPass1)}
                            className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${direction === "rtl" ? "left-4" : "right-4"}`} aria-label={showPass1 ? t("hidePassword") : t("showPassword")}>
                            <Image
                                src="/icons/fastReservePage/Frame (1).svg"
                                alt="toggle password visibility"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={showPass2 ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(toEnglishDigits(e.target.value))}
                            placeholder={t("confirmPassPlaceholder")}
                            className={` w-full h-[52px] lg:h-[62px] rounded-[40px] bg-[#F5F5F5] p-[20px] ${direction === "rtl" ? "pr-[55px] text-right" : "pl-[55px] text-left"} outline-none placeholder:text-[#665d55] text-[14px] transition-all duration-300 focus:scale-[1.01] focus:shadow-[0_0_10px_rgba(13,59,102,0.15)] animate-[fadeText_0.7s_ease]`} />
                        <button
                            type="button"
                            onClick={() => setShowPass2(!showPass2)}
                            className={` absolute top-1/2 -translate-y-1/2 cursor-pointer ${direction === "rtl" ? "left-4" : "right-4"}`} aria-label={showPass2 ? t("hidePassword") : t("showPassword")} >
                            <Image
                                src="/icons/fastReservePage/Frame (1).svg"
                                alt="toggle password visibility"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                    {errorMsg && (
                        <p className="text-red-500 text-sm text-right">{errorMsg}</p>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className=" w-full h-[52px] lg:h-[62px] rounded-[40px] px-[20px] flex justify-center items-center bg-[#0D3B66] text-white text-base cursor-pointer transition-all duration-200 hover:bg-[#0D3B66]/80 disabled:opacity-50 disabled:cursor-not-allowed animate-[fadeText_0.7s_ease]">
{loading ? t("loading") : t("submit")}
                    </button>
                </div>
            </div>
        </div>
    );
}

