
import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useState, useEffect } from "react";
interface Props {
    next: () => void;
    back: () => void;
}
export default function Step2({ next, back }: Props) {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft === 0) return;
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
        <div className={shabnam.className} dir="rtl">
            <div className="flex flex-col">
                <div
                    onClick={back}
                    className="
                        flex items-center gap-[3px]
                      mt-[16px] lg:mt-60

 mb-[24px]       /* موبایل */
                        lg:mb-[40px] /* دسکتاپ */
                        h-[24px]
                        cursor-pointer
                        animate-[fadeText_0.7s_ease]
                    "
                >
                    <Image
                        src="/icons/fastReservePage/Frame (2).svg"
                        alt="back"
                        width={22}
                        height={22}
                    />
                    <span className="text-[#0D3B66] text-[16px]">
                        بازگشت
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
                    className="
                        w-full
                        lg:w-[552px]
                        flex flex-col gap-2
                        mb-[24px] lg:mb-[40px]
                        animate-[fadeText_0.7s_ease]
                    "
                >
                    <p className="text-[#1E2022] text-[20px] lg:text-[24px] font-bold leading-[28px] lg:leading-[32px]">
                        ایجاد حساب کاربری (مرحله دوم)
                    </p>
                    <p className="text-[#1E2022] text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">
                        کد تایید به ایمیل شما ارسال شد.
                    </p>
                    <p className="text-[#0D3B66] text-[14px] lg:text-[16px] cursor-pointer">
                        تغییر ایمیل
                    </p>
                </div>
                <div
                    className="
                        w-full
                        lg:w-[552px]
                        flex flex-col
                        gap-[20px] lg:gap-[32px]
                        mb-[24px] lg:mb-[32px]
                    "
                >
                    <div className="w-full flex justify-between gap-2">
                        {[...Array(5)].map((_, i) => (
                            <input
                                key={i}
                                maxLength={1}
                                type="text"
                                inputMode="numeric"
                                className="
                                    w-full
                                    max-w-[52px] h-[52px]     /* موبایل */
                                    lg:max-w-none lg:w-[78px] lg:h-[59px]
                                    text-center text-[18px] lg:text-[22px]
                                    font-bold
                                    bg-[#F5F5F5]
                                    rounded-[40px] border border-[#E0E0E0]
                                    outline-none
                                    transition-all duration-300
                                    focus:border-[#0D3B66]
                                    focus:bg-[#eef4fa]
                                    animate-[fadeText_0.7s_ease]
                                "
                            />
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        <span className="text-[14px] text-[#1E2022]">
                            زمان باقی‌مانده: {minutes}:{seconds.toString().padStart(2, "0")}
                        </span>
                    </div>
                    <button
                        onClick={next}
                        className="
                            w-full h-[52px] lg:h-[62px]
                            rounded-[40px]
                            flex justify-center items-center
                            bg-[#0D3B66] text-white text-base
                            transition-all duration-200
                            hover:bg-[#0D3B66]/80
                            animate-[fadeText_0.7s_ease]
                        "
                    >
                        تایید و ادامه
                    </button>
                </div>
            </div>
        </div>
    );
}

