
import Image from "next/image";
import { shabnam } from "@/Fonts";
interface Props {
    next: () => void;
}
export default function Step1({ next }: Props) {
    return (
        <div className={shabnam.className} dir="rtl">
            <div className="flex flex-col">
                <div
                    className="
                        flex items-center gap-[3px]
                        mt-[16px] lg:mt-60
 mb-[24px]   /* موبایل */
                        lg:mb-[40px] /* دسکتاپ شبیه لاگین */
                        h-[24px]
                        animate-[fadeText_0.7s_ease]
                        cursor-pointer
                    "
                >
                    <Image
                        src="/icons/fastReservePage/home.png"
                        alt="home icon"
                        width={22}
                        height={22}
                    />
                    <span className="text-[#0D3B66] text-[16px] leading-[24px] font-normal">
                        صفحه اصلی
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
                        ورود به حساب کاربری
                    </p>
                    <p className="text-[#1E2022] text-[14px] lg:text-[16px] font-normal leading-[22px] lg:leading-[24px]">
                        برای دسترسی به خدمات و تجربه بهتر در سایت، وارد حساب خود شوید.
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
                                px-[20px] pr-[20px] pl-[55px]
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
                            alt="mail icon"
                            width={20}
                            height={20}
                            className="absolute left-[20px] top-1/2 -translate-y-1/2 animate-[fadeText_0.7s_ease]"
                        />
                    </div>
                    <button
                        onClick={next}
                        className="
                            w-full h-[52px] lg:h-[62px] rounded-[40px] px-[20px]
                            flex justify-center items-center
                            bg-[#0D3B66] text-white font-normal text-base
                            cursor-pointer
                            transition-all duration-200
                            hover:bg-[#0D3B66]/80
                            animate-[fadeText_0.7s_ease]
                        "
                    >
                        ارسال کد کاربری
                    </button>
                </div>
                <div className="w-full flex justify-center">
                    <div
                        className="flex items-center gap-[4px] text-[14px] lg:text-[16px] animate-[fadeText_0.7s_ease]"
                        dir="rtl"
                    >
                        <span className="text-black">حساب کاربری دارید؟</span>
                        <a href="/auth/login" className="text-[#0D3B66] underline cursor-pointer hover:opacity-70 transition">
                            وارد شوید
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

