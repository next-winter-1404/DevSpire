"use client";
import Image from "next/image";
import { useTranslations } from 'next-intl';
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const layoutT = useTranslations("auth.layout");
    console.log("AUTH LAYOUT LOADED");

    return (
        <div className="w-full bg-gray-100 flex justify-center 
    py-4 
    lg:min-h-screen lg:items-center lg:justify-center lg:py-8">
            <div className="w-full max-w-[1344px] flex flex-col lg:flex-row items-stretch gap-[40px] lg:min-h-[880px]">

                {/* فرم (Login / Register) */}
                <div className="w-full lg:w-[648px] lg:h-[880px] bg-white rounded-[40px] px-[48px] pt-[30px] pb-[48px] shadow-[2px_4px_8px_0px_#00000026] flex flex-col">
                    {children}
                </div>

                {/* تصویر سمت راست */}
                <div className="hidden lg:block relative w-[648px] lg:h-[880px] rounded-[40px] overflow-hidden shadow-[2px_4px_8px_0px_#00000026] transition-transform duration-700 ease-out hover:scale-[1.01]">

                    <Image
                        src="/images/fastReservePage/login.jpg"
                        alt="login"
                        fill
                        priority
                        className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-110"
                    />

                    {/* Overlay پایین تصویر */}
                    <div
                        className="
      absolute bottom-[40px] left-1/2 -translate-x-1/2
w-[90%] lg:w-[599px]
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
                            className="w-[160px] h-[160px] flex-shrink-0"
                        />

                        <div className="flex-1 flex flex-col text-right">
                            <p className="font-shabnam text-[16px] text-white mb-1">
                                {layoutT("imageTitle")}
                            </p>
                            <p className="font-shabnam text-[14px] text-white/80">
                                {layoutT("imageDesc")}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
