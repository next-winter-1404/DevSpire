import Image from "next/image";
import { shabnam } from "@/Fonts";
import { useState } from "react";

interface Props {
    back: () => void;
}

export default function Step3({ back }: Props) {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    return (
        <div className={`${shabnam.className}`} dir="rtl">
            <div className="flex flex-col">
                <div
                    onClick={back}
                    className="
            flex items-center gap-[3px]
            mt-[16px] lg:mt-32 mb-[24px] lg:mb-[40px]
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
                        بازگشت
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
                        ایجاد حساب کاربری (مرحله آخر)
                    </p>
                    <p className="text-[#1E2022] text-[14px] lg:text-[16px] leading-[22px] lg:leading-[24px]">
                        برای تکمیل ثبت‌نام، ایمیل و رمز عبور خود را وارد کنید.
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
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ایمیل خود را وارد کنید..."
                            className="
                w-full h-[52px] lg:h-[62px] rounded-[40px]
                bg-[#F5F5F5]
                px-[20px] pl-[55px]
                outline-none text-right
                placeholder:text-[#665d55] text-[14px]
                transition-all duration-300
                focus:scale-[1.01]
                focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
                animate-[fadeText_0.7s_ease]
              "
                        />
                        <Image
                            src="/icons/fastReservePage/Frame.svg"
                            alt="email icon"
                            width={20}
                            height={20}
                            className="absolute left-[20px] top-1/2 -translate-y-1/2"
                        />
                    </div>

                    {/* input رمز با قابلیت toggle */}
                    <div className="relative">
                        <input
                            type={showPass1 ? "text" : "password"}
                            placeholder="رمز خود را وارد کنید..."
                            className="
                w-full h-[52px] lg:h-[62px] rounded-[40px]
                bg-[#F5F5F5]
                px-[20px] pl-[55px]
                outline-none text-right
                placeholder:text-[#665d55] text-[14px]
                transition-all duration-300
                focus:scale-[1.01]
                focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
                animate-[fadeText_0.7s_ease]
              "
                        />

                        <button
                            type="button"
                            onClick={() => setShowPass1(!showPass1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
                            aria-label={showPass1 ? "مخفی کردن رمز" : "نمایش رمز"}
                        >
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
                            placeholder="تکرار رمز عبور..."
                            className="
                w-full h-[52px] lg:h-[62px] rounded-[40px]
                bg-[#F5F5F5]
                px-[20px] pl-[55px]
                outline-none text-right
                placeholder:text-[#665d55] text-[14px]
                transition-all duration-300
                focus:scale-[1.01]
                focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
                animate-[fadeText_0.7s_ease]
              "
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass2(!showPass2)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
                            aria-label={showPass2 ? "مخفی کردن رمز" : "نمایش رمز"}
                        >


                        </button>
                        {/* دکمه چشم - کلیک برای نمایش/مخفی */}
                        <button
                            type="button"
                            onClick={() => setShowPass2(!showPass2)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
                            aria-label={showPass2 ? "مخفی کردن رمز" : "نمایش رمز"}
                        >
                            <Image
                                src="/icons/fastReservePage/Frame (1).svg"
                                alt="toggle password visibility"
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>

                    <button
                        onClick={() => { }}
                        className="
              w-full h-[52px] lg:h-[62px]
              rounded-[40px] px-[20px]
              flex justify-center items-center
              bg-[#0D3B66] text-white text-base
              cursor-pointer
              transition-all duration-200
              hover:bg-[#0D3B66]/80
              animate-[fadeText_0.7s_ease]
            "
                    >
                        ایجاد حساب کاربری
                    </button>
                </div>
            </div>
        </div>
    );
}
