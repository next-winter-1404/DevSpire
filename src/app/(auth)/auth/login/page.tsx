import Image from "next/image";
import { shabnam } from "@/Fonts";

export default function LoginPage() {
    return (
        <div className={`w-full min-h-screen bg-gray-100 flex items-center justify-center ${shabnam.className}`}>
            <div className="w-[1344px] h-[880px] flex gap-[40px]">
                <div
                    className="w-[648px] h-full bg-white rounded-[40px] px-[48px] pt-[30px] pb-[48px] shadow-[2px_4px_8px_0px_#00000026]"
                    dir="rtl"
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-[3px] mt-[110px]
 h-[24px] mb-[40px]">
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
                        <div className="w-[552px] flex gap-3 flex-col mb-[40px]">
                            <p className="text-[#1E2022] text-[24px] font-bold leading-[32px]">
                                ورود به حساب کاربری
                            </p>

                            <p className="text-[#1E2022] text-[16px] font-normal leading-[24px]">
                                برای دسترسی به خدمات و تجربه بهتر در سایت، وارد حساب خود شوید.
                            </p>
                        </div>
                        <div className="w-[552px] flex flex-col gap-[32px] mb-[32px]">
                            <input
                                type="text"
                                placeholder="شماره موبایل"
                                className="
          w-full h-[62px] rounded-[40px] p-[20px] bg-[#F5F5F5]
          outline-none text-right placeholder:text-[#0D3B66] text-[14px]
        "
                            />
                            <input
                                type="password"
                                placeholder="رمز عبور"
                                className="
          w-full h-[62px] rounded-[40px] p-[20px] bg-[#F5F5F5]
          outline-none text-right placeholder:text-[#0D3B66] text-[14px]
        "
                            />
                            <p
                                className="text-[#0D3B66] text-[14px] leading-[100%] text-right -mt-[16px]"
                            >
                                رمز عبور خود را فراموش کرده‌اید؟
                            </p>

                            <button
                                className="
          w-full h-[62px] rounded-[40px] px-[20px] flex justify-between items-center
          bg-[#0D3B66] text-white font-normal text-base
        "
                            >
                                ورود به حساب کاربری
                            </button>
                        </div>
                        <div className="flex items-center w-[551px] h-[22px] gap-[24px] mb-[24px]">
                            <div className="h-[1px] bg-[#777777] flex-1" />
                            <span className="text-[#777777] text-base font-normal">یا</span>
                            <div className="h-[1px] bg-[#777777] flex-1" />
                        </div>
                        <div className="w-[552px] flex gap-[16px] mb-[24px]">
                            <button className="
        w-[264px] h-[62px] rounded-[40px] border border-[#1E2022]
        text-[#1E2022] text-base flex items-center justify-center
      ">
                                <div className="flex items-center gap-[8px]">
                                    <Image src="/icons/fastReservePage/google-icon-logo-svgrepo-com 1.svg" width={24} height={24} alt="" />
                                    ورود با گوگل
                                </div>
                            </button>
                            <button className="
        w-[264px] h-[62px] rounded-[40px] border border-[#1E2022]
        text-[#1E2022] text-base flex items-center justify-center
      ">
                                <div className="flex items-center gap-[8px]">
                                    <Image src="/icons/fastReservePage/apple-logo-svgrepo-com 1.svg" width={24} height={24} alt="" />
                                    ورود با اپل
                                </div>
                            </button>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="flex items-center gap-[4px]" dir="rtl">
                                <span className="text-[16px] text-black">حساب کاربری ندارید؟</span>
                                <a className="text-[16px] text-[#0D3B66] underline">ثبت نام کنید</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-[648px] h-full rounded-[40px] overflow-hidden shadow-[2px_4px_8px_0px_#00000026]">
                    <Image
                        src="/images/fastReservePage/login.jpg"
                        alt="login"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
