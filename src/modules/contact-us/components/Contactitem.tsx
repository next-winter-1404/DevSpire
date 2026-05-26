import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";


type Props = {
    icon: string;
    title: string;
    text: string;
};
export default function ContactItem({ icon, title, text }: Props) {
    const t = useTranslations("contact");
    const locale = useLocale();
    const isRTL = locale === "fa";
    return (
        <div className="flex items-center gap-3 w-full lg:w-[481px]
 h-[48px]">
            <div
                className="flex items-center justify-center w-9 h-9 lg:w-12 lg:h-12 p-2 lg:p-3
 rounded-full bg-[#C5BBFA]"
            >
                <Image src={icon} alt={title} width={18}
                    height={18}
                    className="lg:w-6 lg:h-6"
                />
            </div>

            <div className="flex flex-col gap-2 text-start">
                <span className="font-mediumtext-[14px] lg:text-[16px]
 leading-[100%] text-[#826CF4]">
                    {title}
                </span>

                <span className="text-xs lg:text-sm
 text-gray-600">{text}</span>
            </div>
        </div>
    );
}
