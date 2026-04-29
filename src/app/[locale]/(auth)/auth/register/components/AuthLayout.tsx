// auth/components/AuthLayout.tsx
import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-[1344px] h-[880px] flex gap-[40px]">
                <div className="w-full lg:w-[648px] h-full bg-white rounded-[40px] px-[48px] pt-[30px] pb-[48px] shadow-[2px_4px_8px_0px_#00000026]">
                    {children}
                </div>
                <div className="hidden lg:block relative w-[648px] h-full rounded-[40px] overflow-hidden shadow-[2px_4px_8px_0px_#00000026] transition-transform duration-700 ease-out hover:scale-[1.01]">

                    <Image
                        src="/images/fastReservePage/login.jpg"
                        alt="login"
                        fill
                        priority
                        className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-110"
                    />
                    <div
                        className="
              absolute bottom-[40px] left-1/2 -translate-x-1/2
              w-[599px]
              h-[113px]
              flex items-center justify-between gap-[24px]
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
                            <p className="font-shabnam font-normal text-[16px] leading-[100%] mb-1 text-white transition-all duration-500 hover:text-white/90">
                                همین حالا به ما بپیوند!
                            </p>
                            <p className="font-shabnam font-normal text-[14px] leading-[100%] text-white/80">
                                همراه هزاران کاربر دیگر از خدمات ما استفاده کنید.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
