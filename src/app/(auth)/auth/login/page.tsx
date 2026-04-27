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
 h-[24px] mb-[40px] animate-[fadeText_0.7s_ease]">
                            <Image
                                src="/icons/fastReservePage/home.png"
                                alt="home icon"
                                width={22}
                                height={22}

                            />
                            <span className="text-[#0D3B66] text-[16px] leading-[24px] font-normal animate-[fadeText_0.7s_ease]">
                                صفحه اصلی
                            </span>
                        </div>
                        <div className="w-[552px] flex gap-3 flex-col mb-[40px] animate-[fadeText_0.7s_ease] ">
                            <p className="text-[#1E2022] text-[24px] font-bold leading-[32px] 
 ">
                                ورود به حساب کاربری
                            </p>
                            <p className="text-[#1E2022] text-[16px] font-normal leading-[24px] 
">
                                برای دسترسی به خدمات و تجربه بهتر در سایت، وارد حساب خود شوید.
                            </p>
                        </div>
                        <div className="w-[552px] flex flex-col gap-[32px] mb-[32px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="ایمیل خود را وارد کنید..."
                                    className="
w-full h-[62px] rounded-[40px]
bg-[#F5F5F5]
p-[20px] pl-[55px]
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
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="رمز عبور خود را وارد کنید..."
                                    className="
w-full h-[62px] rounded-[40px]
bg-[#F5F5F5]
p-[20px] pl-[55px]
outline-none text-right
placeholder:text-[#665d55] text-[14px]
transition-all duration-300
focus:scale-[1.01]
focus:shadow-[0_0_10px_rgba(13,59,102,0.15)]
animate-[fadeText_0.7s_ease]
"
                                />
                                <Image
                                    src="/icons/fastReservePage/Frame (1).svg"
                                    alt="lock icon"
                                    width={20}
                                    height={20}
                                    className="absolute left-[20px] top-1/2 -translate-y-1/2 animate-[fadeText_0.7s_ease]"
                                />
                            </div>
                            <p
                                className="text-[#0D3B66] text-[14px] leading-[100%] text-right -mt-[16px] animate-[fadeText_0.7s_ease]"
                            >
                                رمز عبور خود را فراموش کرده‌اید؟
                            </p>
                            <button
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
                                ورود به حساب کاربری
                            </button>
                        </div>
                        <div className="flex items-center w-[551px] h-[22px] gap-[24px] mb-[24px] animate-[fadeText_0.7s_ease]">
                            <div className="h-[1px] bg-[#777777] flex-1" />
                            <span className="text-[#777777] text-base font-normal">یا</span>
                            <div className="h-[1px] bg-[#777777] flex-1" />
                        </div>
                        <div className="w-[552px] flex gap-[16px] mb-[24px]">
                            <button
                                className="
    w-[264px] h-[62px] rounded-[40px]
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
                                    ورود با گوگل
                                </div>
                            </button>
                            <button
                                className="
    w-[264px] h-[62px] rounded-[40px]
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
                                    ورود با اپل
                                </div>
                            </button>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="flex items-center gap-[4px] animate-[fadeText_0.7s_ease]" dir="rtl">
                                <span className="text-[16px] text-black">حساب کاربری ندارید؟</span>
                                <a className="text-[16px] text-[#0D3B66] underline cursor-pointer hover:opacity-70 transition">
                                    ثبت نام کنید
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-[648px] h-full rounded-[40px] overflow-hidden shadow-[2px_4px_8px_0px_#00000026]  transition-transform duration-700 ease-out
    hover:scale-[1.01] ">
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
      w-[599px]
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
                        <div className="flex-1 flex flex-col text-right">
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
                                همین حالا به ما بپیوند!
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
                                همراه هزاران کاربر دیگر از خدمات ما استفاده کنید.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
