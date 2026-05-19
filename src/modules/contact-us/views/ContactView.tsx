import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import ContactForm from "../components/ContactForm";
import ContactItem from "../components/Contactitem";

export default function ContactView() {
    const t = useTranslations("contact");
    const locale = useLocale();
    const isRTL = locale === "fa";

    return (
        <div
            dir={isRTL ? "rtl" : "ltr"}
            className="w-full flex justify-center pt-6 lg:pt-48 pb-6 px-4 lg:px-6 relative"
        >
            <div className="absolute top-8 lg:top-[100px] right-16 lg:right-[460px]">
                <Image
                    src="/icons/fastReservePage/Frame (3).svg"
                    alt="icon"
                    width={40}
                    height={28}
                    className="lg:w-[96px] lg:h-[65px]"
                />
            </div>

            <div className="flex absolute top-8 lg:top-[100px] left-1/2 -translate-x-1/2 flex-col items-center">
                <h1 className="text-[22px] lg:text-[40px] font-semibold text-[#1C5387] text-center">
                    {t("contact_us")}
                </h1>

                <div className="relative w-[140px] lg:w-[256px] h-[2px] bg-[#D9D9D9] mt-2 lg:mt-3 rounded-md">
                    <div className="absolute left-1/2 -translate-x-1/2 w-[90px] lg:w-[176px] h-[2px] bg-[#194C7B] rounded-md"></div>
                </div>
            </div>

            <div className="absolute top-8 lg:top-[100px] left-16 lg:left-[460px]">
                <Image
                    src="/icons/fastReservePage/Frame (3).svg"
                    alt="icon"
                    width={40}
                    height={28}
                    className="lg:w-[97px] lg:h-[65px]"
                />
            </div>
            <div className="flex flex-col  lg:flex-row gap-6 w-full lg:w-[1212px] top-[70px] mx-auto relative">
                <div
                    className="order-2 lg:order-none relative bg-[#E8EEF3] dark:bg-[#27272A] rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 flex items-center justify-center w-full lg:w-[594px] h-auto lg:h-[535px]"
                >
                    <ContactForm />
                </div>
                <div className="flex flex-col gap-3 w-full lg:w-auto"
                >
                    <div
                        className="hidden lg:flex relative bg-[#E8EEF3] dark:bg-[#434d65] rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 items-center justify-center w-[594px] h-[314px]"
                    >
                        <Image
                            src="/images/call-center.svg"
                            alt="icon"
                            width={220}
                            height={220}
                            className="lg:w-[298px] lg:h-[314px] object-contain"
                        />
                        <div className="absolute top-20 right-10 rotate-[-33.4deg]">
                            <Image
                                src="/images/Arrow 07.svg"
                                alt="icon"
                                width={100}
                                height={90}
                            />
                        </div>
                        <div className="absolute bottom-3 left-20 rotate-[-33.4deg]">
                            <Image
                                src="/images/Arrow 8.svg"
                                alt="icon"
                                width={100}
                                height={90}
                            />
                        </div>
                    </div>
                    <div
                        className="order-3 lg:order-none bg-slate-50 dark:bg-[#27272A] rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 px-6 lg:px-8 flex items-center w-full lg:w-[594px] h-auto lg:h-[208px]"
                    >
                        <div className="flex justify-center lg:hidden mb-4">
                            <Image
                                src="/images/call-center.svg"
                                alt="call center"
                                width={160}
                                height={160}
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <ContactItem
                                icon="/icons/Tell.svg"
                                title={t("phone")}
                                text="09229167194"
                            />
                            <ContactItem
                                icon="/icons/email.svg"
                                title={t("email")}
                                text="delta@gmail.com"
                            />
                            <ContactItem
                                icon="/icons/Address.svg"
                                title={t("address")}
                                text={t("addressText")}
                            />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
